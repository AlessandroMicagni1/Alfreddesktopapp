import { useState } from "react";
import {
  Sparkles,
  ListChecks,
  Users,
  Bell,
  Calendar,
  FileText,
  Zap,
  ChevronRight,
  CheckCircle2,
  Clock,
  MapPin,
  Plane,
  Hotel,
  MessageCircle,
  ExternalLink,
  Share2,
  Wand2,
  LayoutList,
  Route,
  StickyNote,
  Plus,
  Search,
  MoreHorizontal,
  Star,
  Trash2,
  Hash,
  PenLine,
  Copy,
  Check,
} from "lucide-react";

/* ── Note data ────────────────────────────────────── */

interface NoteItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  tags: string[];
  starred?: boolean;
  rawContent: string;
  extractedTasks: Task[];
  linkedContacts: Contact[];
  suggestedReminders: Reminder[];
  relatedEvents: CalEvent[];
  linkedFiles: LinkedFile[];
  recommendedActions: RecommendedAction[];
  aiPlanSummary: string;
}

interface Task {
  id: string;
  text: string;
  done: boolean;
  priority?: "high" | "normal";
}

interface Contact {
  name: string;
  initials: string;
  color: string;
  context: string;
}

interface Reminder {
  text: string;
  when: string;
  icon: React.ElementType;
}

interface CalEvent {
  title: string;
  date: string;
  time: string;
}

interface LinkedFile {
  name: string;
  type: string;
}

interface RecommendedAction {
  label: string;
  description: string;
  icon: React.ElementType;
  accent?: boolean;
}

