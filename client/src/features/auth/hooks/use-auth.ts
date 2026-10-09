import { useAppSelector, useAppDispatch } from "@/app/store/hooks";

import { clearAuth, setUser } from "../auth-slice";

import {
  login as loginRequest,
  logout as logoutRequest,
} from "../api/auth-api";

export function useAuth() {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  async function login(email: string, password: string) {
    const response = await loginRequest(email, password);

    dispatch(setUser(response.user));
  }

  async function logout() {
    await logoutRequest();

    dispatch(clearAuth());
  }

  return {
    ...auth,
    login,
    logout,
  };
}
