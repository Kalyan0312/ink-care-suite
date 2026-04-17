import { Bell, Search, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useRole } from "@/contexts/RoleContext";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  const { role, setRole } = useRole();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients, doctors, invoices…"
          className="h-9 pl-9 bg-secondary border-transparent focus-visible:bg-background focus-visible:border-input"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden gap-2 md:inline-flex">
              <span className="text-xs text-muted-foreground">Role</span>
              <span className="font-medium capitalize">{role}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Switch role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={role} onValueChange={(v) => setRole(v as any)}>
              <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="doctor">Doctor</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="receptionist">Receptionist</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <div className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-3 py-1">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary-soft text-primary text-xs font-semibold">DR</AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:block">
            <div className="text-xs font-medium">Dr. Reni Akin</div>
            <Badge variant="secondary" className="h-4 px-1.5 text-[10px] capitalize">{role}</Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
