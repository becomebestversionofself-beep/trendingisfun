// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Light theme colors
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            primary: {
              main: "#1976d2",
            },
            secondary: {
              main: "#d81b60",
            },
          }
        : {
            // Dark theme colors
            background: {
              default: "red",
              paper: "#1e1e1e",
            },
            primary: {
              main: "#90caf9",
            },
            secondary: {
              main: "#f48fb1",
            },
          }),
    },
    // Example: global component overrides
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none", // no ALL CAPS
            padding: "8px 20px",
          },
        },
      },
    },
  });
