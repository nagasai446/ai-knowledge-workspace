import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./protected-route";

import { DashboardLayout } from "./dashboard-layout";

import { LoginPage } from "@/features/auth/pages/login-page";
import { RegisterPage } from "@/features/auth/pages/register-page";

import { WorkspacesPage } from "@/features/workspaces/pages/workspaces-page";
import { WorkspacePage } from "@/features/workspaces/pages/workspace-page";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<WorkspacesPage />} />
          <Route path="/workspaces/:workspaceId" element={<WorkspacePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
