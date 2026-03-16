import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Calendar,
  Mail,
  StickyNote,
  Bell,
  MessageCircle,
  FolderOpen,
  Check,
  Shield,
  Eye,
  ToggleRight,
  ArrowRight,
  Loader2,
  CalendarCheck,
  PenLine,
  FileSearch,
  ListTodo,
  Wifi,
  Battery,
  Search,
  Volume2,
} from "lucide-react";
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
import alfredLogo from "figma:asset/77695bebd8453aaf1b38066556539bdfe08c63ae.png";

type IntegrationStatus = "disconnected" | "connecting" | "connected";

interface Integration {
  id: string;
  icon: React.ElementType;
  color: string;
  name: string;
  description: string;
  status: IntegrationStatus;
}

const initialIntegrations: Integration[] = [
  {
    id: "calendar",
    icon: Calendar,
    color: "#ef4444",
    name: "Calendar",
    description: "Access your schedule, find free slots, and create events",
    status: "disconnected",
  },
  {
    id: "email",
    icon: Mail,
    color: "#3b82f6",
    name: "Email",
    description: "Read and draft replies, surface priority messages",
    status: "disconnected",
  },
  {
    id: "notes",
    icon: StickyNote,
    color: "#f59e0b",
    name: "Notes",
    description: "Reference your notes for context and follow-ups",
    status: "disconnected",
  },
  {
    id: "reminders",
    icon: Bell,
    color: "#8b5cf6",
    name: "Reminders",
    description: "Create and manage reminders and to-dos",
    status: "disconnected",
  },
  {
    id: "messages",
    icon: MessageCircle,
    color: "#22c55e",
    name: "Messages & Slack",
    description: "Surface conversations and draft contextual replies",
    status: "disconnected",
  },
  {
    id: "files",
    icon: FolderOpen,
    color: "#0ea5e9",
    name: "Files & Desktop",
    description: "Find and reference relevant documents and files",
    status: "disconnected",
  },
];

const capabilities = [
  {
    icon: CalendarCheck,
    title: "Schedule meetings",
    description: "Find mutual availability and send invites automatically",
  },
  {
    icon: PenLine,
    title: "Draft replies",
    description: "Compose contextual email and message responses",
  },
  {
    icon: ListTodo,
    title: "Organize notes",
    description: "Surface relevant notes and create follow-up tasks",
  },
  {
    icon: FileSearch,
    title: "Find files",
    description: "Locate and reference documents when you need them",
  },
];

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

