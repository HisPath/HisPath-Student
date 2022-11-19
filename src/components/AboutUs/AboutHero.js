import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Stack, Container, Typography } from "@mui/material";
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
  return (
    <>
      <StyledRoot>
        <Container>
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
              <Typography
                variant="h4"
                sx={{
                  mt: 5,
                  color: "common.white",
                  fontWeight: "fontWeightMedium",
                }}
              >
                Let's work together and
                <br /> make awesome resume easily
              </Typography>
            </m.div>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
