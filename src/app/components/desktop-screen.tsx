import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Wifi,
  Battery,
  Search,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
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

const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1758637612226-97ceebff95a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYWJzdHJhY3QlMjBncmFkaWVudCUyMGNhbG0lMjBkZXNrdG9wJTIwd2FsbHBhcGVyfGVufDF8fHx8MTc3MzY1NjQ0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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

export function DesktopScreen() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime());
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [clickedApp, setClickedApp] = useState<string | null>(null);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (appId: string) => {
    setClickedApp(appId);

    if (appId === "alfred") {
      setLaunching(true);
      setTimeout(() => {
        navigate("/launch");
      }, 600);
    } else {
      setTimeout(() => setClickedApp(null), 300);
    }
  };

  return (
    <div
      className="h-screen w-full relative overflow-hidden select-none"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${WALLPAPER_URL})`,
          filter: "brightness(0.85) saturate(1.1)",
        }}
      />
      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Launch animation overlay */}
      {launching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 bg-white z-50"
        />
      )}

      {/* Status Bar */}
      <div className="relative z-10 h-[28px] flex items-center justify-between px-4 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-white/90" style={{ fontWeight: 600 }}>
            &#63743;
          </span>
          <span className="text-[12px] text-white/80" style={{ fontWeight: 500 }}>
            Finder
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

      {/* Desktop Area — empty and clean */}
      <div className="relative z-10 flex-1" />

      {/* Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-end gap-1 px-2.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl">
          {dockApps.map((app, index) => {
            const IconComp = app.IconComponent;
            const isHovered = hoveredApp === app.id;
            const isClicked = clickedApp === app.id;
            const isAlfred = app.isAlfred;

            // Insert separator before Settings
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
                    onClick={() => handleAppClick(app.id)}
                    animate={{
                      scale: isClicked ? 0.85 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                    className="relative w-[52px] h-[52px] cursor-pointer rounded-[13px] overflow-hidden"
                    style={{
                      filter: isHovered
                        ? "drop-shadow(0 4px 12px rgba(0,0,0,0.2))"
                        : "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
                    }}
                  >
                    <IconComp />

                    {/* Badge */}
                    {app.badge && (
                      <div className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 border-2 border-white/40 flex items-center justify-center px-0.5">
                        <span className="text-[10px] text-white" style={{ fontWeight: 600 }}>
                          {app.badge}
                        </span>
                      </div>
                    )}

                    {/* Alfred glow ring */}
                    {isAlfred && isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-[13px] border-2 border-white/30"
                      />
                    )}
                  </motion.button>

                  {/* Active dot (only Alfred shows as "running") */}
                  <div className="h-1.5 mt-0.5 flex items-center justify-center">
                    {isAlfred && (
                      <div className="w-1 h-1 rounded-full bg-white/70" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}