import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { invoices } from "@/lib/clinic-data";
import { Download, Plus, Receipt, Wallet, Clock } from "lucide-react";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function Billing() {
  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter(i => i.status !== "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <AppLayout
      title="Billing & Invoicing"
      subtitle="Track invoices and payment status."
      actions={
        <>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" />New Invoice</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card className="shadow-card border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total billed</p>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-semibold">{fmt(total)}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Paid</p>
              <Wallet className="h-4 w-4 text-success" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-success">{fmt(paid)}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <Clock className="h-4 w-4 text-warning" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-warning">{fmt(pending)}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">All invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead>Invoice</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id} className="cursor-pointer">
                    <TableCell className="font-medium font-mono text-xs">{inv.id}</TableCell>
                    <TableCell className="text-sm">{inv.patient}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.service}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{fmt(inv.amount)}</TableCell>
                    <TableCell><StatusBadge status={inv.status as any} /></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-primary">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
