import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
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
} from "lucide-react";
import alfredLogo from "../assets/alfred-logo";

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

export function OnboardingScreen() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] =
    useState<Integration[]>(initialIntegrations);

  const connectedCount = integrations.filter(
    (i) => i.status === "connected"
  ).length;
  const connectingCount = integrations.filter(
    (i) => i.status === "connecting"
  ).length;
  const hasAnyConnected = connectedCount > 0 || connectingCount > 0;

  const handleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "connecting" as IntegrationStatus } : i
      )
    );
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, status: "connected" as IntegrationStatus } : i
        )
      );
    }, delay);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: "disconnected" as IntegrationStatus }
          : i
      )
    );
  };

  const handleContinue = () => {
    localStorage.setItem("alfred-onboarded", "true");
    navigate("/app", { replace: true });
  };

  return (
    <div
      className="h-screen w-full overflow-y-auto bg-[var(--s1)]"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <div className="max-w-[620px] mx-auto px-6 pt-12 pb-16">
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
          <h1
            className="text-[24px] tracking-[-0.03em] text-[var(--t1)] mb-2"
            style={{ fontWeight: 600 }}
          >
            Welcome to Alfred
          </h1>
          <p className="text-[14px] text-[var(--t3)] leading-[1.6] max-w-[480px] mx-auto">
            Connect your tools so Alfred can help you manage your day. The more
            sources Alfred can access, the more helpful and context-aware it
            becomes.
          </p>
        </motion.div>

        {/* Integrations Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-[var(--b1)] bg-[var(--s2)] shadow-sm overflow-hidden mb-6"
        >
          <div className="px-6 py-4 border-b border-[var(--b1)] flex items-center justify-between">
            <div>
              <h2
                className="text-[14px] text-[var(--t1)]"
                style={{ fontWeight: 600 }}
              >
                Connect your sources
              </h2>
              <p className="text-[12px] text-[var(--t3)] mt-0.5">
                {connectedCount} of {integrations.length} connected
              </p>
            </div>
            {connectedCount > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--ind)]/10 text-[var(--ind)]">
                <Check className="w-3 h-3" />
                <span className="text-[11px]" style={{ fontWeight: 500 }}>
                  {connectedCount} ready
                </span>
              </div>
            )}
          </div>

          <div className="divide-y divide-[var(--b1)]">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15 + index * 0.05,
                  }}
                  className="px-6 py-3.5 flex items-center gap-4"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${integration.color}10` }}
                  >
                    <Icon
                      className="w-[18px] h-[18px]"
                      style={{ color: integration.color }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[13px] text-[var(--t1)]"
                      style={{ fontWeight: 500 }}
                    >
                      {integration.name}
                    </p>
                    <p className="text-[12px] text-[var(--t3)] mt-0.5 truncate">
                      {integration.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {integration.status === "disconnected" && (
                      <button
                        onClick={() => handleConnect(integration.id)}
                        className="px-3.5 py-1.5 rounded-lg border border-[var(--b1)] text-[12px] text-[var(--t1)] hover:bg-[var(--s3)] transition-colors cursor-pointer"
                        style={{ fontWeight: 500 }}
                      >
                        Connect
                      </button>
                    )}
                    {integration.status === "connecting" && (
                      <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--ind)]/20 bg-[var(--ind)]/5 text-[var(--ind)]">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Loader2 className="w-3 h-3" />
                        </motion.div>
                        <span
                          className="text-[12px]"
                          style={{ fontWeight: 500 }}
                        >
                          Syncing
                        </span>
                      </div>
                    )}
                    {integration.status === "connected" && (
                      <button
                        onClick={() => handleDisconnect(integration.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-green-200 bg-green-50 text-green-600 hover:bg-green-100 transition-colors cursor-pointer dark:border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                      >
                        <Check className="w-3 h-3" />
                        <span
                          className="text-[12px]"
                          style={{ fontWeight: 500 }}
                        >
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
          className="rounded-xl border border-[var(--b1)] bg-[var(--s2)] shadow-sm px-6 py-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-3.5">
            <Shield className="w-4 h-4 text-[var(--ind)]" />
            <h3
              className="text-[13px] text-[var(--t1)]"
              style={{ fontWeight: 600 }}
            >
              Privacy & control
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[var(--s3)] flex items-center justify-center shrink-0 mt-0.5">
                <Eye className="w-3 h-3 text-[var(--t3)]" />
              </div>
              <div>
                <p
                  className="text-[13px] text-[var(--t1)]"
                  style={{ fontWeight: 500 }}
                >
                  You control what Alfred can access
                </p>
                <p className="text-[12px] text-[var(--t3)] mt-0.5">
                  Alfred only reads data from sources you explicitly connect.
                  Nothing is shared or stored externally.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[var(--s3)] flex items-center justify-center shrink-0 mt-0.5">
                <ToggleRight className="w-3 h-3 text-[var(--t3)]" />
              </div>
              <div>
                <p
                  className="text-[13px] text-[var(--t1)]"
                  style={{ fontWeight: 500 }}
                >
                  Disconnect sources anytime
                </p>
                <p className="text-[12px] text-[var(--t3)] mt-0.5">
                  You can revoke access to any integration at any time from
                  Settings. Alfred will stop using that data immediately.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[var(--s3)] flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-3 h-3 text-[var(--t3)]" />
              </div>
              <div>
                <p
                  className="text-[13px] text-[var(--t1)]"
                  style={{ fontWeight: 500 }}
                >
                  Every action requires your approval
                </p>
                <p className="text-[12px] text-[var(--t3)] mt-0.5">
                  Alfred will never send emails, create events, or take actions
                  without your explicit permission first.
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
          className="rounded-xl border border-[var(--b1)] bg-[var(--s2)] shadow-sm px-6 py-5 mb-8"
        >
          <h3
            className="text-[13px] text-[var(--t1)] mb-4"
            style={{ fontWeight: 600 }}
          >
            What Alfred can do once connected
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[var(--s3)] border border-[var(--b1)]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--ind)]/10 flex items-center justify-center shrink-0">
                    <Icon
                      className="w-4 h-4 text-[var(--ind)]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <p
                      className="text-[12px] text-[var(--t1)]"
                      style={{ fontWeight: 500 }}
                    >
                      {cap.title}
                    </p>
                    <p className="text-[11px] text-[var(--t3)] mt-0.5 leading-[1.45]">
                      {cap.description}
                    </p>
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
            className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[14px] text-white transition-all hover:shadow-lg cursor-pointer"
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
              className="text-[12px] text-[var(--t3)] hover:text-[var(--t2)] transition-colors cursor-pointer"
              style={{ fontWeight: 400 }}
            >
              Skip for now
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
