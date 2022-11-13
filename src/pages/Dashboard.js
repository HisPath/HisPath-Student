import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ActivityArea } from "../components/Dashboard/ActivityArea.js";
import Info from "../components/Dashboard/Info.js";
import { MileageArea } from "../components/Dashboard/MileageArea.js";
import Navigation from "../components/Dashboard/Navigation.js";
import Readme from "../components/Dashboard/Readme.js";
import { ResumeArea } from "../components/Dashboard/ResumeArea.js";
import ForceNotice from "../components/Dashboard/ForceNotice.js";
import "../style/dashboard.css";
import { useEffect, useState } from "react";

function Dashboard() {
  const [scroll, setScroll] = useState(true);
  const [scrollText, setScrollText] = useState(false);

  const controlScroll = () => {
    if (window.scrollY > 130) {
      setScroll(false);
      setScrollText(true);
    } else {
      setScroll(true);
      setScrollText(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlScroll);
    return () => {
      window.removeEventListener("scroll", controlScroll);
    };
  }, []);

  return (
    <>
      <Container>
        <Box display={"flex"}>
          <Info />
          <Readme />
          <Navigation />
        </Box>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          flexDirection="column"
        >
          <Typography
            sx={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundImage: "linear-gradient(90deg,#ff0071,#fff800)",
              color: "transparent",
              fontWeight: 700,
              fontSize: "1.4rem",
            }}
            id={`${scrollText && "scroll"}`}
          >
            Scroll down
          </Typography>
          <div
            component={"div"}
            // id="scroll-down"
            id={`${scroll && `scroll-down`}`}
          />
        </Box>
        <Box>
          <ActivityArea />
        </Box>
        <Box display="flex" alignItems="flex-end" flexDirection={"column"}>
          <MileageArea />
        </Box>
        <Box sx={{ mb: 20 }}>
          <ResumeArea />
        </Box>
      </Container>
      <ForceNotice />
    </>
  );
}

export default Dashboard;
