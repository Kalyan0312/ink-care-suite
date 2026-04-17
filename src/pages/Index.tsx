import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { DoctorTierBadge } from "@/components/DoctorTierBadge";
import {
  Users,
  CalendarDays,
  Wallet,
  BedDouble,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  appointmentTrend,
  revenueTrend,
  recentActivity,
  appointments,
  wards,
} from "@/lib/clinic-data";

const stats = [
  { label: "Total Patients", value: "1,284", delta: "+8.2%", up: true, icon: Users, accent: "bg-primary-soft text-primary" },
  { label: "Appointments Today", value: appointments.length.toString(), delta: "+2", up: true, icon: CalendarDays, accent: "bg-ink-blue-soft text-ink-blue" },
  { label: "Revenue (Apr)", value: "₦3.4M", delta: "+17.2%", up: true, icon: Wallet, accent: "bg-ink-green-soft text-ink-green" },
  { label: "Available Wards", value: `${wards.filter(w => w.status === "free").length}/${wards.length}`, delta: "-3", up: false, icon: BedDouble, accent: "bg-warning-soft text-warning" },
];

export default function Dashboard() {
  return (
    <AppLayout
      title="Good morning, Dr. Reni 👋"
      subtitle="Here's what's happening at the clinic today."
      actions={
        <>
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Button size="sm" className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" />New Appointment</Button>
        </>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card border-border/60 hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.accent}`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                {s.up ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                )}
                <span className={s.up ? "text-success font-medium" : "text-destructive font-medium"}>{s.delta}</span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="shadow-card border-border/60 lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Appointments — last 7 days</CardTitle>
              <span className="text-xs text-muted-foreground">Booked vs Completed</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }}
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                  />
                  <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="completed" fill="hsl(var(--ink-green))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue (₦M)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity + Today's appts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="shadow-card border-border/60 lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Today's appointments</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">View all</Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="divide-y divide-border">
              {appointments.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center gap-4 px-6 py-3 hover:bg-muted/40 transition-colors">
                  <div className="text-sm font-medium tabular-nums w-14 text-muted-foreground">{a.time}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{a.patient}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.reason}</div>
                  </div>
                  <DoctorTierBadge tier={a.tier} className="hidden sm:inline-flex" />
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.tier === "blue" ? "bg-ink-blue" : a.tier === "green" ? "bg-ink-green" : "bg-muted-foreground"}`} />
                  <div className="text-sm leading-snug">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                    <div className="text-xs text-muted-foreground">{a.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
