import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Sparkles,
  FileText,
  Image,
  Table,
  Presentation,
  FolderOpen,
  FileCode,
  FilePlus,
  Clock,
  Download,
  Trash2,
  Archive,
  Link2,
  Bell,
  Eye,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Layers,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Star,
  Check,
  X,
  FolderInput,
  Lightbulb,
  CalendarCheck,
  MessageSquare,
  RefreshCw,
  HardDrive,
  TrendingDown,
  Zap,
  FolderCheck,
} from "lucide-react";

/* ── Types ───────────────────────────────────────── */

type FileType = "pdf" | "doc" | "image" | "spreadsheet" | "presentation" | "folder" | "code" | "zip";

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  modified: string;
  location: string;
  starred?: boolean;
}

interface FileGroup {
  id: string;
  label: string;
  reason: string;
  files: FileItem[];
  color: string;
}

interface ClutterItem {
  id: string;
  files: FileItem[];
  reason: string;
  savings: string;
}

interface Suggestion {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  count?: number;
  actionLabel: string;
  dismissed?: boolean;
}

/* ── Helpers ─────────────────────────────────────── */

const typeConfig: Record<FileType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  pdf: { icon: FileText, color: "text-red-500", bg: "bg-red-500/10", label: "PDF" },
  doc: { icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", label: "Document" },
  image: { icon: Image, color: "text-purple-500", bg: "bg-purple-500/10", label: "Image" },
  spreadsheet: { icon: Table, color: "text-green-500", bg: "bg-green-500/10", label: "Spreadsheet" },
  presentation: { icon: Presentation, color: "text-orange-500", bg: "bg-orange-500/10", label: "Presentation" },
  folder: { icon: FolderOpen, color: "text-yellow-600", bg: "bg-yellow-500/10", label: "Folder" },
  code: { icon: FileCode, color: "text-cyan-500", bg: "bg-cyan-500/10", label: "Code" },
  zip: { icon: Archive, color: "text-gray-500", bg: "bg-gray-500/10", label: "Archive" },
};

/* ── Data ────────────────────────────────────────── */

const recentFiles: FileItem[] = [
  { id: "r1", name: "Q2_Strategy_Deck_v3.pptx", type: "presentation", size: "4.2 MB", modified: "2 hours ago", location: "Work / Strategy", starred: true },
  { id: "r2", name: "Feature_X_PRD_Final.pdf", type: "pdf", size: "1.8 MB", modified: "Yesterday", location: "Work / Product" },
  { id: "r3", name: "Team_Budget_2026.xlsx", type: "spreadsheet", size: "340 KB", modified: "Yesterday", location: "Work / Finance" },
  { id: "r4", name: "Lisbon_Trip_Itinerary.docx", type: "doc", size: "52 KB", modified: "Today", location: "Personal / Travel" },
  { id: "r5", name: "App_Mockup_v2.png", type: "image", size: "2.1 MB", modified: "3 hours ago", location: "Work / Design" },
  { id: "r6", name: "API_Integration_Notes.md", type: "code", size: "12 KB", modified: "Today", location: "Work / Engineering" },
];

