import { PenLine, ListTodo, CalendarPlus, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const actions = [
  { icon: PenLine, label: "Draft reply", description: "AI-assisted email response", target: "/app/inbox" },
  { icon: ListTodo, label: "Create plan", description: "Generate action plan from context", target: "/app/review" },
  { icon: CalendarPlus, label: "Schedule event", description: "Find time and send invite", target: "/app/review" },
  { icon: FileText, label: "Summarize messages", description: "Digest unread threads", target: "/app/inbox" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-[14px]" style={{ fontWeight: 500 }}>Quick Actions</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate(action.target)}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-[#6366f1]/30 hover:bg-[#6366f1]/[0.02] transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-[#6366f1]/10 transition-colors">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-[#6366f1] transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px]" style={{ fontWeight: 500 }}>{action.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-[1.35]">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}