import { MessageSquare, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const messages = [
  {
    id: 1,
    sender: "Sarah Kim",
    initials: "SK",
    channel: "email",
    subject: "Q1 Budget Approval",
    summary: "Requesting sign-off on the revised Q1 marketing budget. Attached spreadsheet with updated line items.",
    time: "8:42 AM",
    priority: true,
  },
  {
    id: 2,
    sender: "Dev Team",
    initials: "DT",
    channel: "slack",
    subject: "Deploy v2.4 to staging?",
    summary: "QA passed all critical tests. Team is asking for your go-ahead to deploy to staging environment today.",
    time: "7:15 AM",
    priority: true,
  },
  {
    id: 3,
    sender: "Lisa Park",
    initials: "LP",
    channel: "email",
    subject: "Vendor contract review",
    summary: "Legal flagged two clauses in the Acme Corp contract. Needs your input before Wednesday.",
    time: "Yesterday",
    priority: false,
  },
];

export function MessagesCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-[14px]" style={{ fontWeight: 500 }}>Priority Messages</h3>
        </div>
        <span className="text-[12px] text-[#6366f1] cursor-pointer hover:underline" style={{ fontWeight: 500 }}
          onClick={() => navigate("/app/inbox")}
        >
          View inbox
        </span>
      </div>

      <div className="space-y-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => navigate("/app/inbox")}
            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[11px] text-muted-foreground shrink-0" style={{ fontWeight: 500 }}>
              {msg.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] truncate" style={{ fontWeight: 500 }}>{msg.sender}</span>
                {msg.channel === "email" ? (
                  <Mail className="w-3 h-3 text-muted-foreground shrink-0" />
                ) : (
                  <MessageCircle className="w-3 h-3 text-muted-foreground shrink-0" />
                )}
                {msg.priority && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                )}
              </div>
              <p className="text-[12px] mt-0.5 truncate" style={{ fontWeight: 500 }}>{msg.subject}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1 leading-[1.4]">
                {msg.summary}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[11px] text-muted-foreground">{msg.time}</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}