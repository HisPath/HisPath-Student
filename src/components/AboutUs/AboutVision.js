import { m } from "framer-motion";
// @mui
import { Box, Container, Typography } from "@mui/material";
// components
import { MotionViewport, varFade } from "../../components/animate";
import vision from "../../assets/vision.jpeg";
import { Stack } from "@mui/system";

export default function AboutVision() {
    return (
        <Container component={MotionViewport} sx={{ mt: 10 }}>
            <Box
                sx={{
                    mb: 10,
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <img src={vision} alt="about-vision" />
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        bottom: { xs: 24, md: 40 },
                        width: 1,
                        opacity: 0.48,
                        position: "absolute",
                    }}
                >
                    <m.div variants={varFade().in}>
                        <Typography color={"#fff"} sx={{ fontSize: "2.5rem", fontWeight: 900 }}>
                            Handong Global University
                        </Typography>
                    </m.div>
                </Stack>
            </Box>

            <m.div variants={varFade().inUp}>
                <Typography variant="h3" sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
                    Why Not Change The World?
                </Typography>
            </m.div>
        </Container>
    );
}
