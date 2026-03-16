import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Sparkles,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight,
  PenLine,
  Bell,
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Reply,
  Timer,
  CalendarCheck,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Paperclip,
  ExternalLink,
  ListChecks,
  Zap,
  Check,
} from "lucide-react";

type Priority = "urgent" | "high" | "normal" | "low";
type Channel = "email" | "slack" | "message";
type Filter = "all" | "urgent" | "requires-reply" | "scheduling" | "follow-up";

interface ConversationItem {
  id: string;
  sender: string;
  senderInitials: string;
  senderColor: string;
  channel: Channel;
  subject: string;
  preview: string;
  time: string;
  priority: Priority;
  unread: boolean;
  hasAttachment?: boolean;
  aiLabel?: string;
  aiSummary: string;
  actionItems: string[];
  suggestedSteps: string[];
  whyItMatters: string;
  fullBody: string[];
}

const conversations: ConversationItem[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    senderInitials: "SC",
    senderColor: "#ef4444",
    channel: "email",
    subject: "Q2 strategy deck — need your section by EOD",
    preview: "Hey James, I'm wrapping up the Q2 strategy presentation and still need your product roadmap section...",
    time: "9:12 AM",
    priority: "urgent",
    unread: true,
    hasAttachment: true,
    aiLabel: "Requires Reply",
    aiSummary: "Sarah needs your product roadmap section for the Q2 strategy presentation by end of day today. The board review is tomorrow morning at 10 AM. She's attached the current deck for reference.",
    actionItems: [
      "Complete product roadmap section (slides 14-18)",
      "Include updated timeline for Feature X launch",
      "Add Q1 metrics comparison chart",
    ],
    suggestedSteps: [
      "Draft reply confirming you'll deliver by 5 PM",
      "Block 2 hours on calendar for deck work",
      "Pull Q1 metrics from analytics dashboard",
    ],
    whyItMatters: "This is time-sensitive — the board review is tomorrow at 10 AM and Sarah is the exec sponsor. Missing this deadline could delay the Q2 budget approval that your team depends on.",
    fullBody: [
      "Hey James,",
      "I'm wrapping up the Q2 strategy presentation and still need your product roadmap section (slides 14-18). The board review is tomorrow at 10 AM, so I'd ideally need it by EOD today.",
      "I've attached the current version of the deck so you can see the flow. Your section should cover the updated timeline for Feature X, the Q1 metrics comparison, and the resource allocation plan for Q2.",
      "Let me know if you need anything from my side. Happy to jump on a quick call if that helps.",
      "Thanks,\nSarah",
    ],
  },
  {
    id: "2",
    sender: "David Park",
    senderInitials: "DP",
    senderColor: "#3b82f6",
    channel: "slack",
    subject: "Bug in production — checkout flow",
    preview: "Heads up, we're seeing a 12% increase in checkout failures since the last deploy...",
    time: "8:45 AM",
    priority: "urgent",
    unread: true,
    aiLabel: "Urgent",
    aiSummary: "Production issue with checkout flow showing 12% increase in failures since yesterday's deploy. Engineering team is investigating but needs your sign-off to roll back.",
    actionItems: [
      "Review error logs from last deploy",
      "Decide on rollback vs. hotfix approach",
      "Notify customer support team",
    ],
    suggestedSteps: [
      "Reply to David approving rollback",
      "Add incident to the sprint retrospective notes",
      "Schedule post-mortem for Wednesday",
    ],
    whyItMatters: "Checkout failures directly impact revenue. At current rates, this could mean ~$15K in lost transactions per hour. David's team can fix it but needs your go-ahead on the approach.",
    fullBody: [
      "Heads up @james — we're seeing a 12% increase in checkout failures since yesterday's deploy (build #4821).",
      "The error is in the payment validation step. Looks like the new address verification is rejecting valid international cards.",
      "We have two options:\n1. Rollback to build #4820 (5 min, loses the new promo code feature)\n2. Hotfix the validation logic (est. 2 hours)",
      "I'd recommend the rollback given the revenue impact. Can you sign off?",
      "Error dashboard: metrics.internal/checkout-errors",
    ],
  },
  {
    id: "3",
    sender: "Lisa Rodriguez",
    senderInitials: "LR",
    senderColor: "#8b5cf6",
    channel: "email",
    subject: "Partnership proposal from Acme Corp",
    preview: "I had a great call with the Acme Corp team yesterday. They're proposing a co-marketing...",
    time: "Yesterday",
    priority: "high",
    unread: false,
    hasAttachment: true,
    aiLabel: "Follow-Up",
    aiSummary: "Lisa had a productive call with Acme Corp about a co-marketing partnership. They're proposing a joint webinar series and content swap for Q2. She needs your input on whether this aligns with the product marketing roadmap.",
    actionItems: [
      "Review Acme Corp partnership proposal deck",
      "Assess alignment with Q2 marketing calendar",
      "Provide feedback to Lisa by Wednesday",
    ],
    suggestedSteps: [
      "Reply asking for the full proposal document",
      "Add a review task due Wednesday",
      "Check Acme Corp's audience overlap with your ICP",
    ],
    whyItMatters: "Acme Corp has 50K+ subscribers in your target market. A co-marketing deal could drive significant top-of-funnel growth with minimal spend. Lisa flagged this as her top partnership opportunity for Q2.",
    fullBody: [
      "Hi James,",
      "I had a great call with the Acme Corp team yesterday. They're proposing a co-marketing partnership that I think could be really valuable for us.",
      "The main ideas:\n- Joint webinar series (monthly, starting April)\n- Content swap — guest posts on each other's blogs\n- Shared case study featuring a mutual customer",
      "Their audience is heavily B2B SaaS, which aligns well with our ICP. I've attached their media kit and audience demographics.",
      "Could you take a look and let me know if this fits with the product marketing roadmap for Q2? I'd like to get back to them by end of week.",
      "Best,\nLisa",
    ],
  },
  {
    id: "4",
    sender: "Michael Torres",
    senderInitials: "MT",
    senderColor: "#22c55e",
    channel: "message",
    subject: "Lunch Thursday? Want to catch up on the reorg",
    preview: "Hey, are you free Thursday for lunch? I've been hearing things about the reorg...",
    time: "Yesterday",
    priority: "normal",
    unread: false,
    aiLabel: "Scheduling",
    aiSummary: "Michael wants to schedule a lunch for Thursday to discuss the upcoming reorganization. He seems to have informal intel about team changes.",
    actionItems: [
      "Check Thursday lunch availability",
      "Confirm or suggest alternative time",
    ],
    suggestedSteps: [
      "Reply confirming Thursday 12:30 PM",
      "Add lunch to calendar",
    ],
    whyItMatters: "Michael is in the Strategy team and often has early context on organizational changes. This could be valuable context ahead of next week's all-hands.",
    fullBody: [
      "Hey James,",
      "Are you free Thursday for lunch? I've been hearing some things about the reorg and wanted to catch up before the all-hands next week.",
      "I'm thinking that new Thai place on Market St? Around 12:30?",
      "Let me know!",
      "— Mike",
    ],
  },
  {
    id: "5",
    sender: "Emma Watson",
    senderInitials: "EW",
    senderColor: "#f59e0b",
    channel: "email",
    subject: "Design review feedback — Mobile app v2",
    preview: "I've reviewed the latest mockups for the mobile app v2. Overall looking great, but I have...",
    time: "Yesterday",
    priority: "normal",
    unread: false,
    aiLabel: "Requires Reply",
    aiSummary: "Emma has completed her design review of the mobile app v2 mockups. She's mostly positive but has concerns about navigation depth and onboarding flow. Wants to schedule a walkthrough.",
    actionItems: [
      "Review Emma's feedback on navigation patterns",
      "Evaluate alternative onboarding flow options",
      "Schedule design walkthrough meeting",
    ],
    suggestedSteps: [
      "Reply acknowledging feedback and propose walkthrough time",
      "Share feedback with the mobile team lead",
      "Add design review follow-up to sprint board",
    ],
    whyItMatters: "Mobile app v2 is your highest-priority project this quarter. Emma's UX feedback is critical before engineering starts the next sprint on Monday.",
    fullBody: [
      "Hi James,",
      "I've reviewed the latest mockups for the mobile app v2. Overall looking great — the new tab bar and gesture navigation feel really intuitive.",
      "A few concerns:\n1. The settings flow is 4 levels deep — can we flatten it?\n2. The onboarding carousel might lose users — suggest a progressive disclosure approach instead\n3. The dark mode contrast ratios need checking on some of the secondary text",
      "Would love to do a walkthrough together. Are you free tomorrow afternoon?",
      "Cheers,\nEmma",
    ],
  },
  {
    id: "6",
    sender: "Alex Kim",
    senderInitials: "AK",
    senderColor: "#0ea5e9",
    channel: "slack",
    subject: "Updated API docs are live",
    preview: "FYI — the updated API documentation is now live on the developer portal. Includes the...",
    time: "2 days ago",
    priority: "low",
    unread: false,
    aiSummary: "Alex is informing the team that updated API documentation is live. No action required unless you want to review the changes to the authentication endpoints.",
    actionItems: [
      "Review updated auth endpoint documentation (optional)",
    ],
    suggestedSteps: [
      "Mark as handled — informational only",
    ],
    whyItMatters: "Low priority — informational update. The auth endpoint changes may be relevant for the mobile app integration you're working on.",
    fullBody: [
      "FYI — the updated API documentation is now live on the developer portal.",
      "Includes the new authentication endpoints, rate limiting docs, and webhook event types.",
      "Let me know if anything looks off. I'll be doing another pass on the code samples later this week.",
      "— Alex",
    ],
  },
  {
    id: "7",
    sender: "Rachel Nguyen",
    senderInitials: "RN",
    senderColor: "#ec4899",
    channel: "email",
    subject: "Invoice #4829 — awaiting approval",
    preview: "Hi James, the invoice for the Q1 contractor work is ready for your approval...",
    time: "2 days ago",
    priority: "high",
    unread: false,
    aiLabel: "Follow-Up",
    aiSummary: "Rachel from Finance sent the Q1 contractor invoice (#4829, $18,500) for your approval. This is overdue by 2 days and may delay contractor payments.",
    actionItems: [
      "Review and approve invoice #4829 ($18,500)",
      "Confirm budget allocation against Q1 forecast",
    ],
    suggestedSteps: [
      "Open invoice portal and approve",
      "Reply confirming approval",
      "Add reminder to review Q2 contractor budget",
    ],
    whyItMatters: "This invoice is 2 days overdue. Delayed approval affects contractor payment schedules and could impact your team's relationship with the external dev agency.",
    fullBody: [
      "Hi James,",
      "The invoice for the Q1 contractor work is ready for your approval. Details below:",
      "Invoice #4829\nAmount: $18,500\nVendor: Nexus Dev Agency\nPeriod: Jan 1 – Mar 15, 2026\nBudget code: PROD-ENG-Q1",
      "This was due for approval on Friday. Could you take a look today if possible?",
      "Thanks,\nRachel Nguyen\nFinance Team",
    ],
  },
];

