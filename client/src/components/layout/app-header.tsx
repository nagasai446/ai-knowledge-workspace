import { LogOut, Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "../ui/avatar";

import { Button } from "../ui/button";

import { Input } from "../ui/input";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function AppHeader() {
  const { user , logout } = useAuth();

  const initials = user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative hidden w-full max-w-md md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input className="pl-10" placeholder="Search Your Knowledge...." />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Button variant="ghost" onClick={logout} ><LogOut className="mr-2 h-4 w-4" />Logout</Button>
      </div>
    </header>
  );
}
