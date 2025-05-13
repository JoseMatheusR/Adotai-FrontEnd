import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { queryClient } from "./constants/queryClient";
import { SnackbarProvider } from "notistack";
import { SettingsProvider } from "./contexts/settingsContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { AuthProvider } from "./contexts/authContext";

const Providers = () => {
  return (
    //<SessionProvider>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={5}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SettingsProvider>
              <Outlet />
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
    // </SessionProvider>
  );
};

export default Providers;