const filterTabs: { id: Filter; label: string; icon: React.ElementType; count?: number }[] = [
  { id: "all", label: "All", icon: Mail, count: 7 },
  { id: "urgent", label: "Urgent", icon: AlertTriangle, count: 2 },
  { id: "requires-reply", label: "Requires Reply", icon: Reply, count: 2 },
  { id: "scheduling", label: "Scheduling", icon: Timer, count: 1 },
  { id: "follow-up", label: "Follow-Up", icon: RotateCcw, count: 2 },
];

const filterMap: Record<Filter, string | undefined> = {
  all: undefined,
  urgent: "Urgent",
  "requires-reply": "Requires Reply",
  scheduling: "Scheduling",
  "follow-up": "Follow-Up",
};

const priorityConfig: Record<Priority, { label: string; bg: string; text: string; dot: string }> = {
  urgent: { label: "Urgent", bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  high: { label: "High", bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
  normal: { label: "Normal", bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  low: { label: "Low", bg: "bg-gray-50", text: "text-gray-500", dot: "bg-gray-400" },
};

const channelIcon: Record<Channel, React.ElementType> = {
  email: Mail,
  slack: MessageCircle,
  message: MessageCircle,
};

const channelLabel: Record<Channel, string> = {
  email: "Email",
  slack: "Slack",
  message: "iMessage",
};

export function InboxPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [handledIds, setHandledIds] = useState<Set<string>>(new Set());

  const filteredConversations = conversations.filter((c) => {
    const filterLabel = filterMap[activeFilter];
    if (filterLabel && c.aiLabel !== filterLabel) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.sender.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selected = conversations.find((c) => c.id === selectedId) || conversations[0];
  const isHandled = handledIds.has(selected.id);
  const ChannelIcon = channelIcon[selected.channel];
  const pConfig = priorityConfig[selected.priority];

  const handleMarkHandled = () => {
    setHandledIds((prev) => new Set(prev).add(selected.id));
  };

  const [draftingReply, setDraftingReply] = useState(false);
  const handleDraftReply = () => {
    setDraftingReply(true);
    setTimeout(() => setDraftingReply(false), 2000);
  };

  return (
    <div className="flex h-full">
      {/* Left panel — message list */}
      <div className="w-[380px] shrink-0 border-r border-border flex flex-col bg-[#fafafa]">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[18px] tracking-[-0.02em] text-[#1a1a2e]" style={{ fontWeight: 600 }}>
              Inbox
            </h1>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#999] hover:bg-[#ececf0] transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#bbb]" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-[#e5e5ea] bg-[var(--app-surface)] text-[12px] text-[#1a1a2e] placeholder:text-[#bbb] focus:outline-none focus:border-[#6366f1]/40 focus:ring-1 focus:ring-[#6366f1]/20 transition-colors"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 -mx-1 px-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                  activeFilter === tab.id
                    ? "bg-[#6366f1]/[0.08] text-[#6366f1] border border-[#6366f1]/15"
                    : "text-[#999] hover:bg-[#ececf0] border border-transparent"
                }`}
                style={{ fontWeight: 500 }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`min-w-[16px] h-[16px] rounded-full text-[10px] flex items-center justify-center px-1 ${
                      activeFilter === tab.id ? "bg-[#6366f1]/15 text-[#6366f1]" : "bg-[#e8e8ed] text-[#999]"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-2.5">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-6">
              <Mail className="w-8 h-8 text-[#ddd] mb-2" />
              <p className="text-[13px] text-[#999]" style={{ fontWeight: 500 }}>
                No messages match this filter
              </p>
            </div>
          ) : (
            <div className="space-y-0.5 pb-4">
              {filteredConversations.map((conv) => {
                const isActive = selectedId === conv.id;
                const ConvChannelIcon = channelIcon[conv.channel];
                const convPriority = priorityConfig[conv.priority];
                const isConvHandled = handledIds.has(conv.id);

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-white border border-[#e5e5ea] shadow-sm"
                        : "hover:bg-white/60 border border-transparent"
                    } ${isConvHandled ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px]"
                          style={{ backgroundColor: conv.senderColor, fontWeight: 600 }}
                        >
                          {conv.senderInitials}
                        </div>
                        {conv.unread && !isConvHandled && (
                          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#6366f1] border-2 border-[#fafafa]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span
                            className={`text-[12px] truncate ${conv.unread && !isConvHandled ? "text-[#1a1a2e]" : "text-[#717182]"}`}
                            style={{ fontWeight: conv.unread && !isConvHandled ? 600 : 500 }}
                          >
                            {conv.sender}
                          </span>
                          <span className="text-[10px] text-[#bbb] shrink-0 ml-2" style={{ fontWeight: 400 }}>
                            {conv.time}
                          </span>
                        </div>
                        <p
                          className={`text-[12px] truncate mb-1 ${conv.unread && !isConvHandled ? "text-[#1a1a2e]" : "text-[#717182]"}`}
                          style={{ fontWeight: conv.unread && !isConvHandled ? 500 : 400 }}
                        >
                          {conv.subject}
                        </p>
                        <p className="text-[11px] text-[#999] truncate" style={{ fontWeight: 400 }}>
                          {conv.preview}
                        </p>

                        {/* Badges */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#f5f5f7] border border-[#ececf0]">
                            <ConvChannelIcon className="w-2.5 h-2.5 text-[#999]" />
                            <span className="text-[10px] text-[#999]" style={{ fontWeight: 500 }}>
                              {channelLabel[conv.channel]}
                            </span>
                          </div>
                          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${convPriority.bg}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${convPriority.dot}`} />
                            <span className={`text-[10px] ${convPriority.text}`} style={{ fontWeight: 500 }}>
                              {convPriority.label}
                            </span>
                          </div>
                          {conv.aiLabel && (
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#6366f1]/[0.06] border border-[#6366f1]/10">
                              <Sparkles className="w-2.5 h-2.5 text-[#6366f1]" />
                              <span className="text-[10px] text-[#6366f1]" style={{ fontWeight: 500 }}>
                                {conv.aiLabel}
                              </span>
                            </div>
                          )}
                          {conv.hasAttachment && (
                            <Paperclip className="w-2.5 h-2.5 text-[#bbb]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right panel — detail view */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-[680px] mx-auto px-8 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${pConfig.bg}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${pConfig.dot}`} />
                <span className={`text-[11px] ${pConfig.text}`} style={{ fontWeight: 500 }}>
                  {pConfig.label} priority
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#f5f5f7] border border-[#ececf0]">
                <ChannelIcon className="w-3 h-3 text-[#717182]" />
                <span className="text-[11px] text-[#717182]" style={{ fontWeight: 500 }}>
                  {channelLabel[selected.channel]}
                </span>
              </div>
              {selected.hasAttachment && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#f5f5f7] border border-[#ececf0]">
                  <Paperclip className="w-3 h-3 text-[#717182]" />
                  <span className="text-[11px] text-[#717182]" style={{ fontWeight: 500 }}>
                    Attachment
                  </span>
                </div>
              )}
              {isHandled && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-50 border border-green-100">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="text-[11px] text-green-600" style={{ fontWeight: 500 }}>
                    Handled
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-[18px] tracking-[-0.02em] text-[#1a1a2e] mb-1.5" style={{ fontWeight: 600 }}>
              {selected.subject}
            </h2>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px]"
                style={{ backgroundColor: selected.senderColor, fontWeight: 600 }}
              >
                {selected.senderInitials}
              </div>
              <span className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>
                {selected.sender}
              </span>
              <span className="text-[12px] text-[#bbb]">·</span>
              <span className="text-[12px] text-[#999]" style={{ fontWeight: 400 }}>
                {selected.time}
              </span>
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="rounded-xl border border-[#6366f1]/15 bg-[#6366f1]/[0.02] p-4 mb-5">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-md bg-[#6366f1]/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[#6366f1]" />
              </div>
              <span className="text-[12px] text-[#6366f1]" style={{ fontWeight: 600 }}>
                AI Summary
              </span>
            </div>
            <p className="text-[13px] text-[#3a3a4a] leading-[1.65]" style={{ fontWeight: 400 }}>
              {selected.aiSummary}
            </p>
          </div>

          {/* Action Items & Suggested Steps — side by side */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* Action Items */}
            <div className="rounded-xl border border-[#e5e5ea] bg-[#fafafa] p-4">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-3.5 h-3.5 text-[#717182]" />
                <span className="text-[12px] text-[#1a1a2e]" style={{ fontWeight: 600 }}>
                  Action items
                </span>
              </div>
              <div className="space-y-2">
                {selected.actionItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded border border-[#ddd] bg-white shrink-0 mt-0.5 flex items-center justify-center">
                      {isHandled && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                    </div>
                    <span className={`text-[12px] leading-[1.5] ${isHandled ? "text-[#bbb] line-through" : "text-[#4a4a5a]"}`} style={{ fontWeight: 400 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Next Steps */}
            <div className="rounded-xl border border-[#e5e5ea] bg-[#fafafa] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-[#6366f1]" />
                <span className="text-[12px] text-[#1a1a2e]" style={{ fontWeight: 600 }}>
                  Suggested next steps
                </span>
              </div>
              <div className="space-y-2">
                {selected.suggestedSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-[#6366f1] shrink-0 mt-1" />
                    <span className="text-[12px] text-[#4a4a5a] leading-[1.5]" style={{ fontWeight: 400 }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={handleDraftReply}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-[12px] transition-all hover:shadow-md"
              style={{
                fontWeight: 500,
                background: draftingReply
                  ? "linear-gradient(135deg, #22c55e, #4ade80)"
                  : "linear-gradient(135deg, #6366f1, #818cf8)",
                boxShadow: draftingReply
                  ? "0 2px 8px rgba(34,197,94,0.2)"
                  : "0 2px 8px rgba(99,102,241,0.2)",
              }}
            >
              {draftingReply ? <Check className="w-3 h-3" /> : <PenLine className="w-3 h-3" />}
              {draftingReply ? "Draft created!" : "Draft reply"}
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-b1 text-[12px] text-t1 hover:bg-s4 transition-colors" style={{ fontWeight: 500 }}
              onClick={() => navigate("/app/notes")}
            >
              <Bell className="w-3 h-3 text-t2" />
              Add reminder
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-b1 text-[12px] text-t1 hover:bg-s4 transition-colors" style={{ fontWeight: 500 }}
              onClick={() => navigate("/app/review")}
            >
              <CalendarPlus className="w-3 h-3 text-t2" />
              Schedule meeting
            </button>
            <button
              onClick={handleMarkHandled}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-[12px] transition-colors ${
                isHandled
                  ? "border-green-500/25 bg-green-500/[0.06] text-green-600"
                  : "border-b1 text-t1 hover:bg-s4"
              }`}
              style={{ fontWeight: 500 }}
            >
              <CheckCircle2 className={`w-3 h-3 ${isHandled ? "text-green-600" : "text-t2"}`} />
              {isHandled ? "Handled" : "Mark as handled"}
            </button>
          </div>

          {/* Why this matters — AI assistant card */}
          <div className="rounded-xl border border-b1 bg-s2 p-4 mb-6">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-md bg-ind/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-ind" />
              </div>
              <span className="text-[12px] text-t1" style={{ fontWeight: 600 }}>
                Why this matters
              </span>
            </div>
            <p className="text-[12px] text-[#717182] leading-[1.65]" style={{ fontWeight: 400 }}>
              {selected.whyItMatters}
            </p>
          </div>

          {/* Full message body */}
          <div className="border-t border-[#f0f0f3] pt-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] text-[#999]" style={{ fontWeight: 500 }}>
                Full message
              </span>
              <button className="flex items-center gap-1 text-[11px] text-[#999] hover:text-[#717182] transition-colors">
                <ExternalLink className="w-3 h-3" />
                Open in {channelLabel[selected.channel]}
              </button>
            </div>
            <div className="space-y-3">
              {selected.fullBody.map((paragraph, i) => (
                <p key={i} className="text-[13px] text-[#4a4a5a] leading-[1.7] whitespace-pre-line" style={{ fontWeight: 400 }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}