import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Clock,
  Mail,
  StickyNote,
  CalendarDays,
  ExternalLink,
  Check,
  Pencil,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  User,
  MapPin,
  MessageSquare,
  AlertCircle,
  BellRing,
} from "lucide-react";

export function ActionReviewPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showFullContext, setShowFullContext] = useState(false);
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");

  // Editable fields
  const [meetingTitle, setMeetingTitle] = useState("Sync with Luca on Q1 Deliverables");
  const [meetingDate, setMeetingDate] = useState("2026-03-18");
  const [meetingTime, setMeetingTime] = useState("14:00");
  const [meetingDuration, setMeetingDuration] = useState("30");
  const [meetingLocation, setMeetingLocation] = useState("Google Meet (auto-generated)");
  const [messageBody, setMessageBody] = useState(
    `Hi Luca,\n\nFollowing up on our conversation — I'd like to schedule a quick sync to align on the Q1 deliverables and review the updated timeline.\n\nWould Tuesday at 2:00 PM work for you?\n\nBest,\nJames`
  );
  const [followUpReminder, setFollowUpReminder] = useState("If no response by Mar 19, send a gentle reminder");

  const handleApprove = () => {
    setStatus("approved");
    setIsEditing(false);
  };

  const handleReject = () => {
    setStatus("rejected");
    setIsEditing(false);
  };

  return (
    <div className="max-w-[860px] mx-auto px-8 py-6">
      {/* Back nav */}
      <button
        onClick={() => navigate("/app")}
        className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-5"
        style={{ fontWeight: 500 }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </button>

      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#6366f1]" />
            </div>
            <h1 className="text-[20px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
              Review Suggested Action
            </h1>
          </div>
          <p className="text-[13px] text-muted-foreground ml-[38px]">
            Alfred prepared this action based on your recent messages and calendar. Please review before executing.
          </p>
        </div>

        {status !== "pending" && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] ${
              status === "approved"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
            style={{ fontWeight: 500 }}
          >
            {status === "approved" ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Approved
              </>
            ) : (
              <>
                <X className="w-3.5 h-3.5" />
                Rejected
              </>
            )}
          </div>
        )}
      </div>

      {/* Main Review Card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Action Summary */}
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#6366f1]/10 text-[#6366f1]" style={{ fontWeight: 500 }}>
              Calendar + Email
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground" style={{ fontWeight: 500 }}>
              Multi-step action
            </span>
          </div>

          <h2 className="text-[17px] tracking-[-0.01em] mb-1" style={{ fontWeight: 600 }}>
            Schedule meeting with Luca & send invite
          </h2>
          <p className="text-[13px] text-muted-foreground leading-[1.55]">
            Alfred will create a calendar event for Tuesday, March 18 at 2:00 PM, then send an email invitation to Luca Bianchi with a proposed agenda based on your recent conversation.
          </p>
        </div>

        {/* Source Context */}
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2 mb-3.5">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <h3 className="text-[13px]" style={{ fontWeight: 600 }}>Source Context</h3>
            <span className="text-[11px] text-muted-foreground">— Why Alfred suggested this</span>
          </div>

          <div className="space-y-2.5">
            {/* Source: Message */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/60">
              <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px]" style={{ fontWeight: 500 }}>Email from Luca Bianchi</span>
                  <span className="text-[11px] text-muted-foreground">· Mar 14, 3:22 PM</span>
                </div>
                <p className="text-[12px] text-muted-foreground leading-[1.5]">
                  "Hey James — wanted to check in on the Q1 deliverables. A few items shifted on our end. Can we find 30 min this week to realign?"
                </p>
              </div>
              <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate("/app/inbox")}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Source: Note */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/60">
              <div className="w-7 h-7 rounded-md bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                <StickyNote className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px]" style={{ fontWeight: 500 }}>Note: Q1 Planning Updates</span>
                  <span className="text-[11px] text-muted-foreground">· Mar 13</span>
                </div>
                <p className="text-[12px] text-muted-foreground leading-[1.5]">
                  "Follow up with Luca re: shifted timeline. Need to confirm deliverable owners and updated milestones."
                </p>
              </div>
              <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate("/app/notes")}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Source: Calendar */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/60">
              <div className="w-7 h-7 rounded-md bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                <CalendarDays className="w-3.5 h-3.5 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px]" style={{ fontWeight: 500 }}>Calendar availability</span>
                  <span className="text-[11px] text-muted-foreground">· Tue, Mar 18</span>
                </div>
                <p className="text-[12px] text-muted-foreground leading-[1.5]">
                  You have an open slot from 1:30–3:00 PM. Luca's public calendar also shows availability at 2:00 PM.
                </p>
              </div>
              <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {showFullContext && (
            <div className="mt-3 p-3 rounded-lg border border-border bg-muted/20">
              <p className="text-[12px] text-muted-foreground leading-[1.6]">
                <span style={{ fontWeight: 500 }} className="text-foreground">Full reasoning chain:</span> Luca's email (Mar 14) requested a 30-minute sync. Your note from Mar 13 already flagged following up with Luca about shifted timelines. Alfred cross-referenced both calendars and found a mutual opening on Tuesday, Mar 18 at 2:00 PM. The suggested email draft references the Q1 deliverables topic from both the email thread and your planning notes. Confidence is high because all three data sources converge on the same action.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowFullContext(!showFullContext)}
            className="flex items-center gap-1 mt-3 text-[12px] text-[#6366f1] hover:underline"
            style={{ fontWeight: 500 }}
          >
            {showFullContext ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Hide full context
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                View full context
              </>
            )}
          </button>
        </div>

        {/* Confidence */}
        <div className="px-6 py-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-muted-foreground" style={{ fontWeight: 500 }}>Confidence</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[92%] rounded-full bg-[#6366f1]" />
                </div>
                <span className="text-[12px] text-[#6366f1]" style={{ fontWeight: 600 }}>92%</span>
              </div>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 border border-green-200" style={{ fontWeight: 500 }}>
                3 sources matched
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-[11px] text-muted-foreground">
              Similar actions approved <span style={{ fontWeight: 500 }}>12 times</span> in the past
            </span>
          </div>
        </div>

        {/* Suggested Changes / Editable Fields */}
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px]" style={{ fontWeight: 600 }}>Suggested Changes</h3>
            {status === "pending" && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 text-[12px] text-[#6366f1] hover:underline"
                style={{ fontWeight: 500 }}
              >
                <Pencil className="w-3 h-3" />
                {isEditing ? "Done editing" : "Edit fields"}
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Meeting Title */}
            <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
              <label className="text-[12px] text-muted-foreground pt-2 flex items-center gap-1.5" style={{ fontWeight: 500 }}>
                <MessageSquare className="w-3 h-3" />
                Meeting title
              </label>
              {isEditing ? (
                <input
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]/40 transition-all"
                />
              ) : (
                <p className="text-[13px] py-2" style={{ fontWeight: 500 }}>{meetingTitle}</p>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
              <label className="text-[12px] text-muted-foreground pt-2 flex items-center gap-1.5" style={{ fontWeight: 500 }}>
                <Calendar className="w-3 h-3" />
                Date & time
              </label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]/40 transition-all"
                  />
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]/40 transition-all"
                  />
                  <select
                    value={meetingDuration}
                    onChange={(e) => setMeetingDuration(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]/40 transition-all"
                  >
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">1 hour</option>
                  </select>
                </div>
              ) : (
                <p className="text-[13px] py-2" style={{ fontWeight: 500 }}>
                  Tuesday, March 18, 2026 at 2:00 PM · 30 min
                </p>
              )}
            </div>

            {/* Attendee */}
            <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
              <label className="text-[12px] text-muted-foreground pt-2 flex items-center gap-1.5" style={{ fontWeight: 500 }}>
                <User className="w-3 h-3" />
                Attendee
              </label>
              <div className="flex items-center gap-2 py-2">
                <div className="w-6 h-6 rounded-full bg-[#e8e8ed] flex items-center justify-center text-[10px] text-muted-foreground" style={{ fontWeight: 500 }}>
                  LB
                </div>
                <span className="text-[13px]" style={{ fontWeight: 500 }}>Luca Bianchi</span>
                <span className="text-[12px] text-muted-foreground">luca@company.com</span>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
              <label className="text-[12px] text-muted-foreground pt-2 flex items-center gap-1.5" style={{ fontWeight: 500 }}>
                <MapPin className="w-3 h-3" />
                Location
              </label>
              {isEditing ? (
                <input
                  value={meetingLocation}
                  onChange={(e) => setMeetingLocation(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]/40 transition-all"
                />
              ) : (
                <p className="text-[13px] py-2" style={{ fontWeight: 500 }}>{meetingLocation}</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Email Draft */}
            <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
              <label className="text-[12px] text-muted-foreground pt-2 flex items-center gap-1.5" style={{ fontWeight: 500 }}>
                <Mail className="w-3 h-3" />
                Email draft
              </label>
              {isEditing ? (
                <textarea
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  rows={7}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-[13px] leading-[1.6] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]/40 transition-all resize-none"
                />
              ) : (
                <div className="py-2 text-[13px] leading-[1.6] whitespace-pre-line text-muted-foreground">
                  {messageBody}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Follow-up Reminder */}
            <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
              <label className="text-[12px] text-muted-foreground pt-2 flex items-center gap-1.5" style={{ fontWeight: 500 }}>
                <BellRing className="w-3 h-3" />
                Follow-up
              </label>
              {isEditing ? (
                <input
                  value={followUpReminder}
                  onChange={(e) => setFollowUpReminder(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-[13px] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]/40 transition-all"
                />
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200" style={{ fontWeight: 500 }}>
                    Auto-reminder
                  </span>
                  <span className="text-[13px] text-muted-foreground">{followUpReminder}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Controls */}
        {status === "pending" ? (
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[12px] text-muted-foreground">
                Alfred will not act until you approve.
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleReject}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-[13px] text-muted-foreground hover:bg-muted transition-colors"
                style={{ fontWeight: 500 }}
              >
                <X className="w-3.5 h-3.5" />
                Reject
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-[13px] hover:bg-muted transition-colors"
                style={{ fontWeight: 500 }}
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#6366f1] text-white text-[13px] hover:bg-[#5558e6] transition-colors"
                style={{ fontWeight: 500 }}
              >
                <Check className="w-3.5 h-3.5" />
                Approve & Execute
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-4 flex items-center justify-between">
            <span className="text-[12px] text-muted-foreground">
              {status === "approved"
                ? "This action has been approved and is being executed by Alfred."
                : "This action was rejected and will not be executed."}
            </span>
            <button
              onClick={() => navigate("/app")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-[13px] hover:bg-muted transition-colors"
              style={{ fontWeight: 500 }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
          </div>
        )}
      </div>

      {/* Action History */}
      <div className="mt-5 rounded-xl border border-border bg-card p-5">
        <h3 className="text-[13px] mb-3" style={{ fontWeight: 600 }}>Action Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] mt-1.5 shrink-0" />
            <div>
              <p className="text-[12px]" style={{ fontWeight: 500 }}>Alfred detected a scheduling opportunity</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Mar 14, 3:30 PM — Triggered by Luca's email</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] mt-1.5 shrink-0" />
            <div>
              <p className="text-[12px]" style={{ fontWeight: 500 }}>Cross-referenced with your notes and calendar</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Mar 14, 3:31 PM — Found matching context in 2 notes</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] mt-1.5 shrink-0" />
            <div>
              <p className="text-[12px]" style={{ fontWeight: 500 }}>Drafted email and proposed calendar slot</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Mar 14, 3:32 PM — Ready for your review</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <div>
              <p className="text-[12px] text-muted-foreground" style={{ fontWeight: 500 }}>Awaiting your approval</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}