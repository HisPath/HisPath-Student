import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#34495e",
      // main: "rgba(20,44,105,0)",
      light: "#60748b",
      dark: "#092234",
    },
    secondary: {
      main: "#5f63f2",
      light: "#9891ff",
      dark: "#1039be",
    },
    text: {
      primary: "#222222",
      secondary: "#808080",
    },
    background: {
      default: "#F9FAFA",
      paper: "#FFFFFF",
    },
  },
  shadows: ["none", ...Array(24).fill("rgb(0 0 0 / 8%) 0px 0px 8px")],
  typography: { fontFamily: "Pretendard-Regular, Ubuntu, sans-serif" },
});
