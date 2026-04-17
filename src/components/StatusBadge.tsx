import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status =
  | "active"
  | "pending"
  | "completed"
  | "confirmed"
  | "cancelled"
  | "discharged"
  | "paid"
  | "overdue"
  | "free"
  | "occupied"
  | "cleaning"
  | "on-leave";

const styles: Record<Status, string> = {
  active: "bg-success-soft text-success border-transparent",
  confirmed: "bg-success-soft text-success border-transparent",
  paid: "bg-success-soft text-success border-transparent",
  free: "bg-success-soft text-success border-transparent",
  completed: "bg-primary-soft text-primary border-transparent",
  pending: "bg-warning-soft text-warning border-transparent",
  cleaning: "bg-warning-soft text-warning border-transparent",
  cancelled: "bg-muted text-muted-foreground border-transparent",
  discharged: "bg-muted text-muted-foreground border-transparent",
  "on-leave": "bg-muted text-muted-foreground border-transparent",
  overdue: "bg-destructive/10 text-destructive border-transparent",
  occupied: "bg-destructive/10 text-destructive border-transparent",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <Badge className={cn("font-medium capitalize", styles[status], className)}>
      <span className={cn("mr-1.5 inline-block h-1.5 w-1.5 rounded-full", "bg-current opacity-70")} />
      {status.replace("-", " ")}
    </Badge>
  );
}
