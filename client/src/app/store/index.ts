import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/auth-slice";
import workspaceReducer from "@/features/workspaces/workspace-slice";
import chatReducer from "@/features/chat/chat-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
