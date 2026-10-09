import { BrowserRouter } from "react-router-dom";

import { QueryProvider } from "./app/providers/query-provider";

import { StoreProvider } from "./app/providers/store-provider";

import { AuthProvider } from "./features/auth/auth-provider";

import { AppRouter } from "./app/router/app-router";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <QueryProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </QueryProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;