const notes: NoteItem[] = [
  {
    id: "1",
    title: "Lisbon trip planning",
    preview: "flights, accommodation, things to do, message Ana about restaurant recs...",
    date: "Today",
    tags: ["travel", "personal"],
    starred: true,
    rawContent: `Lisbon trip — maybe mid-April? 🇵🇹

Check flights from SFO → LIS, probably around Apr 14-21
Need to book hotel — boutique place in Alfama or Baixa area
Message Ana about restaurant recommendations, she went last year
Look into day trip to Sintra — palaces + gardens
Check if passport is still valid (might need renewal??)

Budget rough idea:
- Flights ~$650 round trip
- Hotel ~$150/night × 7 = $1,050
- Food + activities ~$800
- Total: ~$2,500

Things to do:
- Time Out Market for food
- Belém Tower + Jerónimos Monastery
- LX Factory for vintage shopping
- Fado show in Alfama
- Tram 28 ride
- Pastéis de Belém (obviously)

Ask Michael if he wants to join for a few days?
Download offline maps before leaving
Get travel insurance sorted

Don't forget:
- Cancel gym membership hold
- Set up out-of-office reply
- Water the plants — ask neighbor Sarah`,
    extractedTasks: [
      { id: "t1", text: "Search flights SFO → LIS for Apr 14-21", done: false, priority: "high" },
      { id: "t2", text: "Book boutique hotel in Alfama or Baixa", done: false, priority: "high" },
      { id: "t3", text: "Message Ana for restaurant recommendations", done: false },
      { id: "t4", text: "Research day trip to Sintra (palaces & gardens)", done: false },
      { id: "t5", text: "Check passport expiration date", done: false, priority: "high" },
      { id: "t6", text: "Ask Michael about joining for a few days", done: false },
      { id: "t7", text: "Download offline maps of Lisbon", done: false },
      { id: "t8", text: "Get travel insurance", done: false },
      { id: "t9", text: "Cancel gym membership hold before leaving", done: false },
      { id: "t10", text: "Set up out-of-office reply", done: false },
      { id: "t11", text: "Ask neighbor Sarah to water plants", done: false },
    ],
    linkedContacts: [
      { name: "Ana Ferreira", initials: "AF", color: "#ec4899", context: "Restaurant recs — went to Lisbon last year" },
      { name: "Michael Torres", initials: "MT", color: "#22c55e", context: "Potential travel companion for a few days" },
      { name: "Sarah (neighbor)", initials: "SN", color: "#f59e0b", context: "Plant watering while away" },
    ],
    suggestedReminders: [
      { text: "Check passport expiration", when: "Tomorrow, 9 AM", icon: Clock },
      { text: "Book flights before prices increase", when: "This Friday", icon: Plane },
      { text: "Message Ana about restaurants", when: "Today, 6 PM", icon: MessageCircle },
      { text: "Set up out-of-office reply", when: "Apr 13, 5 PM", icon: Bell },
    ],
    relatedEvents: [
      { title: "PTO Request — Apr 14-21", date: "Not yet created", time: "" },
      { title: "Team standup (notify absence)", date: "Apr 14", time: "9:00 AM" },
      { title: "Q2 Planning (conflict check)", date: "Apr 16", time: "2:00 PM" },
    ],
    linkedFiles: [
      { name: "Passport_scan.pdf", type: "PDF" },
      { name: "Travel_budget_template.xlsx", type: "Spreadsheet" },
    ],
    recommendedActions: [
      { label: "Create trip itinerary", description: "Generate a day-by-day plan from your notes", icon: Route, accent: true },
      { label: "Draft message to Ana", description: "Ask for Lisbon restaurant recommendations", icon: PenLine },
      { label: "Create PTO request", description: "Submit time-off for Apr 14-21", icon: Calendar },
      { label: "Set budget tracker", description: "Track spending against your $2,500 budget", icon: LayoutList },
    ],
    aiPlanSummary: "You're planning a 7-day trip to Lisbon around April 14-21 with an estimated budget of $2,500. Key next steps are booking flights and accommodation, checking your passport validity, and coordinating with Ana for local tips and Michael about potentially joining. Alfred has identified 11 action items, 3 people to contact, and 1 potential calendar conflict with the Q2 Planning meeting on Apr 16.",
  },
  {
    id: "2",
    title: "Product launch checklist",
    preview: "Feature X launch tasks, marketing assets, support docs, beta feedback...",
    date: "Yesterday",
    tags: ["work", "product"],
    rawContent: `Feature X Launch — target: April 1

Pre-launch:
- Finalize feature flag rollout plan with David
- QA sign-off from testing team
- Update help center articles
- Record demo video for marketing
- Brief customer support team

Marketing:
- Blog post draft (Lisa to review)
- Email campaign to existing users
- Social media assets from design team
- Product Hunt launch prep

Post-launch:
- Monitor error rates first 48 hours
- Collect early feedback via in-app survey
- Schedule retro for April 4
- Send thank-you notes to beta testers`,
    extractedTasks: [
      { id: "t1", text: "Finalize feature flag rollout plan with David", done: false, priority: "high" },
      { id: "t2", text: "Get QA sign-off from testing team", done: false, priority: "high" },
      { id: "t3", text: "Update help center articles", done: false },
      { id: "t4", text: "Record demo video for marketing", done: false },
      { id: "t5", text: "Brief customer support team", done: false },
      { id: "t6", text: "Review blog post draft (Lisa)", done: false },
      { id: "t7", text: "Prepare Product Hunt launch", done: false },
    ],
    linkedContacts: [
      { name: "David Park", initials: "DP", color: "#3b82f6", context: "Feature flag rollout coordination" },
      { name: "Lisa Rodriguez", initials: "LR", color: "#8b5cf6", context: "Blog post review" },
    ],
    suggestedReminders: [
      { text: "QA sign-off deadline", when: "Mar 28", icon: Clock },
      { text: "Marketing assets due", when: "Mar 30", icon: Bell },
    ],
    relatedEvents: [
      { title: "Feature X Go/No-Go", date: "Mar 31", time: "10:00 AM" },
      { title: "Launch Day", date: "Apr 1", time: "9:00 AM" },
    ],
    linkedFiles: [
      { name: "Feature_X_PRD.pdf", type: "PDF" },
      { name: "Launch_timeline.xlsx", type: "Spreadsheet" },
    ],
    recommendedActions: [
      { label: "Create launch timeline", description: "Generate a Gantt-style plan from tasks", icon: Route, accent: true },
      { label: "Draft support brief", description: "Create FAQ for the support team", icon: PenLine },
    ],
    aiPlanSummary: "Feature X launches April 1. You have 7 pre-launch tasks remaining, with QA sign-off and rollout planning being the most critical. Alfred has linked 2 key collaborators and identified 2 calendar milestones.",
  },
  {
    id: "3",
    title: "Weekly errands & admin",
    preview: "groceries, car service, renew prescriptions, call insurance...",
    date: "2 days ago",
    tags: ["personal", "errands"],
    rawContent: `Weekly stuff:
- Groceries (Trader Joe's run)
- Drop off dry cleaning
- Car service appointment — check if the brake issue is covered under warranty
- Renew prescription at CVS
- Call health insurance about that weird charge from February
- Return Amazon package (deadline is Friday)
- Pick up birthday present for Mom (her bday is March 28)`,
    extractedTasks: [
      { id: "t1", text: "Groceries at Trader Joe's", done: false },
      { id: "t2", text: "Drop off dry cleaning", done: false },
      { id: "t3", text: "Schedule car service appointment", done: false },
      { id: "t4", text: "Renew prescription at CVS", done: false },
      { id: "t5", text: "Call health insurance about Feb charge", done: false, priority: "high" },
      { id: "t6", text: "Return Amazon package by Friday", done: false, priority: "high" },
      { id: "t7", text: "Buy birthday present for Mom (Mar 28)", done: false },
    ],
    linkedContacts: [],
    suggestedReminders: [
      { text: "Amazon return deadline", when: "Friday", icon: Clock },
      { text: "Mom's birthday", when: "Mar 28", icon: Bell },
    ],
    relatedEvents: [],
    linkedFiles: [],
    recommendedActions: [
      { label: "Create errand route", description: "Optimize order of stops", icon: Route, accent: true },
      { label: "Set deadline reminders", description: "Auto-remind for time-sensitive items", icon: Bell },
    ],
    aiPlanSummary: "You have 7 errands this week. 2 are time-sensitive: the Amazon return (Friday deadline) and Mom's birthday present (March 28). Alfred suggests batching the in-person stops.",
  },
  {
    id: "4",
    title: "Book notes — Deep Work",
    preview: "key takeaways, quotes, ideas to implement in daily routine...",
    date: "Last week",
    tags: ["reading", "productivity"],
    rawContent: `Deep Work by Cal Newport — Key takeaways

Core idea: The ability to perform deep work is becoming rare and valuable.

Strategies:
- Schedule deep work blocks (min 90 min)
- Quit social media (or drastically reduce)
- Embrace boredom — don't reach for phone
- "Shutdown ritual" at end of workday

Things I want to try:
- Block 9-11 AM daily for deep work
- No Slack until noon
- Weekly review on Fridays
- Track deep work hours in a spreadsheet

Favorite quotes:
"Clarity about what matters provides clarity about what does not."
"If you don't produce, you won't thrive."`,
    extractedTasks: [
      { id: "t1", text: "Block 9-11 AM daily for deep work on calendar", done: false, priority: "high" },
      { id: "t2", text: "Set Slack DND until noon", done: false },
      { id: "t3", text: "Create weekly review template for Fridays", done: false },
      { id: "t4", text: "Set up deep work hours tracking spreadsheet", done: false },
    ],
    linkedContacts: [],
    suggestedReminders: [
      { text: "Start deep work routine", when: "Tomorrow, 9 AM", icon: Clock },
      { text: "Friday weekly review", when: "Friday, 4 PM", icon: Bell },
    ],
    relatedEvents: [],
    linkedFiles: [],
    recommendedActions: [
      { label: "Create calendar blocks", description: "Add recurring 9-11 AM deep work blocks", icon: Calendar, accent: true },
      { label: "Create review template", description: "Generate a Friday review checklist", icon: LayoutList },
    ],
    aiPlanSummary: "These are actionable takeaways from Deep Work. Alfred identified 4 habits to implement and suggests starting with calendar blocks for the 9-11 AM deep work sessions.",
  },
];

