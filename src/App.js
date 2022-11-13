import { CssBaseline, GlobalStyles } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Router from "./Router";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <CssBaseline />
        <GlobalStyles
          styles={{
            button: { whiteSpace: "nowrap" },
            a: {
              textDecoration: "none",
              color: "inherit",
            },
          }}
        />
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
