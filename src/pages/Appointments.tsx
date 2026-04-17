import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoctorTierBadge } from "@/components/DoctorTierBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { doctors, appointments } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";
import { Plus, Calendar as CalIcon } from "lucide-react";
import { toast } from "sonner";

const HOURS = Array.from({ length: 10 }).map((_, i) => `${(8 + i).toString().padStart(2, "0")}:00`);

export default function Appointments() {
  const [selectedDoctor, setSelectedDoctor] = useState<string>(doctors[0].id);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const doctor = doctors.find(d => d.id === selectedDoctor)!;
  const taken = new Set(appointments.filter(a => a.doctorId === selectedDoctor).map(a => a.time));

  const handleBook = (slot: string) => {
    if (taken.has(slot)) {
      toast.error("Slot already booked", { description: "Please choose another time." });
      return;
    }
    setSelectedSlot(slot);
    toast.success(`Slot ${slot} reserved with ${doctor.name}`);
  };

  return (
    <AppLayout
      title="Appointment Scheduling"
      subtitle="Book consultations and manage today's calendar."
      actions={<Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" />New Appointment</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* Doctor list */}
        <Card className="shadow-card border-border/60 h-fit">
          <CardHeader className="pb-2"><CardTitle className="text-base">Select doctor</CardTitle></CardHeader>
          <CardContent className="px-2 pb-2">
            <div className="space-y-1">
              {doctors.map((d) => {
                const active = d.id === selectedDoctor;
                return (
                  <button
                    key={d.id}
                    onClick={() => { setSelectedDoctor(d.id); setSelectedSlot(null); }}
                    className={cn(
                      "w-full text-left rounded-lg px-3 py-2.5 transition-colors border",
                      active
                        ? d.tier === "blue"
                          ? "bg-ink-blue-soft border-ink-blue/30"
                          : "bg-ink-green-soft border-ink-green/30"
                        : "border-transparent hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={cn("h-2.5 w-2.5 rounded-full", d.tier === "blue" ? "bg-ink-blue" : "bg-ink-green")} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{d.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{d.specialization}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <div className="space-y-4">
          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2"><CalIcon className="h-4 w-4 text-muted-foreground" />Today · Apr 17, 2025</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">{doctor.name} — {doctor.specialization}</p>
              </div>
              <DoctorTierBadge tier={doctor.tier} />
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {HOURS.map((slot) => {
                  const isTaken = taken.has(slot);
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      disabled={isTaken}
                      onClick={() => handleBook(slot)}
                      className={cn(
                        "rounded-lg border px-3 py-3 text-sm font-medium tabular-nums transition-all",
                        isTaken && "cursor-not-allowed bg-muted text-muted-foreground border-transparent line-through",
                        !isTaken && !isSelected && "border-border bg-background hover:border-primary hover:bg-primary-soft hover:text-primary",
                        isSelected && "border-primary bg-primary text-primary-foreground shadow-card"
                      )}
                    >
                      {slot}
                      <div className="text-[10px] font-normal opacity-80 mt-0.5">
                        {isTaken ? "Booked" : isSelected ? "Selected" : "Available"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/60">
            <CardHeader className="pb-2"><CardTitle className="text-base">Today's bookings</CardTitle></CardHeader>
            <CardContent className="px-0">
              <div className="divide-y divide-border">
                {appointments.map((a) => (
                  <div key={a.id} className="flex items-center gap-4 px-6 py-3">
                    <div className="text-sm font-medium tabular-nums w-14 text-muted-foreground">{a.time}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{a.patient}</div>
                      <div className="text-xs text-muted-foreground truncate">{a.reason} · {a.doctorName}</div>
                    </div>
                    <DoctorTierBadge tier={a.tier} className="hidden md:inline-flex" />
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