const suggestedGroups: FileGroup[] = [
  {
    id: "g1",
    label: "Q2 Board Meeting",
    reason: "4 files related to your upcoming board presentation",
    files: [
      { id: "sg1", name: "Q2_Strategy_Deck_v3.pptx", type: "presentation", size: "4.2 MB", modified: "2 hours ago", location: "Work / Strategy" },
      { id: "sg2", name: "Revenue_Forecast_Q2.xlsx", type: "spreadsheet", size: "280 KB", modified: "2 days ago", location: "Work / Finance" },
      { id: "sg3", name: "Board_Agenda_Mar26.pdf", type: "pdf", size: "95 KB", modified: "3 days ago", location: "Work / Admin" },
      { id: "sg4", name: "Product_Roadmap_2026.pdf", type: "pdf", size: "1.1 MB", modified: "Yesterday", location: "Work / Product" },
    ],
    color: "#6366f1",
  },
  {
    id: "g2",
    label: "Lisbon Trip",
    reason: "3 files connected to your travel planning notes",
    files: [
      { id: "sg5", name: "Lisbon_Trip_Itinerary.docx", type: "doc", size: "52 KB", modified: "Today", location: "Personal / Travel" },
      { id: "sg6", name: "Passport_Scan.pdf", type: "pdf", size: "3.4 MB", modified: "2 weeks ago", location: "Personal / Documents" },
      { id: "sg7", name: "Flight_Confirmation.pdf", type: "pdf", size: "140 KB", modified: "5 days ago", location: "Personal / Travel" },
    ],
    color: "#f59e0b",
  },
  {
    id: "g3",
    label: "Feature X Launch",
    reason: "5 files tied to your product launch on April 1",
    files: [
      { id: "sg8", name: "Feature_X_PRD_Final.pdf", type: "pdf", size: "1.8 MB", modified: "Yesterday", location: "Work / Product" },
      { id: "sg9", name: "Launch_Checklist.docx", type: "doc", size: "38 KB", modified: "3 days ago", location: "Work / Product" },
      { id: "sg10", name: "Beta_Feedback_Summary.xlsx", type: "spreadsheet", size: "190 KB", modified: "4 days ago", location: "Work / Product" },
      { id: "sg11", name: "Marketing_Assets_v2.zip", type: "zip", size: "18 MB", modified: "Yesterday", location: "Work / Marketing" },
      { id: "sg12", name: "Demo_Recording.mp4", type: "image", size: "45 MB", modified: "2 days ago", location: "Work / Marketing" },
    ],
    color: "#22c55e",
  },
];

const needsReviewFiles: FileItem[] = [
  { id: "nr1", name: "Contract_Nexus_Agency_Draft.pdf", type: "pdf", size: "420 KB", modified: "Last week", location: "Downloads" },
  { id: "nr2", name: "Expense_Report_Feb.xlsx", type: "spreadsheet", size: "78 KB", modified: "3 weeks ago", location: "Downloads" },
  { id: "nr3", name: "NDA_Template_2025.docx", type: "doc", size: "65 KB", modified: "2 months ago", location: "Desktop" },
];

const clutterItems: ClutterItem[] = [
  {
    id: "c1",
    files: [
      { id: "cf1", name: "Q2_Strategy_Deck_v1.pptx", type: "presentation", size: "3.8 MB", modified: "2 weeks ago", location: "Work / Strategy" },
      { id: "cf2", name: "Q2_Strategy_Deck_v2.pptx", type: "presentation", size: "4.0 MB", modified: "1 week ago", location: "Work / Strategy" },
      { id: "cf3", name: "Q2_Strategy_Deck_v2_FINAL.pptx", type: "presentation", size: "4.1 MB", modified: "5 days ago", location: "Work / Strategy" },
    ],
    reason: "3 older versions of Q2 Strategy Deck — latest version (v3) is current",
    savings: "11.9 MB",
  },
  {
    id: "c2",
    files: [
      { id: "cf4", name: "Screenshot 2025-11-04.png", type: "image", size: "1.2 MB", modified: "4 months ago", location: "Desktop" },
      { id: "cf5", name: "Screenshot 2025-11-04 (2).png", type: "image", size: "1.2 MB", modified: "4 months ago", location: "Desktop" },
      { id: "cf6", name: "Screenshot 2025-12-19.png", type: "image", size: "980 KB", modified: "3 months ago", location: "Desktop" },
      { id: "cf7", name: "Untitled.docx", type: "doc", size: "0 KB", modified: "2 months ago", location: "Desktop" },
    ],
    reason: "4 desktop files that appear to be clutter — duplicate screenshots and an empty doc",
    savings: "3.4 MB",
  },
];

