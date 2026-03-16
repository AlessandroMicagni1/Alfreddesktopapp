import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Sparkles,
  Mail,
  Calendar,
  StickyNote,
  FolderOpen,
  MessageCircle,
  Settings,
  Music,
  Image,
  Wifi,
  Battery,
  Search,
  Volume2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import alfredLogo from "figma:asset/77695bebd8453aaf1b38066556539bdfe08c63ae.png";

const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1758637612226-97ceebff95a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYWJzdHJhY3QlMjBncmFkaWVudCUyMGNhbG0lMjBkZXNrdG9wJTIwd2FsbHBhcGVyfGVufDF8fHx8MTc3MzY1NjQ0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const dockApps = [
  { id: "alfred", label: "Alfred", icon: Sparkles, color: "#6366f1", isAlfred: true },
  { id: "mail", label: "Mail", icon: Mail, color: "#3b82f6", badge: 4 },
  { id: "calendar", label: "Calendar", icon: Calendar, color: "#ef4444" },
  { id: "notes", label: "Notes", icon: StickyNote, color: "#f59e0b" },
  { id: "files", label: "Files", icon: FolderOpen, color: "#0ea5e9" },
  { id: "messages", label: "Messages", icon: MessageCircle, color: "#22c55e" },
  { id: "music", label: "Music", icon: Music, color: "#ec4899" },
  { id: "photos", label: "Photos", icon: Image, color: "#8b5cf6" },
  { id: "settings", label: "Settings", icon: Settings, color: "#6b7280" },
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

const loadingSteps = [
  { label: "Connecting to your workspace", delay: 0 },
  { label: "Syncing calendar & messages", delay: 800 },
  { label: "Loading your preferences", delay: 1800 },
  { label: "Almost ready", delay: 2600 },
];

export function LaunchScreen() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime());
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [windowReady, setWindowReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Window appears after a brief delay
  useEffect(() => {
    const t = setTimeout(() => setWindowReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Progress animation
  useEffect(() => {
    if (!windowReady) return;

    const duration = 3400;
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    // Step updates
    loadingSteps.forEach((step, i) => {
      setTimeout(() => setCurrentStep(i), step.delay + 300);
    });

    // Navigate to onboarding
    const navTimeout = setTimeout(() => {
      navigate("/onboarding");
    }, 3800);

    return () => clearTimeout(navTimeout);
  }, [windowReady, navigate]);

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
      <div className="absolute inset-0 bg-black/5" />

      {/* Dim overlay when window is open */}
      <AnimatePresence>
        {windowReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20 z-20"
          />
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="relative z-30 h-[28px] flex items-center justify-between px-4 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-[12px] text-white/90" style={{ fontWeight: 600 }}>
            &#63743;
          </span>
          <span className="text-[12px] text-white/90" style={{ fontWeight: 500 }}>
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

      {/* Alfred App Window */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <AnimatePresence>
          {windowReady && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-[520px] rounded-xl overflow-hidden shadow-2xl"
              style={{
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)",
              }}
            >
              {/* Window Title Bar */}
              <div className="h-[38px] bg-[#f6f6f7] border-b border-black/[0.06] flex items-center px-3.5 relative">
                {/* Traffic lights */}
                <div className="flex items-center gap-[7px]">
                  <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                  <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e] border border-[#dea123]" />
                  <div className="w-[11px] h-[11px] rounded-full bg-[#28c840] border border-[#1aab29]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[12px] text-[#999]" style={{ fontWeight: 500 }}>
                    Alfred
                  </span>
                </div>
              </div>

              {/* Window Body */}
              <div className="bg-white px-10 pt-12 pb-10 flex flex-col items-center">
                {/* Alfred Logo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[96px] h-[96px] rounded-[22px] mb-6 overflow-hidden"
                  style={{
                    boxShadow: "0 8px 24px rgba(99,102,241,0.25)",
                  }}
                >
                  <img
                    src={alfredLogo}
                    alt="Alfred"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Welcome Text */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-[20px] tracking-[-0.02em] text-[#1a1a2e] mb-1.5" style={{ fontWeight: 600 }}>
                    Preparing your workspace
                  </h1>
                  <p className="text-[13px] text-[#717182]">
                    Alfred is getting everything ready for you.
                  </p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="w-full max-w-[320px] mb-5"
                >
                  <div className="h-[5px] rounded-full bg-[#ececf0] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #6366f1, #818cf8)",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Loading Steps */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.3 }}
                  className="h-[20px] flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      {/* Spinning dot */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-3 h-3 rounded-full border-[1.5px] border-[#6366f1]/20 border-t-[#6366f1]"
                      />
                      <span className="text-[12px] text-[#717182]" style={{ fontWeight: 400 }}>
                        {loadingSteps[currentStep]?.label}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Sync indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="mt-8 flex items-center gap-3"
                >
                  {[
                    { icon: Calendar, label: "Calendar", done: currentStep >= 1 },
                    { icon: Mail, label: "Email", done: currentStep >= 2 },
                    { icon: StickyNote, label: "Notes", done: currentStep >= 2 },
                    { icon: MessageCircle, label: "Messages", done: currentStep >= 3 },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-500 ${
                          item.done
                            ? "border-[#6366f1]/20 bg-[#6366f1]/[0.04]"
                            : "border-[#ececf0] bg-[#fafafa]"
                        }`}
                      >
                        <Icon
                          className={`w-3 h-3 transition-colors duration-500 ${
                            item.done ? "text-[#6366f1]" : "text-[#bbb]"
                          }`}
                          strokeWidth={1.75}
                        />
                        <span
                          className={`text-[11px] transition-colors duration-500 ${
                            item.done ? "text-[#6366f1]" : "text-[#999]"
                          }`}
                          style={{ fontWeight: 500 }}
                        >
                          {item.label}
                        </span>
                        {item.done && (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.25, type: "spring", stiffness: 500 }}
                            className="w-2.5 h-2.5 text-[#6366f1]"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 6l3 3 5-5" />
                          </motion.svg>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dock (dimmed, behind window) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-end gap-1.5 px-3 py-2 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl">
          {dockApps.map((app, index) => {
            const Icon = app.icon;
            const isAlfred = app.isAlfred;
            const showSeparator = index === dockApps.length - 1;

            return (
              <div key={app.id} className="flex items-end gap-1.5">
                {showSeparator && (
                  <div className="w-px h-10 bg-white/20 mx-1 self-center" />
                )}
                <div className="flex flex-col items-center">
                  <div
                    className="relative flex items-center justify-center w-[52px] h-[52px] rounded-[13px] shadow-lg overflow-hidden"
                    style={{
                      background: isAlfred
                        ? "#ffffff"
                        : app.color,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {isAlfred ? (
                      <img
                        src={alfredLogo}
                        alt="Alfred"
                        className="w-[80%] h-[80%] object-contain"
                      />
                    ) : (
                      <Icon
                        className="text-white"
                        style={{
                          width: 22,
                          height: 22,
                        }}
                        strokeWidth={1.75}
                      />
                    )}
                    {app.badge && (
                      <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 border-2 border-white/30 flex items-center justify-center px-1">
                        <span className="text-[10px] text-white" style={{ fontWeight: 600 }}>
                          {app.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="h-1.5 mt-1 flex items-center justify-center">
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