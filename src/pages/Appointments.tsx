import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DoctorTierBadge } from "@/components/DoctorTierBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { doctors, appointments as seedAppointments, type Appointment } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";
import { Plus, ChevronLeft, ChevronRight, Mail, CalendarDays } from "lucide-react";
import { toast } from "sonner";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildMonthGrid(anchor: Date) {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  // Convert Sun=0..Sat=6 to Mon=0..Sun=6
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - offset);
  return Array.from({ length: 42 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export default function Appointments() {
  const [anchor, setAnchor] = useState(new Date(2025, 3, 1)); // April 2025 for seed data
  const [items, setItems] = useState<Appointment[]>(seedAppointments);
  const [dragId, setDragId] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [emailReminders, setEmailReminders] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("2025-04-17");

  const days = useMemo(() => buildMonthGrid(anchor), [anchor]);
  const monthLabel = anchor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const byDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    items.forEach((a) => {
      const arr = map.get(a.date) ?? [];
      arr.push(a);
      map.set(a.date, arr);
    });
    map.forEach((arr) => arr.sort((a, b) => a.time.localeCompare(b.time)));
    return map;
  }, [items]);

  const selectedAppts = byDate.get(selectedDate) ?? [];

  const goPrev = () => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1));
  const goNext = () => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1));
  const goToday = () => {
    const t = new Date();
    setAnchor(new Date(t.getFullYear(), t.getMonth(), 1));
    setSelectedDate(ymd(t));
  };

  const handleDrop = (date: string) => {
    if (!dragId) return;
    const appt = items.find((a) => a.id === dragId);
    setHoverDate(null);
    setDragId(null);
    if (!appt || appt.date === date) return;

    setItems((prev) => prev.map((a) => (a.id === dragId ? { ...a, date } : a)));
    toast.success("Appointment rescheduled", {
      description: `${appt.patient} moved to ${date} at ${appt.time}`,
    });
    if (emailReminders) {
      setTimeout(() => {
        toast("Reminder email queued", {
          description: `Confirmation sent to ${appt.patient} (mock)`,
          icon: <Mail className="h-4 w-4" />,
        });
      }, 400);
    }
  };

  const handleNewAppointment = () => {
    toast.success("New appointment booked", { description: `Scheduled on ${selectedDate}` });
    if (emailReminders) {
      setTimeout(() => {
        toast("Confirmation email queued", {
          description: "Patient will receive an email reminder (mock)",
          icon: <Mail className="h-4 w-4" />,
        });
      }, 400);
    }
  };

  const todayStr = ymd(new Date());

  return (
    <AppLayout
      title="Appointment Scheduling"
      subtitle="Drag appointments across days to reschedule. Email reminders are sent on confirmation."
      actions={
        <Button className="bg-gradient-primary" onClick={handleNewAppointment}>
          <Plus className="mr-2 h-4 w-4" />New Appointment
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Month calendar */}
        <Card className="shadow-card border-border/60">
          <CardHeader className="pb-3 flex flex-row items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">{monthLabel}</CardTitle>
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goPrev}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px mb-1">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-[11px] font-medium text-muted-foreground text-center py-1.5">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden border border-border">
              {days.map((d) => {
                const key = ymd(d);
                const inMonth = d.getMonth() === anchor.getMonth();
                const isToday = key === todayStr;
                const isSelected = key === selectedDate;
                const isHover = key === hoverDate;
                const dayAppts = byDate.get(key) ?? [];
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedDate(key)}
                    onDragOver={(e) => { e.preventDefault(); setHoverDate(key); }}
                    onDragLeave={() => setHoverDate((h) => (h === key ? null : h))}
                    onDrop={() => handleDrop(key)}
                    className={cn(
                      "min-h-[88px] sm:min-h-[110px] bg-background p-1.5 cursor-pointer transition-colors flex flex-col gap-1",
                      !inMonth && "bg-muted/40",
                      isSelected && "ring-2 ring-primary ring-inset z-10",
                      isHover && "bg-primary-soft"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-xs tabular-nums inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full",
                          !inMonth && "text-muted-foreground/60",
                          inMonth && !isToday && "text-foreground",
                          isToday && "bg-primary text-primary-foreground font-semibold"
                        )}
                      >
                        {d.getDate()}
                      </span>
                      {dayAppts.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">{dayAppts.length}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      {dayAppts.slice(0, 3).map((a) => (
                        <div
                          key={a.id}
                          draggable
                          onDragStart={(e) => { e.stopPropagation(); setDragId(a.id); }}
                          onDragEnd={() => { setDragId(null); setHoverDate(null); }}
                          onClick={(e) => e.stopPropagation()}
                          title={`${a.time} · ${a.patient} · ${a.doctorName}`}
                          className={cn(
                            "truncate text-[10px] leading-tight px-1.5 py-0.5 rounded border cursor-grab active:cursor-grabbing",
                            a.tier === "blue"
                              ? "bg-ink-blue-soft border-ink-blue/30 text-ink-blue"
                              : "bg-ink-green-soft border-ink-green/30 text-ink-green",
                            dragId === a.id && "opacity-40"
                          )}
                        >
                          <span className="font-medium tabular-nums">{a.time}</span>{" "}
                          <span className="opacity-90">{a.patient.split(" ")[0]}</span>
                        </div>
                      ))}
                      {dayAppts.length > 3 && (
                        <div className="text-[10px] text-muted-foreground px-1.5">
                          +{dayAppts.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Tip: drag any appointment chip onto another day to reschedule.
            </p>
          </CardContent>
        </Card>

        {/* Side panel */}
        <div className="space-y-4">
          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />Email reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <Label htmlFor="reminders" className="text-sm">Send on confirmation</Label>
                  <p className="text-xs text-muted-foreground">
                    Patients receive a confirmation email when an appointment is booked or rescheduled.
                  </p>
                </div>
                <Switch id="reminders" checked={emailReminders} onCheckedChange={setEmailReminders} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {new Date(selectedDate).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {selectedAppts.length} appointment{selectedAppts.length === 1 ? "" : "s"}
              </p>
            </CardHeader>
            <CardContent className="px-0">
              {selectedAppts.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No appointments. Drag one here or click New Appointment.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {selectedAppts.map((a) => (
                    <div key={a.id} className="flex items-center gap-3 px-4 py-2.5">
                      <div className="text-xs font-medium tabular-nums w-12 text-muted-foreground">{a.time}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{a.patient}</div>
                        <div className="text-xs text-muted-foreground truncate">{a.doctorName}</div>
                      </div>
                      <DoctorTierBadge tier={a.tier} />
                      <StatusBadge status={a.status} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-2"><CardTitle className="text-base">Doctors</CardTitle></CardHeader>
            <CardContent className="space-y-1.5">
              {doctors.slice(0, 5).map((d) => (
                <div key={d.id} className="flex items-center gap-2.5">
                  <span className={cn("h-2 w-2 rounded-full", d.tier === "blue" ? "bg-ink-blue" : "bg-ink-green")} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium truncate">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{d.specialization}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