const aiSuggestions: Suggestion[] = [
  {
    id: "s1",
    icon: FolderInput,
    iconBg: "bg-[#6366f1]/10",
    iconColor: "text-[#6366f1]",
    title: "12 files from Downloads can be organized",
    description: "Alfred detected project files, receipts, and personal docs mixed in your Downloads folder. Move them to proper locations?",
    count: 12,
    actionLabel: "Review & Organize",
  },
  {
    id: "s2",
    icon: CalendarCheck,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    title: "4 documents related to your board meeting",
    description: "These files are connected to the Q2 Board Review on March 26. They've been grouped for quick access.",
    count: 4,
    actionLabel: "View Group",
  },
  {
    id: "s3",
    icon: Clock,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    title: "8 files unopened for 8+ months",
    description: "Consider archiving old screenshots, expired docs, and unused templates to free up 42 MB of space.",
    count: 8,
    actionLabel: "Review Files",
  },
  {
    id: "s4",
    icon: MessageSquare,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    title: "Contract referenced in recent messages",
    description: "The Nexus Agency contract draft was mentioned in Rachel's email about Invoice #4829. You may want to review it.",
    actionLabel: "Open Contract",
  },
  {
    id: "s5",
    icon: RefreshCw,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    title: "3 duplicate file versions detected",
    description: "Q2 Strategy Deck has v1, v2, and v2_FINAL alongside the current v3. Clean up old versions?",
    count: 3,
    actionLabel: "Clean Up",
  },
];

/* ── File Card Component ─────────────────────────── */

