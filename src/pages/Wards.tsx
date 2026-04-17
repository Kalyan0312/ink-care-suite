import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { wards } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";
import { BedDouble, Plus } from "lucide-react";

const statusStyles = {
  free: "border-success/30 bg-success-soft text-success",
  occupied: "border-destructive/30 bg-destructive/10 text-destructive",
  cleaning: "border-warning/30 bg-warning-soft text-warning",
};

export default function Wards() {
  const free = wards.filter(w => w.status === "free").length;
  const occupied = wards.filter(w => w.status === "occupied").length;
  const cleaning = wards.filter(w => w.status === "cleaning").length;

  const floors = [1, 2, 3];

  return (
    <AppLayout
      title="Ward Management"
      subtitle={`${wards.length} wards across ${floors.length} floors`}
      actions={<Button variant="outline"><Plus className="mr-2 h-4 w-4" />Add Ward</Button>}
    >
      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-3 mb-6">
        <Card className="shadow-card border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Free</p>
              <p className="text-2xl font-semibold text-success mt-1">{free}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-success-soft flex items-center justify-center">
              <BedDouble className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupied</p>
              <p className="text-2xl font-semibold text-destructive mt-1">{occupied}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <BedDouble className="h-5 w-5 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-border/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cleaning</p>
              <p className="text-2xl font-semibold text-warning mt-1">{cleaning}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-warning-soft flex items-center justify-center">
              <BedDouble className="h-5 w-5 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {floors.map((floor) => (
        <div key={floor} className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Floor {floor}</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {wards.filter(w => w.floor === floor).map((w) => (
              <button
                key={w.id}
                className={cn(
                  "group rounded-xl border p-4 text-left transition-all hover:shadow-elevated hover:-translate-y-0.5",
                  statusStyles[w.status]
                )}
              >
                <div className="flex items-center justify-between">
                  <BedDouble className="h-5 w-5" />
                  <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                </div>
                <div className="mt-3 font-semibold">{w.number}</div>
                <div className="text-xs opacity-80">{w.type}</div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-wide">
                  {w.status}
                </div>
                {w.patient && <div className="mt-1 text-xs truncate opacity-90">{w.patient}</div>}
              </button>
            ))}
          </div>
        </div>
      ))}
    </AppLayout>
  );
}
