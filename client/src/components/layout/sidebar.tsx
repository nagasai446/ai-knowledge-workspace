import {
  Bot,
  FileText,
  FolderKanban,
  Home,
  Lightbulb,
  Plus,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const mainNavigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    label: "AI Assistant",
    href: "/chat",
    icon: Bot,
  },
  {
    label: "Insights",
    href: "/insights",
    icon: Lightbulb,
  },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-5">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            ✦
          </div>

          <span>AI Knowledge</span>
        </Link>
      </div>

      <Separator />

      <div className="flex-1 space-y-6 p-4">
        <nav className="space-y-1">
          <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Overview
          </p>

          {mainNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-between gap-3"
              >
                <Link to={item.href}  className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <nav className="space-y-1">
          <div className="flex items-center justify-between px-3 pb-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Workspaces
            </p>

            <Button size="icon" variant="ghost" className="h-6 w-6">
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button variant="ghost" className="w-full justify-start gap-3">
            <FolderKanban className="h-4 w-4" />
            My Workspaces
          </Button>
        </nav>
      </div>

      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
}
