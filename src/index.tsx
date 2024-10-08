import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeLibraryProvider } from "./hooks/theme";
import { AuthProvider } from "./hooks/auth";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./services/contexts/UserContext";
import { BookProvider } from "./services/contexts/BookContext";
import { LoanProvider } from "./services/contexts/LoanContext";

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
            <BookProvider>
              <LoanProvider>
                <App />
              </LoanProvider>
            </BookProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeLibraryProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
