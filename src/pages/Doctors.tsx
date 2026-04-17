import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DoctorTierBadge } from "@/components/DoctorTierBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { doctors } from "@/lib/clinic-data";
import { Mail, Phone, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Doctors() {
  const blueCount = doctors.filter(d => d.tier === "blue").length;
  const greenCount = doctors.filter(d => d.tier === "green").length;

  return (
    <AppLayout
      title="Doctors & Staff"
      subtitle={`${doctors.length} medical professionals on staff`}
      actions={<Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" />Add Doctor</Button>}
    >
      {/* Legend */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-card">
          <span className="h-3 w-3 rounded-full bg-ink-blue" />
          <div className="text-sm"><span className="font-semibold">{blueCount}</span> <span className="text-muted-foreground">Blue Ink — Senior</span></div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-card">
          <span className="h-3 w-3 rounded-full bg-ink-green" />
          <div className="text-sm"><span className="font-semibold">{greenCount}</span> <span className="text-muted-foreground">Green Ink — Junior</span></div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((d) => {
          const isBlue = d.tier === "blue";
          return (
            <Card
              key={d.id}
              className={cn(
                "shadow-card border-border/60 hover:shadow-elevated transition-all overflow-hidden",
                "border-l-4",
                isBlue ? "border-l-ink-blue" : "border-l-ink-green"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={cn("text-sm font-semibold", isBlue ? "bg-ink-blue-soft text-ink-blue" : "bg-ink-green-soft text-ink-green")}>
                      {d.name.replace("Dr. ", "").split(" ").map(n => n[0]).join("").slice(0,2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{d.name}</div>
                    <div className="text-sm text-muted-foreground">{d.specialization}</div>
                  </div>
                  <StatusBadge status={d.status as any} />
                </div>

                <div className="mt-4">
                  <DoctorTierBadge tier={d.tier} />
                </div>

                <div className="mt-4 space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" /> <span className="truncate">{d.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" /> {d.phone}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">{d.patients}</span>
                    <span className="text-muted-foreground">patients</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary">View profile</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