/* ── Top‑bar action buttons ───────────────────────── */

const topActions = [
  { label: "Summarize", icon: Wand2 },
  { label: "Turn into tasks", icon: ListChecks },
  { label: "Create plan", icon: Route },
  { label: "Share", icon: Share2 },
];

/* ── Component ────────────────────────────────────── */

export function NotesPage() {
  const [selectedNoteId, setSelectedNoteId] = useState("1");
  const [taskStates, setTaskStates] = useState<Record<string, Record<string, boolean>>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [activeTopAction, setActiveTopAction] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [newNoteAdded, setNewNoteAdded] = useState(false);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  const getTaskDone = (noteId: string, taskId: string, defaultDone: boolean) => {
    return taskStates[noteId]?.[taskId] ?? defaultDone;
  };

  const toggleTask = (noteId: string, taskId: string, defaultDone: boolean) => {
    setTaskStates((prev) => ({
      ...prev,
      [noteId]: {
        ...prev[noteId],
        [taskId]: !(prev[noteId]?.[taskId] ?? defaultDone),
      },
    }));
  };

  const handleCopyPlan = () => {
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  const handleTopAction = (label: string) => {
    setActiveTopAction(label);
    setTimeout(() => setActiveTopAction(null), 1500);
  };

  const handleRecommendedAction = (label: string) => {
    setCompletedActions((prev) => new Set(prev).add(label));
  };

  const handleNewNote = () => {
    setNewNoteAdded(true);
    setTimeout(() => setNewNoteAdded(false), 1500);
  };

  const filteredNotes = notes.filter((n) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.preview.toLowerCase().includes(q);
  });

  const completedCount = selectedNote.extractedTasks.filter((t) =>
    getTaskDone(selectedNote.id, t.id, t.done)
  ).length;
  const totalTasks = selectedNote.extractedTasks.length;

  return (
    <div className="flex h-full">
      {/* ── Left sidebar: note list + editor ──────────── */}
      <div className="w-[420px] shrink-0 border-r border-b1 flex flex-col bg-s2">
        {/* Note list header */}
        <div className="px-5 pt-5 pb-3 border-b border-b1">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[18px] tracking-[-0.02em] text-t1" style={{ fontWeight: 600 }}>
              Notes
            </h1>
            <button
              onClick={handleNewNote}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                newNoteAdded ? "text-green-500 bg-green-500/10" : "text-t2 hover:bg-s4"
              }`}
            >
              {newNoteAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-t4" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-b1 bg-s1 text-[12px] text-t1 placeholder:text-t4 focus:outline-none focus:border-ind/40 focus:ring-1 focus:ring-ind/20 transition-colors"
            />
          </div>
        </div>

        {/* Note list */}
        <div className="overflow-y-auto px-2.5 py-2 flex-shrink-0" style={{ maxHeight: "220px" }}>
          <div className="space-y-0.5">
            {filteredNotes.map((note) => {
              const isActive = selectedNoteId === note.id;
              return (
                <button
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-s1 border border-b1 shadow-sm"
                      : "hover:bg-s1/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between mb-0.5">
                    <span className="text-[13px] text-t1 truncate pr-2" style={{ fontWeight: 500 }}>
                      {note.starred && <Star className="w-3 h-3 text-[#f59e0b] inline mr-1 -mt-0.5" fill="#f59e0b" />}
                      {note.title}
                    </span>
                    <span className="text-[10px] text-t4 shrink-0 mt-0.5" style={{ fontWeight: 400 }}>
                      {note.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-t3 truncate mb-1.5" style={{ fontWeight: 400 }}>
                    {note.preview}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-s3 border border-b2 text-[10px] text-t3"
                        style={{ fontWeight: 500 }}
                      >
                        <Hash className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note editor / raw content */}
        <div className="flex-1 border-t border-b1 overflow-y-auto">
          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <StickyNote className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span className="text-[12px] text-t3" style={{ fontWeight: 500 }}>
                  Raw note
                </span>
              </div>
              <button className="w-6 h-6 rounded flex items-center justify-center text-t4 hover:text-t2 transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="rounded-xl border border-b1 bg-s1 p-4">
              <pre className="text-[12px] text-tbody whitespace-pre-wrap leading-[1.7] break-words" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}>
                {selectedNote.rawContent}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: AI structured interpretation ─── */}
      <div className="flex-1 overflow-y-auto bg-s1">
        {/* Top action bar */}
        <div className="sticky top-0 z-10 bg-s1/80 backdrop-blur-xl border-b border-b2 px-8 py-3">
          <div className="flex items-center justify-between max-w-[720px] mx-auto">
            <div className="flex items-center gap-1.5">
              {topActions.map((action) => {
                const Icon = action.icon;
                const isActive = activeTopAction === action.label;
                return (
                  <button
                    key={action.label}
                    onClick={() => handleTopAction(action.label)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] transition-colors whitespace-nowrap ${
                      isActive
                        ? "border-green-500/25 bg-green-500/[0.06] text-green-600"
                        : "border-b1 text-t1 hover:bg-s4"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {isActive
                      ? <Check className="w-3 h-3 text-green-500 shrink-0" />
                      : <Icon className="w-3 h-3 text-t2 shrink-0" />
                    }
                    {isActive ? "Done!" : action.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ind/[0.06] text-ind">
              <Sparkles className="w-3 h-3" />
              <span className="text-[11px]" style={{ fontWeight: 500 }}>
                Analyzed
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[720px] mx-auto px-8 py-6">
          {/* AI Plan Summary */}
          <div className="rounded-xl border border-ind/15 bg-ind/[0.02] p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-ind/10 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-ind" />
                </div>
                <span className="text-[13px] text-ind" style={{ fontWeight: 600 }}>
                  Alfred's Analysis
                </span>
              </div>
              <button
                onClick={handleCopyPlan}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-ind hover:bg-ind/[0.06] transition-colors"
                style={{ fontWeight: 500 }}
              >
                {copiedPlan ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedPlan ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="text-[13px] text-tbody leading-[1.7]" style={{ fontWeight: 400 }}>
              {selectedNote.aiPlanSummary}
            </p>
          </div>

          {/* Extracted Tasks */}
          <div className="rounded-xl border border-b1 bg-s2 p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-t2" />
                <span className="text-[13px] text-t1" style={{ fontWeight: 600 }}>
                  Extracted Tasks
                </span>
                <span className="text-[11px] text-t3 ml-1" style={{ fontWeight: 400 }}>
                  {completedCount}/{totalTasks} done
                </span>
              </div>
              {/* Progress ring */}
              <div className="flex items-center gap-2">
                <div className="w-[44px] h-1.5 rounded-full bg-s4 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-ind transition-all duration-300"
                    style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-t3" style={{ fontWeight: 500 }}>
                  {totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}%
                </span>
              </div>
            </div>
            <div className="space-y-1">
              {selectedNote.extractedTasks.map((task) => {
                const done = getTaskDone(selectedNote.id, task.id, task.done);
                return (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(selectedNote.id, task.id, task.done)}
                    className="w-full flex items-start gap-2.5 px-3 py-2 rounded-lg hover:bg-s1 transition-colors text-left group"
                  >
                    <div
                      className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        done
                          ? "bg-ind border-ind"
                          : "border-b1 bg-s1 group-hover:border-ind/40"
                      }`}
                    >
                      {done && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                    </div>
                    <span
                      className={`text-[12px] leading-[1.5] transition-colors ${
                        done ? "text-t4 line-through" : "text-tbody"
                      }`}
                      style={{ fontWeight: 400 }}
                    >
                      {task.text}
                    </span>
                    {task.priority === "high" && !done && (
                      <span className="shrink-0 ml-auto px-1.5 py-0.5 rounded bg-red-500/10 text-[10px] text-red-500" style={{ fontWeight: 500 }}>
                        High
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two‑column: Contacts + Reminders */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {/* Linked Contacts */}
            <div className="rounded-xl border border-b1 bg-s2 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-t2" />
                <span className="text-[13px] text-t1" style={{ fontWeight: 600 }}>
                  Linked Contacts
                </span>
              </div>
              {selectedNote.linkedContacts.length === 0 ? (
                <p className="text-[12px] text-t4 italic" style={{ fontWeight: 400 }}>
                  No contacts detected in this note
                </p>
              ) : (
                <div className="space-y-2.5">
                  {selectedNote.linkedContacts.map((contact) => (
                    <div key={contact.name} className="flex items-start gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] shrink-0"
                        style={{ backgroundColor: contact.color, fontWeight: 600 }}
                      >
                        {contact.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] text-t1" style={{ fontWeight: 500 }}>
                          {contact.name}
                        </p>
                        <p className="text-[11px] text-t3 leading-[1.4]" style={{ fontWeight: 400 }}>
                          {contact.context}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Suggested Reminders */}
            <div className="rounded-xl border border-b1 bg-s2 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-4 h-4 text-t2" />
                <span className="text-[13px] text-t1" style={{ fontWeight: 600 }}>
                  Suggested Reminders
                </span>
              </div>
              {selectedNote.suggestedReminders.length === 0 ? (
                <p className="text-[12px] text-t4 italic" style={{ fontWeight: 400 }}>
                  No time-sensitive items detected
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedNote.suggestedReminders.map((rem, i) => {
                    const Icon = rem.icon;
                    return (
                      <div key={i} className="flex items-start gap-2.5 px-2.5 py-2 rounded-lg bg-s1 border border-b2">
                        <div className="w-6 h-6 rounded-md bg-ind/[0.06] flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3 text-ind" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] text-t1" style={{ fontWeight: 500 }}>
                            {rem.text}
                          </p>
                          <p className="text-[10px] text-t3" style={{ fontWeight: 400 }}>
                            {rem.when}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Two‑column: Calendar Events + Linked Files */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {/* Related Calendar Events */}
            <div className="rounded-xl border border-b1 bg-s2 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-t2" />
                <span className="text-[13px] text-t1" style={{ fontWeight: 600 }}>
                  Related Events
                </span>
              </div>
              {selectedNote.relatedEvents.length === 0 ? (
                <p className="text-[12px] text-t4 italic" style={{ fontWeight: 400 }}>
                  No related calendar events found
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedNote.relatedEvents.map((evt, i) => (
                    <div key={i} className="flex items-start gap-2.5 px-2.5 py-2 rounded-lg bg-s1 border border-b2">
                      <div className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-3 h-3 text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] text-t1" style={{ fontWeight: 500 }}>
                          {evt.title}
                        </p>
                        <p className="text-[10px] text-t3" style={{ fontWeight: 400 }}>
                          {evt.date}{evt.time ? ` · ${evt.time}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Linked Files */}
            <div className="rounded-xl border border-b1 bg-s2 p-5">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-t2" />
                <span className="text-[13px] text-t1" style={{ fontWeight: 600 }}>
                  Linked Files
                </span>
              </div>
              {selectedNote.linkedFiles.length === 0 ? (
                <p className="text-[12px] text-t4 italic" style={{ fontWeight: 400 }}>
                  No files linked to this note
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedNote.linkedFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-s1 border border-b2 group cursor-pointer hover:border-ind/20 transition-colors">
                      <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center shrink-0">
                        <FileText className="w-3 h-3 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-t1 truncate" style={{ fontWeight: 500 }}>
                          {file.name}
                        </p>
                        <p className="text-[10px] text-t3" style={{ fontWeight: 400 }}>
                          {file.type}
                        </p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-t4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="rounded-xl border border-b1 bg-s2 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-ind" />
              <span className="text-[13px] text-t1" style={{ fontWeight: 600 }}>
                Recommended Actions
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {selectedNote.recommendedActions.map((action) => {
                const Icon = action.icon;
                const isDone = completedActions.has(action.label);
                return (
                  <button
                    key={action.label}
                    onClick={() => handleRecommendedAction(action.label)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm ${
                      isDone
                        ? "border-green-500/20 bg-green-500/[0.04]"
                        : action.accent
                        ? "border-ind/20 bg-ind/[0.03] hover:bg-ind/[0.06]"
                        : "border-b1 bg-s1 hover:bg-s4"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isDone ? "bg-green-500/10" : action.accent ? "bg-ind/10" : "bg-s3"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" strokeWidth={1.75} />
                      ) : (
                        <Icon
                          className={`w-4 h-4 ${action.accent ? "text-ind" : "text-t2"}`}
                          strokeWidth={1.75}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-[12px] ${isDone ? "text-green-600" : action.accent ? "text-ind" : "text-t1"}`}
                        style={{ fontWeight: 500 }}
                      >
                        {isDone ? "Done!" : action.label}
                      </p>
                      <p className="text-[11px] text-t3 mt-0.5 leading-[1.4]" style={{ fontWeight: 400 }}>
                        {isDone ? "Alfred has processed this action." : action.description}
                      </p>
                    </div>
                    {!isDone && (
                      <ChevronRight
                        className={`w-3 h-3 shrink-0 mt-1 ${action.accent ? "text-ind/40" : "text-t4"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}