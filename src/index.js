// src/main.jsx
import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import getTheme from "./theme"; // 👈 import custom theme function

function Root() {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("mui-mode");
    return saved || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    if (!localStorage.getItem("mui-mode")) {
      setMode(prefersDark ? "dark" : "light");
    }
  }, [prefersDark]);

  const theme = useMemo(() => getTheme(mode), [mode]); // 👈 clean usage

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("mui-mode", next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App mode={mode} onToggleMode={toggleColorMode} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
