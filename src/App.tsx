import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { AuthProvider } from "./hooks/auth";

import { useTheme } from "./hooks/theme";
import Routes from "./routes";
import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("@library-manager-front:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
