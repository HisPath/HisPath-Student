import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#079992",
      light: "#55cac2",
      dark: "#006a64",
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
  shape: {
    borderRadius: 10,
  },
  shadows: ["none", ...Array(24).fill("rgb(0 0 0 / 8%) 0px 0px 8px")],
  typography: { fontFamily: "Pretendard-Regular, Ubuntu, sans-serif" },
});
