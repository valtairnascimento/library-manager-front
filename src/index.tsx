import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeLibraryProvider } from "./hooks/theme";
import { AuthProvider } from "./hooks/auth";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./services/contexts/UserContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeLibraryProvider>
        <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthProvider>
      </ThemeLibraryProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
