import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./screens/Home/index.jsx";
import AuthPage from "./screens/Auth/index.jsx";
import ProfilePage from "./screens/Profile/index.jsx";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const queryClient = new QueryClient();

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = true;

  return (
    <div className="app">
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route
                path="/auth"
                element={isAuth ? <AuthPage /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
