import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import {
  Stack,
  Container,
  Typography,
  Box,
  Button,
  SvgIcon,
} from "@mui/material";
import overlay from "../../assets/overlay_1.svg";
import hero from "../../assets/hero.jpeg";
// components
import {
  MotionContainer,
  TextAnimate,
  varFade,
} from "../../components/animate";

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${overlay}), url(${hero})`,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("md")]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    bottom: 80,
    textAlign: "left",
    position: "absolute",
  },
}));

export default function AboutHero() {
  const googleLoginHandler = () => {
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
    window.location.href = GOOGLE_LOGIN_URL;
  };
  return (
    <>
      <StyledRoot>
        <Container component={MotionContainer}>
          <StyledContent>
            <TextAnimate
              text="Who"
              sx={{
                color: "primary.main",
              }}
              variants={varFade().inRight}
            />

            <br />

            <Stack
              spacing={2}
              display="inline-flex"
              direction="row"
              sx={{ color: "common.white" }}
            >
              <TextAnimate text="we" />
              <TextAnimate text="are?" />
            </Stack>

            <m.div variants={varFade().inRight}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography
                  variant="h4"
                  sx={{
                    mr: "calc(40vw)",
                    mt: 5,
                    color: "common.white",
                    fontWeight: "fontWeightMedium",
                  }}
                >
                  Let's work together and
                  <br /> make awesome resume easily
                </Typography>
                <Box onClick={googleLoginHandler}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      color: "#222",
                      borderColor: "#fff",
                      backgroundColor: "#fff",
                    }}
                  >
                    <SvgIcon sx={{ mt: 0.5, mr: 1 }}>
                      <path
                        d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                        fill="#EA4335"
                      ></path>
                      <path
                        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                        fill="#34A853"
                      ></path>
                      <path fill="none" d="M0 0h18v18H0z"></path>
                    </SvgIcon>
                    Sign in with Google
                  </Button>
                </Box>
              </Box>
            </m.div>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
