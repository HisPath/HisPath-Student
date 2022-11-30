import { CssBaseline, GlobalStyles } from "@mui/material";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import Router from "./Router";
import ThemeProvider from "./theme";
import { MotionLazyContainer } from "./components/animate";

function App() {
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const code = params.get("code");
    params.delete("code");
    if (loading === false && code !== null) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER}/auth/google/login-student/token?code=${code}`
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("TOKEN", `Bearer ${res.data.token}`);
          window.location.reload();
        });
    }
  }, []);
  return (
    <MotionLazyContainer>
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
    </MotionLazyContainer>
  );
}

export default App;