function FileCard({ file, compact }: { file: FileItem; compact?: boolean }) {
  const cfg = typeConfig[file.type];
  const Icon = cfg.icon;

  if (compact) {
    return (
      <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-s4 transition-colors cursor-pointer group">
        <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] text-t1 truncate" style={{ fontWeight: 500 }}>{file.name}</p>
          <p className="text-[10px] text-t4" style={{ fontWeight: 400 }}>{file.size} · {file.modified}</p>
        </div>
        <MoreHorizontal className="w-3 h-3 text-t4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-b2 bg-s1 hover:border-b1 hover:shadow-sm transition-all cursor-pointer group">
      <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 ${cfg.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[13px] text-t1 truncate" style={{ fontWeight: 500 }}>{file.name}</p>
          {file.starred && <Star className="w-3 h-3 text-[#f59e0b] shrink-0" fill="#f59e0b" />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-t3" style={{ fontWeight: 400 }}>{file.size}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-t4" />
          <span className="text-[11px] text-t3" style={{ fontWeight: 400 }}>{file.modified}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-t4" />
          <span className="text-[11px] text-t4" style={{ fontWeight: 400 }}>{file.location}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-t3 hover:bg-s4 transition-colors">
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-t3 hover:bg-s4 transition-colors">
          <Link2 className="w-3.5 h-3.5" />
        </button>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-t3 hover:bg-s4 transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────── */

export function FilesPage() {
  const navigate = useNavigate();
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());
  const [expandedGroup, setExpandedGroup] = useState<string | null>("g1");
  const [searchQuery, setSearchQuery] = useState("");
  const [organizedFiles, setOrganizedFiles] = useState<Set<string>>(new Set());
  const [archivedFiles, setArchivedFiles] = useState<Set<string>>(new Set());
  const [cleanedClutter, setCleanedClutter] = useState<Set<string>>(new Set());
  const [ignoredClutter, setIgnoredClutter] = useState<Set<string>>(new Set());
  const [createdFolders, setCreatedFolders] = useState<Set<string>>(new Set());
  const [snoozedSuggestions, setSnoozedSuggestions] = useState<Set<string>>(new Set());
  const [actedSuggestions, setActedSuggestions] = useState<Set<string>>(new Set());
  const [quickActionFeedback, setQuickActionFeedback] = useState<string | null>(null);

  const visibleSuggestions = aiSuggestions.filter((s) => !dismissedSuggestions.has(s.id));

  const dismissSuggestion = (id: string) => {
    setDismissedSuggestions((prev) => new Set(prev).add(id));
  };

  const handleOrganize = (fileId: string) => {
    setOrganizedFiles((prev) => new Set(prev).add(fileId));
  };

  const handleArchive = (fileId: string) => {
    setArchivedFiles((prev) => new Set(prev).add(fileId));
  };

  const handleCleanUp = (clutterItemId: string) => {
    setCleanedClutter((prev) => new Set(prev).add(clutterItemId));
  };

  const handleIgnoreClutter = (clutterItemId: string) => {
    setIgnoredClutter((prev) => new Set(prev).add(clutterItemId));
  };

  const handleCreateFolder = (groupId: string) => {
    setCreatedFolders((prev) => new Set(prev).add(groupId));
  };

  const handleSuggestionAction = (id: string) => {
    setActedSuggestions((prev) => new Set(prev).add(id));
  };

  const handleSnoozeSuggestion = (id: string) => {
    setSnoozedSuggestions((prev) => new Set(prev).add(id));
  };

  const handleQuickAction = (label: string) => {
    setQuickActionFeedback(label);
    setTimeout(() => setQuickActionFeedback(null), 1500);
  };

  const visibleReviewFiles = needsReviewFiles.filter(
    (f) => !organizedFiles.has(f.id) && !archivedFiles.has(f.id)
  );
  const visibleClutter = clutterItems.filter(
    (c) => !cleanedClutter.has(c.id) && !ignoredClutter.has(c.id)
  );

  return (
    <div className="flex h-full">
      {/* ── Main content area ──────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-[20px] tracking-[-0.02em] text-t1" style={{ fontWeight: 600 }}>
                File Organizer
              </h1>
              <p className="text-[13px] text-t3 mt-0.5" style={{ fontWeight: 400 }}>
                Alfred is tracking 1,247 files across 38 folders
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-ind/[0.06] text-ind">
                <Sparkles className="w-3 h-3" />
                <span className="text-[11px]" style={{ fontWeight: 500 }}>3 suggestions</span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-t4" />
            <input
              type="text"
              placeholder="Search files, folders, or ask Alfred..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-b1 bg-s2 text-[13px] text-t1 placeholder:text-t4 focus:outline-none focus:border-ind/40 focus:ring-2 focus:ring-ind/10 focus:bg-s1 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-t4" />
            </div>
          </div>

          {/* Storage overview bar */}
          <div className="rounded-xl border border-b1 bg-s2 p-4 mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5 text-t2" />
                <span className="text-[12px] text-t1" style={{ fontWeight: 500 }}>Storage Overview</span>
              </div>
              <span className="text-[11px] text-t3" style={{ fontWeight: 400 }}>24.3 GB of 50 GB used</span>
            </div>
            <div className="h-2 rounded-full bg-s4 overflow-hidden flex">
              <div className="h-full bg-blue-400 rounded-l-full" style={{ width: "28%" }} title="Documents" />
              <div className="h-full bg-purple-400" style={{ width: "14%" }} title="Images" />
              <div className="h-full bg-orange-400" style={{ width: "5%" }} title="Presentations" />
              <div className="h-full bg-gray-400 rounded-r-full" style={{ width: "1.5%" }} title="Other" />
            </div>
            <div className="flex items-center gap-4 mt-2">
              {[
                { label: "Documents", color: "bg-blue-400", size: "14.0 GB" },
                { label: "Images", color: "bg-purple-400", size: "7.0 GB" },
                { label: "Presentations", color: "bg-orange-400", size: "2.5 GB" },
                { label: "Other", color: "bg-gray-400", size: "0.8 GB" },
              ].map((cat) => (
                <div key={cat.label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                  <span className="text-[10px] text-t3" style={{ fontWeight: 400 }}>{cat.label} ({cat.size})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-t2" />
                <h2 className="text-[14px] text-t1" style={{ fontWeight: 600 }}>Recent Files</h2>
              </div>
              <button
                onClick={() => navigate("/app/files")}
                className="text-[12px] text-ind hover:text-ind/80 transition-colors" style={{ fontWeight: 500 }}>
                View all
              </button>
            </div>
            <div className="space-y-1.5">
              {recentFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          </section>

          {/* Suggested Groups */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-ind" />
                <h2 className="text-[14px] text-t1" style={{ fontWeight: 600 }}>Suggested Groups</h2>
                <span className="text-[11px] text-t3" style={{ fontWeight: 400 }}>AI-organized</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {suggestedGroups.map((group) => {
                const isExpanded = expandedGroup === group.id;
                return (
                  <div key={group.id} className="rounded-xl border border-b1 bg-s1 overflow-hidden">
                    <button
                      onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-s2 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${group.color}12` }}
                      >
                        <FolderOpen className="w-4 h-4" style={{ color: group.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-t1" style={{ fontWeight: 500 }}>{group.label}</p>
                        <p className="text-[11px] text-t3" style={{ fontWeight: 400 }}>{group.reason}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-t4 px-2 py-0.5 rounded-full bg-s3" style={{ fontWeight: 500 }}>
                          {group.files.length} files
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 text-t4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-b2 px-2 py-1.5 bg-s2">
                        {group.files.map((file) => (
                          <FileCard key={file.id} file={file} compact />
                        ))}
                        <div className="flex items-center gap-2 px-2.5 py-2 mt-1">
                          {createdFolders.has(group.id) ? (
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 text-[11px]" style={{ fontWeight: 500 }}>
                              <FolderCheck className="w-3 h-3" />
                              Folder created
                            </span>
                          ) : (
                            <button
                              onClick={() => handleCreateFolder(group.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ind text-white text-[11px] hover:bg-ind/80 transition-colors" style={{ fontWeight: 500 }}>
                              <FolderInput className="w-3 h-3" />
                              Create folder
                            </button>
                          )}
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-b1 text-[11px] text-t2 hover:bg-s1 transition-colors" style={{ fontWeight: 500 }}
                            onClick={() => navigate("/app/notes")}
                          >
                            <Link2 className="w-3 h-3" />
                            Link to note
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Needs Review */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h2 className="text-[14px] text-t1" style={{ fontWeight: 600 }}>Needs Review</h2>
                {visibleReviewFiles.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px]" style={{ fontWeight: 600 }}>{visibleReviewFiles.length}</span>
                )}
              </div>
            </div>
            {visibleReviewFiles.length === 0 ? (
              <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-4 text-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-1.5" />
                <p className="text-[12px] text-t2" style={{ fontWeight: 500 }}>All files reviewed!</p>
                <p className="text-[11px] text-t3 mt-0.5" style={{ fontWeight: 400 }}>No more files need attention.</p>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-1.5">
                <div className="space-y-1">
                  {visibleReviewFiles.map((file) => {
                    const cfg = typeConfig[file.type];
                    const Icon = cfg.icon;
                    return (
                      <div key={file.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-s1 border border-b2 group transition-all">
                        <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] text-t1 truncate" style={{ fontWeight: 500 }}>{file.name}</p>
                          <p className="text-[10px] text-t3" style={{ fontWeight: 400 }}>{file.location} · {file.modified}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOrganize(file.id)}
                            className="px-2.5 py-1 rounded-md text-[10px] text-ind bg-ind/[0.06] hover:bg-ind/[0.12] transition-colors" style={{ fontWeight: 500 }}>
                            Organize
                          </button>
                          <button
                            onClick={() => handleArchive(file.id)}
                            className="px-2.5 py-1 rounded-md text-[10px] text-t3 hover:bg-s4 transition-colors" style={{ fontWeight: 500 }}>
                            Archive
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* Clutter & Duplicates */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-t2" />
                <h2 className="text-[14px] text-t1" style={{ fontWeight: 600 }}>Clutter & Duplicates</h2>
              </div>
              {visibleClutter.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-t3">
                  <TrendingDown className="w-3 h-3" />
                  <span style={{ fontWeight: 400 }}>15.3 MB recoverable</span>
                </div>
              )}
            </div>
            {visibleClutter.length === 0 ? (
              <div className="rounded-xl border border-green-500/20 bg-green-500/[0.04] p-4 text-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-1.5" />
                <p className="text-[12px] text-t2" style={{ fontWeight: 500 }}>All cleaned up!</p>
                <p className="text-[11px] text-t3 mt-0.5" style={{ fontWeight: 400 }}>No duplicates or clutter detected.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {visibleClutter.map((item) => (
                  <div key={item.id} className="rounded-xl border border-b1 bg-s2 p-4 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[12px] text-t1 mb-0.5" style={{ fontWeight: 500 }}>{item.reason}</p>
                        <p className="text-[10px] text-t3" style={{ fontWeight: 400 }}>Potential savings: {item.savings}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleCleanUp(item.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors" style={{ fontWeight: 500 }}>
                          <Trash2 className="w-2.5 h-2.5" />
                          Clean up
                        </button>
                        <button
                          onClick={() => handleIgnoreClutter(item.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] text-t3 hover:bg-s4 transition-colors" style={{ fontWeight: 500 }}>
                          Ignore
                        </button>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      {item.files.map((file) => (
                        <FileCard key={file.id} file={file} compact />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ── Right assistant panel ──────────────────── */}
      <div className="w-[300px] shrink-0 border-l border-b1 bg-s2 overflow-y-auto">
        <div className="px-4 pt-5 pb-4">
          {/* Panel header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-ind/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-ind" />
            </div>
            <span className="text-[13px] text-t1" style={{ fontWeight: 600 }}>
              Alfred Insights
            </span>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { label: "To organize", value: "12", color: "text-ind" },
              { label: "Duplicates", value: "7", color: "text-amber-500" },
              { label: "Stale files", value: "8", color: "text-red-500" },
              { label: "Linked", value: "23", color: "text-green-500" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-b1 bg-s1 px-3 py-2.5 text-center">
                <p className={`text-[18px] ${stat.color}`} style={{ fontWeight: 600 }}>{stat.value}</p>
                <p className="text-[10px] text-t3 mt-0.5" style={{ fontWeight: 400 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Suggestion cards */}
          <div className="space-y-2.5">
            {visibleSuggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              const acted = actedSuggestions.has(suggestion.id);
              const snoozed = snoozedSuggestions.has(suggestion.id);
              return (
                <div key={suggestion.id} className={`rounded-xl border p-3.5 group transition-all ${
                  acted ? "border-green-500/20 bg-green-500/[0.04]"
                    : snoozed ? "border-b2 bg-s2 opacity-60"
                    : "border-b1 bg-s1"
                }`}>
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg ${acted ? "bg-green-500/10" : suggestion.iconBg} flex items-center justify-center shrink-0`}>
                      {acted ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Icon className={`w-3.5 h-3.5 ${suggestion.iconColor}`} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-[12px] text-t1 leading-[1.4]" style={{ fontWeight: 500 }}>
                          {suggestion.title}
                        </p>
                        <button
                          onClick={() => dismissSuggestion(suggestion.id)}
                          className="w-5 h-5 rounded flex items-center justify-center text-t4 hover:text-t2 hover:bg-s4 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[11px] text-t3 leading-[1.5] mt-1 mb-2.5" style={{ fontWeight: 400 }}>
                        {acted ? "Done! Alfred has processed this suggestion."
                          : snoozed ? "Snoozed — Alfred will remind you later."
                          : suggestion.description}
                      </p>
                      {!acted && !snoozed && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSuggestionAction(suggestion.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-ind bg-ind/[0.06] hover:bg-ind/[0.12] transition-colors" style={{ fontWeight: 500 }}>
                            {suggestion.actionLabel}
                            <ChevronRight className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => handleSnoozeSuggestion(suggestion.id)}
                            className="px-2.5 py-1 rounded-lg text-[11px] text-t3 hover:bg-s4 transition-colors" style={{ fontWeight: 500 }}>
                            Remind later
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions footer */}
          <div className="mt-5 pt-4 border-t border-b2">
            <p className="text-[11px] text-t3 mb-3" style={{ fontWeight: 500 }}>Quick Actions</p>
            <div className="space-y-1">
              {[
                { icon: FolderInput, label: "Organize Downloads", shortcut: "⌘O" },
                { icon: Archive, label: "Archive stale files", shortcut: "⌘A" },
                { icon: Link2, label: "Link file to note", shortcut: "⌘L" },
                { icon: Bell, label: "Set file reminder", shortcut: "⌘R" },
                { icon: Trash2, label: "Clean duplicates", shortcut: "⌘D" },
              ].map((action) => {
                const ActionIcon = action.icon;
                const isActive = quickActionFeedback === action.label;
                return (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.label)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors group ${
                      isActive ? "bg-green-500/[0.06]" : "hover:bg-s1"
                    }`}
                  >
                    {isActive
                      ? <Check className="w-3.5 h-3.5 text-green-500" />
                      : <ActionIcon className="w-3.5 h-3.5 text-t3 group-hover:text-t2" />
                    }
                    <span className={`flex-1 text-[12px] ${isActive ? "text-green-600" : "text-t2"}`} style={{ fontWeight: isActive ? 500 : 400 }}>
                      {isActive ? "Running..." : action.label}
                    </span>
                    {!isActive && <span className="text-[10px] text-t4" style={{ fontWeight: 400 }}>{action.shortcut}</span>}
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