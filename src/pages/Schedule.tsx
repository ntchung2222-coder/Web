import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Filter, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useAppContext } from "@/src/context/AppContext";
import { cn, formatDate } from "@/src/lib/utils";

export function ScheduleTimeline() {
  const { t } = useAppContext();
  const days = [
    { date: "2026-02-20", label: "T6", active: true },
    { date: "2026-02-21", label: "T7", active: false },
    { date: "2026-02-22", label: "CN", active: false },
    { date: "2026-02-23", label: "T2", active: false },
    { date: "2026-02-24", label: "T3", active: false },
  ];

  const sessions = [
    {
      time: "08:00",
      events: [
        { id: 1, title: "Lễ khai mạc", type: "Event", location: "Sảnh chính", status: "Finished" },
      ]
    },
    {
      time: "09:30",
      events: [
        { id: 2, title: "Bảng A - Trận 1", type: "Match", p1: "Nguyen Van A", p2: "Tran Van B", location: "Bàn 1", status: "Finished" },
        { id: 3, title: "Bảng B - Trận 1", type: "Match", p1: "Le Thi C", p2: "Pham Van D", location: "Bàn 2", status: "Finished" },
      ]
    },
    {
      time: "11:00",
      events: [
        { id: 4, title: "Bảng A - Trận 2", type: "Match", p1: "Hoang E", p2: "Vu F", location: "Bàn 1", status: "Live" },
        { id: 5, title: "Bảng B - Trận 2", type: "Match", p1: "Ngo G", p2: "Bui H", location: "Bàn 2", status: "Upcoming" },
      ]
    },
    {
      time: "14:00",
      events: [
        { id: 6, title: "Bảng C - Trận 1", type: "Match", p1: "Dang L", p2: "Bui M", location: "Bàn 3", status: "Upcoming" },
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-text-main">{t("schedule")}</h1>
          <p className="text-sm text-text-muted">{t("trackMatches")}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary-outline" className="rounded-xl">
            <CalendarIcon size={18} className="mr-2" />
            {t("exportIcal")}
          </Button>
          <Button variant="primary" className="rounded-xl shadow-lg shadow-primary/20">
            {t("fullCalendar")}
          </Button>
        </div>
      </div>

      {/* Date Picker Strip */}
      <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
        <Button variant="ghost" size="icon" className="rounded-xl"><ChevronLeft size={20} /></Button>
        <div className="flex-1 flex items-center justify-around">
          {days.map((day) => (
            <button
              key={day.date}
              className={cn(
                "flex flex-col items-center p-3 rounded-xl transition-all min-w-[80px]",
                day.active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:bg-white/5 hover:text-text-main"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{day.label}</span>
              <span className="text-lg font-black">{formatDate(day.date)}</span>
            </button>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl"><ChevronRight size={20} /></Button>
      </div>

      {/* Timeline */}
      <div className="space-y-12 relative before:absolute before:left-[100px] before:top-0 before:bottom-0 before:w-px before:bg-white/5">
        {sessions.map((session, i) => (
          <div key={session.time} className="flex gap-12 relative">
            <div className="w-24 pt-2 text-right">
              <span className="text-sm font-black text-text-main font-mono">{session.time}</span>
            </div>
            
            <div className="flex-1 space-y-4">
              {session.events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 border-white/5 bg-bg-card/50 hover:border-primary/30 transition-all group flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        event.type === "Match" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                      )}>
                        {event.type === "Match" ? <Trophy size={24} /> : <CalendarIcon size={24} />}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-text-main">{event.title}</h3>
                          <Badge variant={
                            event.status === "Live" ? "danger" :
                            event.status === "Finished" ? "secondary" : "warning"
                          } className="text-[8px] uppercase tracking-widest">
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-text-muted font-medium">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {event.location}
                          </div>
                          {event.p1 && (
                            <div className="flex items-center gap-2">
                              <span className="text-text-main font-bold">{event.p1}</span>
                              <span className="opacity-50">vs</span>
                              <span className="text-text-main font-bold">{event.p2}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary-outline" size="sm" className="rounded-xl">
                      Details
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
