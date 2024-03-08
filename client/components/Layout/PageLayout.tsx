/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../Authentication/SignInButton";
import { SignOutButton } from "../Authentication/SignOutButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";

/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
interface PageLayoutProps {
  children?: React.ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
  const isAuthenticated = useIsAuthenticated();
  const [anchorElNav, setAnchorElNav] = React.useState<EventTarget | null>(
    null,
  );

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              display="flex"
              sx={{ mr: 2 }}
            >
              Microsoft Identity Platform
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                key={"Page 1"}
                onClick={handleCloseNavMenu}
                component={Link}
                href={"/page_1"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Page 1
              </Button>

              <Button
                key={"Page 2"}
                onClick={handleCloseNavMenu}
                component={Link}
                href={"/page_2"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Page 2
              </Button>
            </Box>
            <Box
              sx={{
                marginLeft: "auto",
              }}
            >
              {isAuthenticated ? <SignOutButton /> : <SignInButton />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <br />
      {props.children}
    </>
  );
};
