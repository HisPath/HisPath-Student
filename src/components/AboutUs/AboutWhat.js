import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Iconify from "../../components/iconify";
import { MotionViewport, varFade } from "../../components/animate";
import what_1 from "../../assets/what_1.jpeg";
import what_2 from "../../assets/what_2.jpeg";

const StyledRoot = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

export default function AboutWhat() {
  const theme = useTheme();

  const isDesktop = useResponsive("up", "md");

  const isLight = theme.palette.mode === "light";

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48
  )}`;

  return (
    <StyledRoot>
      <Container>
        <Grid container spacing={3}>
          {isDesktop && (
            <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <img
                      style={{ borderRadius: 15 }}
                      alt="our office 1"
                      src={what_1}
                      ratio="3/4"
                      sx={{
                        boxShadow: shadow,
                      }}
                      borderRadius={2}
                    />
                  </m.div>
                </Grid>
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <img
                      style={{ borderRadius: 15 }}
                      alt="our office 2"
                      src={what_2}
                      ratio="1/1"
                    />
                  </m.div>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                What is HisPath?
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "text.secondary"
                      : "common.white",
                }}
              >
                Our theme is the most advanced and user-friendly theme you will
                find on the market, we have documentation and video to help set
                your site really easily, pre-installed demos you can import in
                one click and everything from the theme options to page content
                can be edited from the front-end. This is the theme you are
                looking for.
              </Typography>
            </m.div>

            {/* <Box sx={{ my: 5 }}>
              {_skills.map((progress) => (
                <m.div key={progress.label} variants={varFade().inRight}>
                  <ProgressItem progress={progress} />
                </m.div>
              ))}
            </Box> */}

            <m.div variants={varFade().inRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ mt: 5 }}
                endIcon={<Iconify icon="ic:round-arrow-right-alt" width={24} />}
              >
                Check out our work
              </Button>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function ProgressItem({ progress }) {
  const { label, value } = progress;

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {value}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          "& .MuiLinearProgress-bar": { bgcolor: "grey.700" },
          "&.MuiLinearProgress-determinate": { bgcolor: "divider" },
        }}
      />
    </Box>
  );
}
