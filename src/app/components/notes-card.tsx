import { StickyNote, ArrowRight, Circle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface NoteItem {
  id: number;
  note: string;
  actionItem: string;
  source: string;
  done: boolean;
}

const initialNotes: NoteItem[] = [
  {
    id: 1,
    note: "Product sync — Mar 14",
    actionItem: "Share updated roadmap with stakeholders by Thursday",
    source: "Meeting notes",
    done: false,
  },
  {
    id: 2,
    note: "Call with Acme Corp",
    actionItem: "Send revised pricing proposal to Tom at Acme",
    source: "Voice memo",
    done: false,
  },
  {
    id: 3,
    note: "Weekly reflection",
    actionItem: "Schedule team retrospective for end of sprint",
    source: "Journal",
    done: true,
  },
];

export function NotesCard() {
  const [notes, setNotes] = useState(initialNotes);
  const navigate = useNavigate();

  const toggleDone = (id: number) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, done: !n.done } : n))
    );
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-[14px]" style={{ fontWeight: 500 }}>Notes & Context</h3>
        </div>
        <span className="text-[12px] text-[#6366f1] cursor-pointer hover:underline" style={{ fontWeight: 500 }}
          onClick={() => navigate("/app/notes")}
        >
          All notes
        </span>
      </div>

      <div className="space-y-2.5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
            onClick={() => navigate("/app/notes")}
          >
            <button
              onClick={() => toggleDone(note.id)}
              className="mt-0.5 shrink-0"
            >
              {note.done ? (
                <CheckCircle2 className="w-4 h-4 text-[#6366f1]" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={`text-[13px] ${
                  note.done ? "line-through text-muted-foreground" : ""
                }`}
                style={{ fontWeight: 500 }}
              >
                {note.actionItem}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground" style={{ fontWeight: 500 }}>
                  {note.source}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  from "{note.note}"
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}