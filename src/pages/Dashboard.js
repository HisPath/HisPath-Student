// import { Container, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import { ActivityArea } from "../components/Dashboard/ActivityArea.js";
// import Info from "../components/Dashboard/Info.js";
// import { MileageArea } from "../components/Dashboard/MileageArea.js";
// import Navigation from "../components/Dashboard/Navigation.js";
// import Readme from "../components/Dashboard/Readme.js";
// import { ResumeArea } from "../components/Dashboard/ResumeArea.js";
// import ForceNotice from "../components/Dashboard/ForceNotice.js";
// import "../style/dashboard.css";
// import { useEffect, useState } from "react";

import { Box, Container, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import ProfileAbout from "../components/Dashboard/ProfileAbout.js";
import ProfileSocialInfo from "../components/Dashboard/ProfileSocialInfo.js";
import DashReadme from "../components/Dashboard/DashReadme.js";
import ProfileImage from "../components/Dashboard/ProfileImage.js";
import NoticeCard from "../components/Dashboard/NoticeCard.js";
import Label from "../components/label";
import { getInfo } from "../api/dashboard";
import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [scroll, setScroll] = useState(true);
//   const [scrollText, setScrollText] = useState(false);

//   const controlScroll = () => {
//     if (window.scrollY > 130) {
//       setScroll(false);
//       setScrollText(true);
//     } else {
//       setScroll(true);
//       setScrollText(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", controlScroll);
//     return () => {
//       window.removeEventListener("scroll", controlScroll);
//     };
//   }, []);

//   return (
//     <>
//       <Container>
//         <Box display={"flex"}>
//           <Info />
//           <Readme />
//           <Navigation />
//         </Box>
//         <Box
//           display={"flex"}
//           justifyContent="center"
//           alignItems={"center"}
//           flexDirection="column"
//         >
//           <Typography
//             sx={{
//               WebkitBackgroundClip: "text",
//               backgroundClip: "text",
//               backgroundImage: "linear-gradient(90deg,#ff0071,#fff800)",
//               color: "transparent",
//               fontWeight: 700,
//               fontSize: "1.4rem",
//             }}
//             id={`${scrollText && "scroll"}`}
//           >
//             Scroll down
//           </Typography>
//           <div
//             component={"div"}
//             // id="scroll-down"
//             id={`${scroll && `scroll-down`}`}
//           />
//         </Box>
//         <Box>
//           <ActivityArea />
//         </Box>
//         <Box display="flex" alignItems="flex-end" flexDirection={"column"}>
//           <MileageArea />
//         </Box>
//         <Box sx={{ mb: 20 }}>
//           <ResumeArea />
//         </Box>
//       </Container>
//       <ForceNotice />
//     </>
//   );
// }

export default function Dashboard() {
  const [notices, setNotices] = useState([]);

  const getNotices = async () => {
    const notice = await getInfo();
    setNotices(notice.data.notice);
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <ProfileImage />

            {/* profile info */}
            <ProfileAbout />

            {/* blog link */}
            <ProfileSocialInfo />
          </Stack>
        </Grid>

        <Grid item xs={12} md={8} mt={5}>
          <Stack spacing={3}>
            <DashReadme />
          </Stack>

          <Label
            variant="soft"
            color={"success"}
            sx={{ mt: 3, fontSize: "1.3rem", p: 2, pt: 2.5 }}
          >
            {"Notice"}
          </Label>

          <Box display={"flex"} justifyContent="center" gap={1}>
            <NoticeCard />
            <NoticeCard />
            <NoticeCard />
          </Box>
          <Box display={"flex"} justifyContent="center" gap={1} mb={3}>
            <NoticeCard />
            <NoticeCard />
            <NoticeCard />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
