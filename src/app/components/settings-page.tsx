import { useState } from "react";
import { useTheme } from "./theme-provider";
import {
  User,
  Bell,
  Shield,
  Palette,
  Plug,
  Brain,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Check,
  Mail,
  Calendar,
  StickyNote,
  MessageCircle,
  FolderOpen,
  Sparkles,
  Clock,
  Globe,
  Monitor,
  Moon,
  Sun,
  Volume2,
  Eye,
  Lock,
  KeyRound,
  Smartphone,
  LogOut,
  Download,
  Trash2,
  ExternalLink,
  Info,
  FileText,
} from "lucide-react";
import alfredLogo from "../assets/alfred-logo";
import { PWAInstallButton } from "./pwa-install-prompt";

/* ── Types ───────────────────────────────────────── */

type SettingsSection =
  | "profile"
  | "notifications"
  | "privacy"
  | "appearance"
  | "integrations"
  | "ai"
  | "billing"
  | "help";

interface SectionDef {
  id: SettingsSection;
  label: string;
  icon: React.ElementType;
  description: string;
}

const sections: SectionDef[] = [
  { id: "profile", label: "Profile", icon: User, description: "Account details and preferences" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alerts, sounds, and delivery" },
  { id: "privacy", label: "Privacy & Security", icon: Shield, description: "Data handling and access" },
  { id: "appearance", label: "Appearance", icon: Palette, description: "Theme, density, and layout" },
  { id: "integrations", label: "Integrations", icon: Plug, description: "Connected services" },
  { id: "ai", label: "AI Preferences", icon: Brain, description: "How Alfred behaves" },
  { id: "billing", label: "Billing", icon: CreditCard, description: "Plan and usage" },
  { id: "help", label: "Help & Support", icon: HelpCircle, description: "Docs, feedback, and contact" },
];

/* ── Toggle Component ────────────────────────────── */

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition-colors ${
        enabled ? "bg-[var(--app-indigo)]" : "bg-[var(--app-border)]"
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ── Select Component ────────────────────────────── */

function Select({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-2.5 py-1.5 rounded-lg border border-b1 bg-s1 text-[12px] text-t1 focus:outline-none focus:border-[var(--app-indigo)]/40 cursor-pointer"
      style={{ fontWeight: 400 }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

/* ── Row Component ───────────────────────────────── */

function SettingRow({
  icon: Icon,
  label,
  description,
  children,
}: {
  icon?: React.ElementType;
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 px-1 group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {Icon && (
          <div className="w-7 h-7 rounded-lg bg-s3 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-t2" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[13px] text-t1" style={{ fontWeight: 500 }}>{label}</p>
          {description && (
            <p className="text-[11px] text-t3 mt-0.5" style={{ fontWeight: 400 }}>{description}</p>
          )}
        </div>
      </div>
      <div className="shrink-0 ml-4">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-b2 my-1" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] text-t3 uppercase tracking-[0.05em] mb-2 mt-4 px-1" style={{ fontWeight: 600 }}>
      {children}
    </p>
  );
}

/* ── Main Component ──────────────────────────────── */

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const { theme: currentTheme, setTheme: setAppTheme } = useTheme();

  // Toggles state
  const [toggles, setToggles] = useState({
    emailNotifs: true,
    pushNotifs: true,
    soundNotifs: false,
    weeklyDigest: true,
    actionAlerts: true,
    marketingEmails: false,
    analyticsSharing: false,
    twoFactor: true,
    biometric: false,
    aiAutoSuggest: true,
    aiDraftMessages: true,
    aiSmartReminders: true,
    aiLearnStyle: true,
    aiProactive: false,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Select states
  const [density, setDensity] = useState("Comfortable");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("America/Los_Angeles (PST)");
  const [aiTone, setAiTone] = useState("Professional");
  const [aiConfidence, setAiConfidence] = useState("Medium (70%+)");

  const integrations = [
    { name: "Google Calendar", icon: Calendar, status: "connected" as const, color: "#4285f4" },
    { name: "Gmail", icon: Mail, status: "connected" as const, color: "#ea4335" },
    { name: "Apple Notes", icon: StickyNote, status: "connected" as const, color: "#f59e0b" },
    { name: "Apple Reminders", icon: Clock, status: "connected" as const, color: "#ff9500" },
    { name: "iMessage", icon: MessageCircle, status: "connected" as const, color: "#22c55e" },
    { name: "Google Drive", icon: FolderOpen, status: "connected" as const, color: "#34a853" },
    { name: "Slack", icon: MessageCircle, status: "disconnected" as const, color: "#e01e5a" },
    { name: "Notion", icon: StickyNote, status: "disconnected" as const, color: "#000000" },
  ];

  return (
    <div className="flex h-full">
      {/* Left nav */}
      <div className="w-[220px] shrink-0 border-r border-b2 bg-s2 overflow-y-auto">
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-[18px] tracking-[-0.02em] text-t1" style={{ fontWeight: 600 }}>
            Settings
          </h1>
        </div>
        <nav className="px-2 pb-4">
          <div className="space-y-0.5">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                    isActive
                      ? "bg-s1 border border-b1 shadow-sm"
                      : "hover:bg-s1/60 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? "text-ind" : "text-t3"}`}
                    strokeWidth={isActive ? 2 : 1.75}
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-[12px] ${isActive ? "text-t1" : "text-t2"}`}
                      style={{ fontWeight: isActive ? 500 : 400 }}
                    >
                      {section.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Right content */}
      <div className="flex-1 overflow-y-auto bg-s1">
        <div className="max-w-[560px] mx-auto px-8 py-6">
          {/* ── Profile ───────────────────────────── */}
          {activeSection === "profile" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>Profile</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Manage your account information and preferences.</p>

              <div className="rounded-xl border border-[#e5e5ea] bg-[#fafafa] p-5 mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#e8e8ed] flex items-center justify-center text-[18px] text-[#717182]" style={{ fontWeight: 600 }}>
                    JM
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[#1a1a2e]" style={{ fontWeight: 600 }}>James Mitchell</p>
                    <p className="text-[12px] text-[#999]" style={{ fontWeight: 400 }}>james.mitchell@company.com</p>
                    <p className="text-[11px] text-[#bbb] mt-0.5" style={{ fontWeight: 400 }}>Member since January 2026</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-[12px] text-[#717182] hover:bg-[#f5f5f7] transition-colors" style={{ fontWeight: 500 }}>
                    Edit
                  </button>
                </div>
              </div>

              <SectionTitle>General</SectionTitle>
              <SettingRow icon={Globe} label="Language" description="App display language">
                <Select value={language} options={["English", "Spanish", "French", "German", "Japanese"]} onChange={setLanguage} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Clock} label="Timezone">
                <Select value={timezone} options={["America/Los_Angeles (PST)", "America/New_York (EST)", "Europe/London (GMT)", "Asia/Tokyo (JST)"]} onChange={setTimezone} />
              </SettingRow>

              <SectionTitle>Account</SectionTitle>
              <SettingRow icon={Download} label="Export data" description="Download all your Alfred data">
                <button className="px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-[12px] text-[#717182] hover:bg-[#f5f5f7] transition-colors" style={{ fontWeight: 500 }}>
                  Export
                </button>
              </SettingRow>
              <Divider />
              <SettingRow icon={LogOut} label="Sign out" description="Sign out of this device">
                <button className="px-3 py-1.5 rounded-lg border border-[#e5e5ea] text-[12px] text-red-500 hover:bg-red-50 transition-colors" style={{ fontWeight: 500 }}>
                  Sign out
                </button>
              </SettingRow>
              <Divider />
              <SettingRow icon={Trash2} label="Delete account" description="Permanently remove your account and data">
                <button className="px-3 py-1.5 rounded-lg border border-red-200 text-[12px] text-red-500 bg-red-50 hover:bg-red-100 transition-colors" style={{ fontWeight: 500 }}>
                  Delete
                </button>
              </SettingRow>
            </>
          )}

          {/* ── Notifications ─────────────────────── */}
          {activeSection === "notifications" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>Notifications</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Choose what you want to be notified about.</p>

              <SectionTitle>Channels</SectionTitle>
              <SettingRow icon={Mail} label="Email notifications" description="Get summaries and alerts via email">
                <Toggle enabled={toggles.emailNotifs} onChange={() => toggle("emailNotifs")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Smartphone} label="Push notifications" description="Real-time alerts on this device">
                <Toggle enabled={toggles.pushNotifs} onChange={() => toggle("pushNotifs")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Volume2} label="Sounds" description="Play sounds for notifications">
                <Toggle enabled={toggles.soundNotifs} onChange={() => toggle("soundNotifs")} />
              </SettingRow>

              <SectionTitle>Digest</SectionTitle>
              <SettingRow icon={Clock} label="Weekly digest" description="Summary of activity every Monday">
                <Toggle enabled={toggles.weeklyDigest} onChange={() => toggle("weeklyDigest")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Sparkles} label="AI action alerts" description="Notify when Alfred has new suggestions">
                <Toggle enabled={toggles.actionAlerts} onChange={() => toggle("actionAlerts")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Mail} label="Marketing emails" description="Product updates and feature announcements">
                <Toggle enabled={toggles.marketingEmails} onChange={() => toggle("marketingEmails")} />
              </SettingRow>
            </>
          )}

          {/* ── Privacy & Security ────────────────── */}
          {activeSection === "privacy" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>Privacy & Security</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Control how your data is used and secured.</p>

              <SectionTitle>Security</SectionTitle>
              <SettingRow icon={Lock} label="Two-factor authentication" description="Extra security for your account">
                <Toggle enabled={toggles.twoFactor} onChange={() => toggle("twoFactor")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={KeyRound} label="Biometric unlock" description="Use Face ID or Touch ID">
                <Toggle enabled={toggles.biometric} onChange={() => toggle("biometric")} />
              </SettingRow>

              <SectionTitle>Data</SectionTitle>
              <SettingRow icon={Eye} label="Analytics sharing" description="Help improve Alfred with anonymous usage data">
                <Toggle enabled={toggles.analyticsSharing} onChange={() => toggle("analyticsSharing")} />
              </SettingRow>

              <div className="mt-5 rounded-xl border border-[#e5e5ea] bg-[#fafafa] p-4">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#6366f1] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#1a1a2e] mb-1" style={{ fontWeight: 500 }}>Your data stays private</p>
                    <p className="text-[11px] text-[#999] leading-[1.6]" style={{ fontWeight: 400 }}>
                      Alfred processes your data locally on-device when possible. AI suggestions are generated from context — never stored externally or shared with third parties. You can delete all data at any time from Profile settings.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Appearance ────────────────────────── */}
          {activeSection === "appearance" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>Appearance</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Customize how Alfred looks and feels.</p>

              <SectionTitle>Theme</SectionTitle>
              <div className="grid grid-cols-3 gap-3 mb-4 px-1">
                {[
                  { id: "light", label: "Light", icon: Sun, desc: "Default light theme" },
                  { id: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
                  { id: "system", label: "System", icon: Monitor, desc: "Match OS setting" },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = currentTheme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setAppTheme(t.id as "light" | "dark" | "system")}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        isActive
                          ? "border-ind/30 bg-ind/[0.03] shadow-sm"
                          : "border-b1 bg-s2 hover:bg-s1"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? "bg-ind/10" : "bg-s4"}`}>
                        <Icon className={`w-4 h-4 ${isActive ? "text-ind" : "text-t3"}`} />
                      </div>
                      <div className="text-center">
                        <p className={`text-[12px] ${isActive ? "text-ind" : "text-t1"}`} style={{ fontWeight: 500 }}>{t.label}</p>
                        <p className="text-[10px] text-t4 mt-0.5" style={{ fontWeight: 400 }}>{t.desc}</p>
                      </div>
                      {isActive && (
                        <div className="w-4 h-4 rounded-full bg-ind flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <SectionTitle>Layout</SectionTitle>
              <SettingRow label="Density" description="Spacing between elements">
                <Select value={density} options={["Compact", "Comfortable", "Spacious"]} onChange={setDensity} />
              </SettingRow>

              <SectionTitle>Desktop App</SectionTitle>
              <div className="px-1 mb-2">
                <p className="text-[11px] text-t3 mb-3" style={{ fontWeight: 400 }}>
                  Install Alfred as a standalone desktop application for a native experience with offline support, keyboard shortcuts, and faster launch times.
                </p>
                <PWAInstallButton />
              </div>
            </>
          )}

          {/* ── Integrations ──────────────────────── */}
          {activeSection === "integrations" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>Integrations</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Manage connected services and data sources.</p>

              <div className="space-y-2">
                {integrations.map((integ) => {
                  const Icon = integ.icon;
                  const connected = integ.status === "connected";
                  return (
                    <div key={integ.name} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e5e5ea] bg-[#fafafa] hover:bg-white transition-colors">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${integ.color}14` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: integ.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>{integ.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-500" : "bg-[#ddd]"}`} />
                          <span className={`text-[11px] ${connected ? "text-green-600" : "text-[#999]"}`} style={{ fontWeight: 400 }}>
                            {connected ? "Connected" : "Not connected"}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1.5 rounded-lg text-[12px] transition-colors ${
                          connected
                            ? "border border-[#e5e5ea] text-[#999] hover:bg-[#f5f5f7] hover:text-red-500"
                            : "bg-[#6366f1] text-white hover:bg-[#5558e6]"
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── AI Preferences ────────────────────── */}
          {activeSection === "ai" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>AI Preferences</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Control how Alfred's AI assistant behaves and suggests actions.</p>

              <SectionTitle>Behavior</SectionTitle>
              <SettingRow icon={Sparkles} label="Auto-suggest actions" description="Alfred proactively suggests tasks and replies">
                <Toggle enabled={toggles.aiAutoSuggest} onChange={() => toggle("aiAutoSuggest")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Mail} label="Draft messages" description="Generate reply drafts for emails and chats">
                <Toggle enabled={toggles.aiDraftMessages} onChange={() => toggle("aiDraftMessages")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Bell} label="Smart reminders" description="Suggest reminders based on note and message context">
                <Toggle enabled={toggles.aiSmartReminders} onChange={() => toggle("aiSmartReminders")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Brain} label="Learn my style" description="Adapt suggestions to your writing tone over time">
                <Toggle enabled={toggles.aiLearnStyle} onChange={() => toggle("aiLearnStyle")} />
              </SettingRow>
              <Divider />
              <SettingRow icon={Eye} label="Proactive mode" description="Surface insights without being prompted">
                <Toggle enabled={toggles.aiProactive} onChange={() => toggle("aiProactive")} />
              </SettingRow>

              <SectionTitle>Tuning</SectionTitle>
              <SettingRow label="Response tone" description="How formal Alfred sounds">
                <Select value={aiTone} options={["Casual", "Professional", "Concise", "Detailed"]} onChange={setAiTone} />
              </SettingRow>
              <Divider />
              <SettingRow label="Confidence threshold" description="Minimum confidence for auto-suggestions">
                <Select value={aiConfidence} options={["Low (50%+)", "Medium (70%+)", "High (85%+)", "Very High (95%+)"]} onChange={setAiConfidence} />
              </SettingRow>

              <div className="mt-5 rounded-xl border border-[#6366f1]/15 bg-[#6366f1]/[0.02] p-4">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#6366f1] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] text-[#6366f1] mb-1" style={{ fontWeight: 500 }}>You're always in control</p>
                    <p className="text-[11px] text-[#717182] leading-[1.6]" style={{ fontWeight: 400 }}>
                      Alfred will never take actions without your explicit approval. All suggestions can be reviewed, edited, or dismissed before they're executed. Proactive mode only surfaces insights — it doesn't act on them.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Billing ───────────────────────────── */}
          {activeSection === "billing" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>Billing</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Manage your plan and usage.</p>

              <div className="rounded-xl border border-[#6366f1]/20 bg-gradient-to-br from-[#6366f1]/[0.04] to-[#818cf8]/[0.02] p-5 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img src={alfredLogo} alt="Alfred" className="w-6 h-6 rounded-[5px] object-contain p-px bg-black" />
                    <span className="text-[14px] text-[#1a1a2e]" style={{ fontWeight: 600 }}>Alfred Pro</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-[11px]" style={{ fontWeight: 500 }}>
                    Active
                  </span>
                </div>
                <p className="text-[12px] text-[#717182] mb-4" style={{ fontWeight: 400 }}>
                  $12/month · Renews April 1, 2026
                </p>
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-[#999]" style={{ fontWeight: 400 }}>Daily actions used</span>
                    <span className="text-[11px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>3 / 50</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#ececf0] overflow-hidden">
                    <div className="h-full w-[6%] rounded-full bg-[#6366f1]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button className="px-3.5 py-1.5 rounded-lg border border-[#e5e5ea] text-[12px] text-[#717182] hover:bg-white transition-colors" style={{ fontWeight: 500 }}>
                    Change plan
                  </button>
                  <button className="px-3.5 py-1.5 rounded-lg border border-[#e5e5ea] text-[12px] text-[#717182] hover:bg-white transition-colors" style={{ fontWeight: 500 }}>
                    Billing history
                  </button>
                </div>
              </div>

              <SectionTitle>Payment</SectionTitle>
              <div className="rounded-xl border border-[#e5e5ea] bg-[#fafafa] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>Visa ending in 4829</p>
                  <p className="text-[11px] text-[#999]" style={{ fontWeight: 400 }}>Expires 08/2028</p>
                </div>
                <button className="text-[12px] text-[#6366f1] hover:text-[#4f46e5] transition-colors" style={{ fontWeight: 500 }}>
                  Update
                </button>
              </div>
            </>
          )}

          {/* ── Help & Support ────────────────────── */}
          {activeSection === "help" && (
            <>
              <h2 className="text-[16px] text-[#1a1a2e] mb-1" style={{ fontWeight: 600 }}>Help & Support</h2>
              <p className="text-[12px] text-[#999] mb-5" style={{ fontWeight: 400 }}>Find answers, share feedback, or contact us.</p>

              <div className="space-y-2">
                {[
                  { label: "Documentation", desc: "Guides, tutorials, and API reference", icon: FileText },
                  { label: "Contact Support", desc: "Get help from the Alfred team", icon: MessageCircle },
                  { label: "Feature Requests", desc: "Suggest improvements and new features", icon: Sparkles },
                  { label: "Keyboard Shortcuts", desc: "View all available shortcuts", icon: KeyRound },
                  { label: "What's New", desc: "Latest updates and changelog", icon: Info },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e5e5ea] bg-[#fafafa] hover:bg-white transition-colors text-left group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#f0f0f3] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#717182]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-[#1a1a2e]" style={{ fontWeight: 500 }}>{item.label}</p>
                        <p className="text-[11px] text-[#999]" style={{ fontWeight: 400 }}>{item.desc}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#ccc] group-hover:text-[#999] transition-colors" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <p className="text-[11px] text-[#ccc]" style={{ fontWeight: 400 }}>
                  Alfred v2.4.1 · Build 1247 · March 16, 2026
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}