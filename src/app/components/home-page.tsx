import { CommandBar } from "./command-bar";
import { ScheduleCard } from "./schedule-card";
import { ApprovalsCard } from "./approvals-card";
import { MessagesCard } from "./messages-card";
import { NotesCard } from "./notes-card";
import { QuickActions } from "./quick-actions";
import { Sparkles } from "lucide-react";
import alfredLogo from "../assets/alfred-logo";

export function HomePage() {
  return (
    <div className="max-w-[1120px] mx-auto px-6 py-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
            Good morning, James
          </h1>
          <p className="text-[14px] text-muted-foreground mt-0.5">
            Monday, March 16 — You have 4 events and 3 items awaiting approval.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#6366f1]/[0.06] text-[#6366f1]">
          <img src={alfredLogo} alt="Alfred" className="w-5 h-5 rounded-[4px] object-contain p-px bg-black" />
          <span className="text-[12px]" style={{ fontWeight: 500 }}>Alfred is up to date</span>
        </div>
      </div>

      <div className="mb-6">
        <CommandBar />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 space-y-4 min-w-0">
          <ScheduleCard />
          <MessagesCard />
        </div>
        <div className="col-span-5 space-y-4 min-w-0">
          <ApprovalsCard />
          <NotesCard />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}