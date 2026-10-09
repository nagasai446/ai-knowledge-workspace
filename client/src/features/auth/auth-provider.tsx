import { useEffect, useState, type ReactNode } from "react";

import { useAppDispatch } from "@/app/store/hooks";

import { clearAuth, setUser } from "./auth-slice";

import {
  login as loginRequest,
  logout as logoutRequest,
  refreshSession,
} from "./api/auth-api";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      try {
        const session = await refreshSession();

        dispatch(setUser(session.user));
      } catch {
        dispatch(clearAuth());
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading....
      </div>
    );
  }

  return <>{children}</>;
}

export async function login(
  dispatch: ReturnType<typeof useAppDispatch>,
  email: string,
  password: string,
) {
  const response = await loginRequest(email, password);

  dispatch(setUser(response.user));
}

export async function logout(dispatch: ReturnType<typeof useAppDispatch>) {
  await logoutRequest();

  dispatch(clearAuth());
}
