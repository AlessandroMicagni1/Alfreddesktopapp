import { useState, useRef, useEffect } from "react";
import { Search, Command, Inbox, StickyNote, FolderOpen, ShieldCheck, Settings, Home, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const suggestions = [
  { label: "Go to Inbox", description: "View messages & threads", icon: Inbox, path: "/app/inbox" },
  { label: "Review approvals", description: "AI-suggested actions", icon: ShieldCheck, path: "/app/review" },
  { label: "Open Notes", description: "Notes & context builder", icon: StickyNote, path: "/app/notes" },
  { label: "Browse Files", description: "File organizer", icon: FolderOpen, path: "/app/files" },
  { label: "Settings", description: "App preferences", icon: Settings, path: "/app/settings" },
  { label: "Home", description: "Back to dashboard", icon: Home, path: "/app" },
];

export function CommandBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? suggestions.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-[#6366f1]/30 transition-colors cursor-text"
      >
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        {isOpen ? (
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or jump to…"
            className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered.length > 0) {
                handleSelect(filtered[0].path);
              }
            }}
          />
        ) : (
          <span className="flex-1 text-[14px] text-muted-foreground" style={{ fontWeight: 400 }}>
            Ask Alfred anything…
          </span>
        )}
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </div>

      {/* Dropdown results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-border">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#6366f1]" />
              <span className="text-[11px] text-muted-foreground" style={{ fontWeight: 500 }}>
                {query ? `Results for "${query}"` : "Quick navigation"}
              </span>
            </div>
          </div>
          <div className="py-1 max-h-[280px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-[13px] text-muted-foreground">No results found</p>
              </div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-[#6366f1]/10 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#6366f1] transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px]" style={{ fontWeight: 500 }}>{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
