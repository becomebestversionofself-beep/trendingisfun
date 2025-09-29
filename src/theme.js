// theme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const tokens = {
  primary: { light: "#5DADE2", main: "#3498DB", dark: "#2E86C1", contrast: "#FFFFFF" },
  secondary: { light: "#F1948A", main: "#E74C3C", dark: "#C0392B", contrast: "#FFFFFF" },
  success: { light: "#7DCEA0", main: "#2ECC71", dark: "#27AE60", contrast: "#0B301C" }, // for "copied"
  // base surfaces
  lightBg: { default: "#FAFAFA", paper: "#FFFFFF", textPri: "#212121", textSec: "#616161" },
  darkBg:  { default: "#121212", paper: "#1E1E1E", textPri: "#E0E0E0", textSec: "#B0B0B0" },
};

export const getAppTheme = (mode= "light") => {
  const isLight = mode === "light";
  const bg = isLight ? tokens.lightBg : tokens.darkBg;

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        light: tokens.primary.light,
        main: tokens.primary.main,
        dark: tokens.primary.dark,
        contrastText: tokens.primary.contrast,
      },
      secondary: {
        light: tokens.secondary.light,
        main: tokens.secondary.main,
        dark: tokens.secondary.dark,
        contrastText: tokens.secondary.contrast,
      },
      success: {
        light: tokens.success.light,
        main: tokens.success.main,
        dark: tokens.success.dark,
        contrastText: tokens.success.contrast,
      },
      background: {
        default: bg.default,
        paper: bg.paper,
      },
      text: {
        primary: bg.textPri,
        secondary: bg.textSec,
      },
      divider: isLight ? alpha("#000", 0.12) : alpha("#fff", 0.12),
      action: {
        hover: alpha(isLight ? "#000" : "#fff", 0.06),
        selected: alpha(isLight ? "#000" : "#fff", 0.08),
        disabledOpacity: 0.38,
      },
    },
    shape: { borderRadius: 10 },
    typography: {
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      // Buttons: gentle hover/focus
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            transition: "background-color .25s ease, box-shadow .25s ease",
          },
          containedPrimary: {
            "&:hover": { backgroundColor: tokens.primary.dark },
            "&:active, &:focus": { backgroundColor: "#2874A6" }, // deep focus tone
          },
          containedSecondary: {
            "&:hover": { backgroundColor: tokens.secondary.dark },
            "&:active, &:focus": { backgroundColor: "#A93226" },
          },
          containedDisabled: {
            backgroundColor: isLight ? alpha("#000", 0.12) : alpha("#fff", 0.12),
            color: isLight ? alpha("#000", 0.38) : alpha("#fff", 0.38),
          },
          outlined: {
            "&:hover": {
              backgroundColor: alpha(isLight ? tokens.primary.main : "#fff", 0.06),
            },
          },
        },
      },

      // Icon buttons + "copied" state
      MuiIconButton: {
        styleOverrides: {
          root: {
            // default icon color = text.secondary for each mode
            color: bg.textSec,
            "&:hover svg": { color: tokens.primary.main },
            // Add this class to show "copied" feedback:
            // <IconButton className={copied ? "copied" : ""} ...>
            "&.copied": {
              backgroundColor: alpha(tokens.success.main, 0.14),
            },
            "&.copied svg": {
              color: tokens.success.main,
            },
          },
        },
      },

      // Cards get a soft success tint when copied (optional helper class)
      MuiCard: {
        styleOverrides: {
          root: {
            "&.copied": {
              outline: `2px solid ${alpha(tokens.success.main, 0.4)}`,
              backgroundColor: alpha(tokens.success.main, isLight ? 0.10 : 0.16),
            },
          },
        },
      },

      // TextFields: subtle focus ring
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: alpha(bg.textPri, 0.18) },
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(tokens.primary.main, 0.6),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: tokens.primary.main,
              boxShadow: `0 0 0 3px ${alpha(tokens.primary.main, 0.18)}`,
            },
          },
        },
      },

      // AppBar
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundImage: "none",
            backgroundColor: isLight ? tokens.primary.dark : "#2C2C2C",
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default getAppTheme;
