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

export default function Dashboard() {
  const [notices, setNotices] = useState([]);

  const getNotices = async () => {
    const notice = await getInfo();
    setNotices(notice.data.notice);
    console.log(notice.data.notice);
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={3} mb={5}>
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
            sx={{
              fontSize: "1.3rem",
              p: 2,
              pt: 2.5,
              mt: 3,
              fontFamily: "Public Sans,sans-serif",
            }}
          >
            {"Notice"}
          </Label>
          <Box
            gap={3}
            display="grid"
            mb={5}
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {notices.map((notice) => (
              <NoticeCard key={notice.noticeId} notice={notice} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
