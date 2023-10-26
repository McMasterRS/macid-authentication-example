"use client";

import "./styles/globals.css";
import { PageLayout } from "@/components/Layout/PageLayout";
import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./config/authConfig";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const msalInstance = new PublicClientApplication(msalConfig);

export default function Template({ children }: { children?: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MsalProvider instance={msalInstance}>
        <PageLayout>
          <center>{children}</center>
        </PageLayout>
      </MsalProvider>
    </ThemeProvider>
  );
}
