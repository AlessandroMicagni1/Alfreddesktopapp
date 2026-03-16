import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Sidebar } from "./sidebar";
import {
  Wifi,
  Battery,
  Search,
  Volume2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlfredIcon,
  MailIcon,
  CalendarIcon,
  NotesIcon,
  FinderIcon,
  MessagesIcon,
  MusicIcon,
  PhotosIcon,
  SettingsIcon,
} from "./dock-icons";
import alfredLogo from "../assets/alfred-logo";

/* ── macOS-style Dock Icon Components ────────────── */

const dockApps = [
  { id: "alfred", label: "Alfred", IconComponent: AlfredIcon, isAlfred: true },
  { id: "mail", label: "Mail", IconComponent: MailIcon, badge: 4 },
  { id: "calendar", label: "Calendar", IconComponent: CalendarIcon },
  { id: "notes", label: "Notes", IconComponent: NotesIcon },
  { id: "files", label: "Finder", IconComponent: FinderIcon },
  { id: "messages", label: "Messages", IconComponent: MessagesIcon },
  { id: "music", label: "Music", IconComponent: MusicIcon },
  { id: "photos", label: "Photos", IconComponent: PhotosIcon },
  { id: "settings", label: "System Settings", IconComponent: SettingsIcon },
];

const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1758637612226-97ceebff95a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYWJzdHJhY3QlMjBncmFkaWVudCUyMGNhbG0lMjBkZXNrdG9wJTIwd2FsbHBhcGVyfGVufDF8fHx8MTc3MzY1NjQ0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getCurrentDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function Layout() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime());
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseApp = () => {
    setIsClosing(true);
    setTimeout(() => {
      navigate("/");
    }, 350);
  };

  return (
    <div
      className="h-screen w-full relative overflow-hidden select-none"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* ── Wallpaper ──────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${WALLPAPER_URL})`,
          filter: "brightness(0.85) saturate(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-black/5" />

      {/* ── macOS Status Bar ───────────────────────── */}
      <div className="relative z-30 h-[28px] flex items-center justify-between px-4 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-white/90" style={{ fontWeight: 600 }}>
            &#63743;
          </span>
          <span className="text-[12px] text-white/80" style={{ fontWeight: 500 }}>
            Alfred
          </span>
          <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>
            File
          </span>
          <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>
            Edit
          </span>
          <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>
            View
          </span>
          <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>
            Go
          </span>
          <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>
            Window
          </span>
          <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>
            Help
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi className="w-3.5 h-3.5 text-white/70" />
          <Volume2 className="w-3.5 h-3.5 text-white/70" />
          <Battery className="w-4 h-4 text-white/70" />
          <Search className="w-3.5 h-3.5 text-white/70" />
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-white/80" style={{ fontWeight: 400 }}>
              {getCurrentDate()}
            </span>
            <span className="text-[12px] text-white/80" style={{ fontWeight: 500 }}>
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* ── App Window ─────────────────────────────── */}
      <div
        className={`relative z-20 flex items-start justify-center ${
          isFullscreen ? "px-0 pt-0" : "px-6 pt-4"
        }`}
        style={{ height: isFullscreen ? "calc(100vh - 28px)" : "calc(100vh - 28px - 96px)" }}
      >
        <AnimatePresence>
          {!isClosing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              layout
              className={`w-full h-full flex flex-col overflow-hidden ${
                isFullscreen ? "max-w-none rounded-none" : "max-w-[1080px] rounded-xl"
              }`}
              style={{
                boxShadow: isFullscreen
                  ? "none"
                  : "0 24px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.1)",
              }}
            >
              {/* ── Window title bar ──────────────────── */}
              <div className="h-[38px] shrink-0 flex items-center bg-[var(--app-titlebar)] border-b border-[var(--app-divider)] px-3.5 gap-2">
                {/* Traffic lights */}
                <div className="flex items-center gap-[7px] mr-3 group/lights">
                  <button
                    onClick={handleCloseApp}
                    className="w-[12px] h-[12px] rounded-full bg-[#ff5f57] border border-[#e0443e] cursor-pointer hover:brightness-90 transition-all relative flex items-center justify-center"
                  >
                    <svg className="w-[6px] h-[6px] opacity-0 group-hover/lights:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="#4a0002" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button className="w-[12px] h-[12px] rounded-full bg-[#febc2e] border border-[#dea123] cursor-pointer hover:brightness-90 transition-all relative flex items-center justify-center">
                    <svg className="w-[6px] h-[6px] opacity-0 group-hover/lights:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8" stroke="#995700" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-[12px] h-[12px] rounded-full bg-[#28c840] border border-[#1aab29] cursor-pointer hover:brightness-90 transition-all relative flex items-center justify-center"
                  >
                    <svg className="w-[6px] h-[6px] opacity-0 group-hover/lights:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                      {isFullscreen ? (
                        <path d="M3 8.5L5 6.5M5 6.5V8.5M5 6.5H3M9 3.5L7 5.5M7 5.5V3.5M7 5.5H9" stroke="#006500" strokeWidth="1" strokeLinecap="round" />
                      ) : (
                        <path d="M2 4l4-2.5V3L2 8zM10 8L6 10.5V9l4-5z" fill="#006500" />
                      )}
                    </svg>
                  </button>
                </div>

                {/* Window title */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-1.5">
                    <img src={alfredLogo} alt="Alfred" className="w-5 h-5 rounded-[4px] object-contain" />
                    <span className="text-[12px] text-[var(--app-text-secondary)]" style={{ fontWeight: 500 }}>
                      Alfred
                    </span>
                  </div>
                </div>

                {/* Spacer matching traffic light width for centering */}
                <div className="w-[55px]" />
              </div>

              {/* ── Window body ──────────────────────── */}
              <div className="flex-1 flex bg-background overflow-hidden min-h-0">
                <Sidebar />
                <main className="flex-1 overflow-y-auto min-w-0">
                  <Outlet />
                </main>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Dock ───────────────────────────────────── */}
      {!isFullscreen && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-end gap-1 px-2.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl">
            {dockApps.map((app, index) => {
              const IconComp = app.IconComponent;
              const isHovered = hoveredApp === app.id;
              const isAlfred = app.isAlfred;
              const showSeparator = index === dockApps.length - 1;

              return (
                <div key={app.id} className="flex items-end gap-1">
                  {showSeparator && (
                    <div className="w-px h-10 bg-white/20 mx-0.5 self-center" />
                  )}
                  <div className="flex flex-col items-center relative">
                    {/* Tooltip */}
                    {isHovered && (
                      <div
                        className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md pointer-events-none z-10"
                      >
                        <span className="text-[11px] text-white whitespace-nowrap" style={{ fontWeight: 500 }}>
                          {app.label}
                        </span>
                      </div>
                    )}
                    <motion.button
                      onMouseEnter={() => setHoveredApp(app.id)}
                      onMouseLeave={() => setHoveredApp(null)}
                      onClick={() => {
                        if (isAlfred) navigate("/app");
                        else if (app.id === "mail" || app.id === "messages") navigate("/app/inbox");
                        else if (app.id === "notes") navigate("/app/notes");
                        else if (app.id === "files") navigate("/app/files");
                        else if (app.id === "settings") navigate("/app/settings");
                        else if (app.id === "calendar") navigate("/app");
                      }}
                      className="relative w-[50px] h-[50px] cursor-pointer rounded-[12px] overflow-hidden"
                      style={{
                        filter: isHovered
                          ? "drop-shadow(0 4px 12px rgba(0,0,0,0.2))"
                          : "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
                      }}
                    >
                      <IconComp />
                      {app.badge && (
                        <div className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 border-2 border-white/40 flex items-center justify-center px-0.5">
                          <span className="text-[10px] text-white" style={{ fontWeight: 600 }}>
                            {app.badge}
                          </span>
                        </div>
                      )}
                    </motion.button>

                    {/* Active dot */}
                    <div className="h-1.5 mt-0.5 flex items-center justify-center">
                      {isAlfred && (
                        <div className="w-1 h-1 rounded-full bg-white/80" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}