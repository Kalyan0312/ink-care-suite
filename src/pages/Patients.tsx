import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Filter } from "lucide-react";
import { patients } from "@/lib/clinic-data";
import { toast } from "sonner";

export default function Patients() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);

  const filtered = patients.filter((p) => {
    const matchQ = p.name.toLowerCase().includes(query.toLowerCase()) || p.email.toLowerCase().includes(query.toLowerCase());
    const matchS = statusFilter === "all" || p.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <AppLayout
      title="Patient Management"
      subtitle={`${patients.length} registered patients`}
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" />Add Patient</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add new patient</DialogTitle>
              <DialogDescription>Fill in the patient's details to register them.</DialogDescription>
            </DialogHeader>
            <form
              className="grid gap-4 py-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Patient registered successfully");
                setOpen(false);
              }}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fn">Full name</Label>
                  <Input id="fn" required placeholder="Jane Doe" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" required placeholder="32" />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="ph">Phone</Label>
                  <Input id="ph" required placeholder="+234 800 000 0000" />
                </div>
                <div className="space-y-1.5">
                  <Label>Gender</Label>
                  <Select defaultValue="Female">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="em">Email</Label>
                <Input id="em" type="email" placeholder="jane@email.com" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-primary">Save patient</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <Card className="shadow-card border-border/60">
        <CardContent className="p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email…" className="pl-9 bg-secondary border-transparent" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead>Patient</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Blood</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Last visit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary-soft text-primary text-xs font-semibold">
                            {p.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{p.age} · {p.gender[0]}</TableCell>
                    <TableCell className="text-sm font-medium">{p.bloodGroup}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.phone}</TableCell>
                    <TableCell className="text-sm">{p.doctor}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.lastVisit}</TableCell>
                    <TableCell><StatusBadge status={p.status as any} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                      No patients match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
