import { Calendar, Clock, Video, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

const events = [
  {
    id: 1,
    time: "9:00 AM",
    duration: "30 min",
    title: "Daily standup",
    type: "video",
    subtitle: "Engineering team",
    color: "#6366f1",
    isNow: true,
  },
  {
    id: 2,
    time: "11:00 AM",
    duration: "1 hr",
    title: "Product review with Sarah",
    type: "in-person",
    subtitle: "Conf. Room 3B",
    color: "#8b5cf6",
    isNow: false,
  },
  {
    id: 3,
    time: "2:00 PM",
    duration: "45 min",
    title: "1:1 with David Chen",
    type: "video",
    subtitle: "Performance review prep",
    color: "#a78bfa",
    isNow: false,
  },
  {
    id: 4,
    time: "4:30 PM",
    duration: "15 min",
    title: "Reminder: Submit Q1 report",
    type: "reminder",
    subtitle: "Due by end of day",
    color: "#c4b5fd",
    isNow: false,
  },
];

export function ScheduleCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-[14px]" style={{ fontWeight: 500 }}>Today's Schedule</h3>
        </div>
        <span className="text-[12px] text-muted-foreground">Mon, Mar 16</span>
      </div>

      <div className="space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => {
              if (event.type === "reminder") navigate("/app/review");
            }}
            className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors cursor-pointer ${
              event.isNow ? "bg-[#6366f1]/[0.04]" : "hover:bg-muted/50"
            }`}
          >
            <div className="flex flex-col items-center pt-0.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: event.color }}
              />
              {event.isNow && (
                <div className="w-[1px] h-8 bg-[#6366f1]/20 mt-1" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] truncate" style={{ fontWeight: 500 }}>
                  {event.title}
                </p>
                {event.isNow && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] shrink-0" style={{ fontWeight: 500 }}>
                    Now
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {event.type === "video" && <Video className="w-3 h-3 text-muted-foreground" />}
                {event.type === "in-person" && <MapPin className="w-3 h-3 text-muted-foreground" />}
                {event.type === "reminder" && <Clock className="w-3 h-3 text-muted-foreground" />}
                <span className="text-[12px] text-muted-foreground">{event.subtitle}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[12px] text-muted-foreground" style={{ fontWeight: 500 }}>{event.time}</p>
              <p className="text-[11px] text-muted-foreground/70">{event.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}