export function OnboardingScreen() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [time, setTime] = useState(getCurrentTime());
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const connectedCount = integrations.filter((i) => i.status === "connected").length;
  const connectingCount = integrations.filter((i) => i.status === "connecting").length;
  const hasAnyConnected = connectedCount > 0 || connectingCount > 0;

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "connecting" as IntegrationStatus } : i))
    );

    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "connected" as IntegrationStatus } : i))
      );
    }, delay);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "disconnected" as IntegrationStatus } : i))
    );
  };

  const handleContinue = () => {
    navigate("/app");
  };

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

      {/* ── Setup Window ───────────────────────────── */}
      <div className="relative z-20 flex items-start justify-center px-6 pt-4" style={{ height: "calc(100vh - 28px - 76px)" }}>
        <AnimatePresence>
          {!isClosing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full max-w-[720px] flex flex-col rounded-xl overflow-hidden"
              style={{
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.1)",
              }}
            >
              {/* ── Window title bar ──────────────────── */}
              <div className="h-[38px] shrink-0 flex items-center bg-[#f6f6f6] border-b border-[#e0e0e0] px-3.5 gap-2">
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
                  <button className="w-[12px] h-[12px] rounded-full bg-[#28c840] border border-[#1aab29] cursor-pointer hover:brightness-90 transition-all relative flex items-center justify-center">
                    <svg className="w-[6px] h-[6px] opacity-0 group-hover/lights:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4-2.5V3L2 8zM10 8L6 10.5V9l4-5z" fill="#006500" />
                    </svg>
                  </button>
                </div>

                {/* Window title */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-1.5">
                    <img src={alfredLogo} alt="Alfred" className="w-5 h-5 rounded-[4px] object-contain" />
                    <span className="text-[12px] text-[#4a4a4a]" style={{ fontWeight: 500 }}>
                      Alfred — Setup
                    </span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-[55px]" />
              </div>

              {/* ── Window body (scrollable setup content) ── */}
              <div className="flex-1 overflow-y-auto bg-[#fafafa]">
                <div className="max-w-[620px] mx-auto px-6 pt-10 pb-14">
                  {/* Welcome Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                  >
                    <div className="flex justify-center mb-5">
                      <div
                        className="w-[88px] h-[88px] rounded-[20px] overflow-hidden"
                        style={{
                          boxShadow: "0 8px 24px rgba(99,102,241,0.2)",
                        }}
                      >
                        <img
                          src={alfredLogo}
                          alt="Alfred"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <h1 className="text-[24px] tracking-[-0.03em] text-[#1a1a2e] mb-2" style={{ fontWeight: 600 }}>
                      Welcome to Alfred
                    </h1>
                    <p className="text-[14px] text-[#717182] leading-[1.6] max-w-[480px] mx-auto">
                      Connect your tools so Alfred can help you manage your day. The more sources Alfred can access, the more helpful and context-aware it becomes.
                    </p>
                  </motion.div>

                  {/* Integrations Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-xl border border-[#e5e5ea] bg-white shadow-sm overflow-hidden mb-6"
                  >
                    <div className="px-6 py-4 border-b border-[#f0f0f3] flex items-center justify-between">
                      <div>
                        <h2 className="text-[14px] text-[#1a1a2e]" style={{ fontWeight: 600 }}>
                          Connect your sources
                        </h2>
                        <p className="text-[12px] text-[#999] mt-0.5">
                          {connectedCount} of {integrations.length} connected
                        </p>
                      </div>
                      {connectedCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6366f1]/[0.06] text-[#6366f1]">
                          <Check className="w-3 h-3" />
                          <span className="text-[11px]" style={{ fontWeight: 500 }}>
                            {connectedCount} ready
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="divide-y divide-[#f0f0f3]">
                      {integrations.map((integration, index) => {
                        const Icon = integration.icon;
                        return (
                          <motion.div
                            key={integration.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                            className="px-6 py-3.5 flex items-center gap-4"
                          >
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${integration.color}10` }}
                            >
                              <Icon className="w-[18px] h-[18px]" style={{ color: integration.color }} strokeWidth={1.75} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>
                                {integration.name}
                              </p>
                              <p className="text-[12px] text-[#999] mt-0.5 truncate">{integration.description}</p>
                            </div>
                            <div className="shrink-0">
                              {integration.status === "disconnected" && (
                                <button
                                  onClick={() => handleConnect(integration.id)}
                                  className="px-3.5 py-1.5 rounded-lg border border-[#e5e5ea] text-[12px] text-[#1a1a2e] hover:bg-[#f5f5f7] transition-colors"
                                  style={{ fontWeight: 500 }}
                                >
                                  Connect
                                </button>
                              )}
                              {integration.status === "connecting" && (
                                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#6366f1]/20 bg-[#6366f1]/[0.04] text-[#6366f1]">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  >
                                    <Loader2 className="w-3 h-3" />
                                  </motion.div>
                                  <span className="text-[12px]" style={{ fontWeight: 500 }}>
                                    Syncing
                                  </span>
                                </div>
                              )}
                              {integration.status === "connected" && (
                                <button
                                  onClick={() => handleDisconnect(integration.id)}
                                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-green-200 bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                >
                                  <Check className="w-3 h-3" />
                                  <span className="text-[12px]" style={{ fontWeight: 500 }}>
                                    Connected
                                  </span>
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Privacy & Control */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-xl border border-[#e5e5ea] bg-white shadow-sm px-6 py-5 mb-6"
                  >
                    <div className="flex items-center gap-2 mb-3.5">
                      <Shield className="w-4 h-4 text-[#6366f1]" />
                      <h3 className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 600 }}>
                        Privacy & control
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-[#f5f5f7] flex items-center justify-center shrink-0 mt-0.5">
                          <Eye className="w-3 h-3 text-[#717182]" />
                        </div>
                        <div>
                          <p className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>
                            You control what Alfred can access
                          </p>
                          <p className="text-[12px] text-[#999] mt-0.5">
                            Alfred only reads data from sources you explicitly connect. Nothing is shared or stored externally.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-[#f5f5f7] flex items-center justify-center shrink-0 mt-0.5">
                          <ToggleRight className="w-3 h-3 text-[#717182]" />
                        </div>
                        <div>
                          <p className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>
                            Disconnect sources anytime
                          </p>
                          <p className="text-[12px] text-[#999] mt-0.5">
                            You can revoke access to any integration at any time from Settings. Alfred will stop using that data immediately.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-[#f5f5f7] flex items-center justify-center shrink-0 mt-0.5">
                          <Shield className="w-3 h-3 text-[#717182]" />
                        </div>
                        <div>
                          <p className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>
                            Every action requires your approval
                          </p>
                          <p className="text-[12px] text-[#999] mt-0.5">
                            Alfred will never send emails, create events, or take actions without your explicit permission first.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* What Alfred can do */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-xl border border-[#e5e5ea] bg-white shadow-sm px-6 py-5 mb-8"
                  >
                    <h3 className="text-[13px] text-[#1a1a2e] mb-4" style={{ fontWeight: 600 }}>
                      What Alfred can do once connected
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {capabilities.map((cap) => {
                        const Icon = cap.icon;
                        return (
                          <div
                            key={cap.title}
                            className="flex items-start gap-3 p-3 rounded-lg bg-[#fafafa] border border-[#f0f0f3]"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/[0.06] flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-[#6366f1]" strokeWidth={1.75} />
                            </div>
                            <div>
                              <p className="text-[12px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>
                                {cap.title}
                              </p>
                              <p className="text-[11px] text-[#999] mt-0.5 leading-[1.45]">{cap.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <button
                      onClick={handleContinue}
                      className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[14px] text-white transition-all hover:shadow-lg"
                      style={{
                        fontWeight: 500,
                        background: "linear-gradient(135deg, #6366f1, #818cf8)",
                        boxShadow: "0 4px 16px rgba(99,102,241,0.25)",
                      }}
                    >
                      {hasAnyConnected ? "Continue to Alfred" : "Start syncing"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {!hasAnyConnected && (
                      <button
                        onClick={handleContinue}
                        className="text-[12px] text-[#999] hover:text-[#717182] transition-colors"
                        style={{ fontWeight: 400 }}
                      >
                        Skip for now
                      </button>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Dock ───────────────────────────────────── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-end gap-1 px-2.5 py-1.5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl">
          {dockApps.map((app, index) => {
            const IconComp = app.IconComponent;
            const isHovered = hoveredApp === app.id;
            const showSeparator = index === dockApps.length - 1;

            return (
              <div key={app.id} className="flex items-end gap-1">
                {showSeparator && (
                  <div className="w-px h-10 bg-white/20 mx-0.5 self-center" />
                )}
                <div className="flex flex-col items-center relative">
                  {isHovered && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md pointer-events-none z-10">
                      <span className="text-[11px] text-white whitespace-nowrap" style={{ fontWeight: 500 }}>
                        {app.label}
                      </span>
                    </div>
                  )}
                  <motion.button
                    onMouseEnter={() => setHoveredApp(app.id)}
                    onMouseLeave={() => setHoveredApp(null)}
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

                  <div className="h-1.5 mt-0.5 flex items-center justify-center">
                    {app.isAlfred && (
                      <div className="w-1 h-1 rounded-full bg-white/80" />
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