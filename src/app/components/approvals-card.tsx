import { ShieldCheck, Check, X, Pencil, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Approval {
  id: number;
  action: string;
  context: string;
  type: string;
  status: "pending" | "approved" | "rejected";
}

const initialApprovals: Approval[] = [
  {
    id: 1,
    action: "Send follow-up email to Lisa Park",
    context: "Based on your meeting notes from Friday. Alfred drafted a summary with action items.",
    type: "Email",
  },
  {
    id: 2,
    action: "Block 2 hours for deep work tomorrow",
    context: "You have no meetings Tue 1–5 PM. Alfred suggests protecting 2–4 PM for the Q1 report.",
    type: "Calendar",
  },
  {
    id: 3,
    action: "Create task: Review vendor proposals",
    context: "Mentioned in 3 separate threads. Deadline appears to be March 20.",
    type: "Task",
  },
];

export function ApprovalsCard() {
  const [approvals, setApprovals] = useState<Approval[]>(
    initialApprovals.map((a) => ({ ...a, status: "pending" as const }))
  );
  const navigate = useNavigate();

  const handleAction = (id: number, status: "approved" | "rejected") => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-[14px]" style={{ fontWeight: 500 }}>Pending Approvals</h3>
        </div>
        <span className="text-[12px] text-[#6366f1] cursor-pointer hover:underline" style={{ fontWeight: 500 }}
          onClick={() => navigate("/app/review")}
        >
          View all
        </span>
      </div>

      <div className="space-y-2.5">
        {approvals.map((approval) => (
          <div
            key={approval.id}
            className={`rounded-lg border p-3 transition-all ${
              approval.status === "approved"
                ? "border-green-500/25 bg-green-500/[0.06]"
                : approval.status === "rejected"
                ? "border-red-500/15 bg-red-500/[0.04] opacity-60"
                : "border-border"
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="mt-0.5 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#6366f1]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground" style={{ fontWeight: 500 }}>
                    {approval.type}
                  </span>
                  {approval.status === "approved" && (
                    <span className="text-[11px] text-green-600" style={{ fontWeight: 500 }}>Approved</span>
                  )}
                  {approval.status === "rejected" && (
                    <span className="text-[11px] text-red-500" style={{ fontWeight: 500 }}>Dismissed</span>
                  )}
                </div>
                <p className="text-[13px] mt-1 break-words" style={{ fontWeight: 500 }}>
                  {approval.action}
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5 leading-[1.45] break-words">
                  {approval.context}
                </p>

                {approval.status === "pending" && (
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <button
                      onClick={() => handleAction(approval.id, "approved")}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#6366f1] text-white text-[11px] hover:bg-[#5558e6] transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      <Check className="w-3 h-3" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(approval.id, "rejected")}
                      className="flex items-center gap-1 px-2 py-1 rounded-md border border-border text-muted-foreground text-[11px] hover:bg-muted transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      <X className="w-3 h-3" />
                      Dismiss
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md text-muted-foreground text-[11px] hover:bg-muted transition-colors">
                      <Pencil className="w-3 h-3" />
                      <span style={{ fontWeight: 500 }}>Edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}