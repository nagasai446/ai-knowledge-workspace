import type { ReactNode } from "react";

import { Sidebar } from "./sidebar";

import { AppHeader } from "./app-header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
