import {
  Home,
  Inbox,
  Calendar,
  StickyNote,
  ShieldCheck,
  Settings,
  Sparkles,
  ChevronDown,
  FolderOpen,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import alfredLogo from "../assets/alfred-logo";

const navItems = [
  { icon: Home, label: "Home", path: "/app" },
  { icon: Inbox, label: "Inbox", path: "/app/inbox", badge: 3 },
  { icon: Calendar, label: "Calendar", path: "/app" },
  { icon: StickyNote, label: "Notes", path: "/app/notes" },
  { icon: FolderOpen, label: "Files", path: "/app/files" },
  { icon: ShieldCheck, label: "Approvals", path: "/app/review", badge: 2 },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = () => {
    if (location.pathname === "/app/review") return "Approvals";
    if (location.pathname === "/app/inbox") return "Inbox";
    if (location.pathname === "/app/notes") return "Notes";
    if (location.pathname === "/app/files") return "Files";
    if (location.pathname === "/app/settings") return "Settings";
    if (location.pathname === "/app") return "Home";
    return "Home";
  };

  const activeItem = getActive();

  return (
    <aside className="w-[220px] h-full border-r border-border bg-[var(--app-sidebar-bg)] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-[10px] bg-black flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={alfredLogo}
            alt="Alfred"
            className="w-9 h-9 object-contain"
          />
        </div>
        <span className="text-[15px] tracking-[-0.01em]" style={{ fontWeight: 600 }}>
          Alfred
        </span>
      </div>

      {/* User */}
      <div className="mx-2.5 mb-3 px-2.5 py-2 rounded-lg hover:bg-sidebar-accent cursor-pointer flex items-center gap-2.5 transition-colors">
        <div className="w-7 h-7 rounded-full bg-[#e8e8ed] flex items-center justify-center text-[12px] text-muted-foreground" style={{ fontWeight: 500 }}>
          JM
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] truncate" style={{ fontWeight: 500 }}>James Mitchell</p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                style={{ fontWeight: isActive ? 500 : 400 }}
              >
                <Icon className="w-[16px] h-[16px]" strokeWidth={isActive ? 2 : 1.75} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="min-w-[18px] h-[18px] rounded-full bg-[var(--app-indigo)] text-white text-[11px] flex items-center justify-center px-1" style={{ fontWeight: 500 }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-2.5 pb-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <img src={alfredLogo} alt="Alfred" className="w-5 h-5 rounded-[4px] object-contain p-px bg-black" />
            <span className="text-[12px]" style={{ fontWeight: 500 }}>Alfred Pro</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-[1.4]">
            3 of 50 daily actions used
          </p>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[6%] rounded-full bg-[var(--app-indigo)]" />
          </div>
        </div>
      </div>
    </aside>
  );
}