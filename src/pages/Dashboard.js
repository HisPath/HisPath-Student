import { Box, Container, Grid, Paper, Tab, Tabs } from "@mui/material";
import { Stack } from "@mui/system";
import ProfileAbout from "../components/Dashboard/ProfileAbout.js";
import ProfileSocialInfo from "../components/Dashboard/ProfileSocialInfo.js";
import DashReadme from "../components/Dashboard/DashReadme.js";
import ProfileImage from "../components/Dashboard/ProfileImage.js";
import NoticeCard from "../components/Dashboard/NoticeCard.js";
import { getInfo } from "../api/dashboard";
import { useEffect, useState } from "react";
import ForceNotice from "../components/Dashboard/ForceNotice.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getActivities, getActivity } from "../api/activity.js";
import ActivityCard from "../components/Dashboard/ActivityCard.js";
import ResumeCard from "../components/Dashboard/ResumeCard.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [notices, setNotices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [resumes, setResumes] = useState([]);

  const getNotices = async () => {
    const notice = await getInfo();
    console.log(notice.data);
    setNotices(notice.data.notice);
  };

  const getActivities = async () => {
    const activity = await getInfo();
    setActivities(activity.data.activities);
  };

  const getResumes = async () => {
    const resume = await getInfo();
    setResumes(resume.data.resumes);
  };

  useEffect(() => {
    getNotices();
    getActivities();
    getResumes();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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

            <Paper sx={{ width: "100%", mb: 2, mt: 2, ml: 2 }}>
              <Box sx={{ width: "100%" }}>
                <Box display={"flex"} justifyContent="space-between">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor={"secondary"}
                    indicatorColor={"secondary"}
                    // aria-label="icon position tabs example"
                  >
                    <Tab
                      sx={{
                        pt: 1.5,
                        pl: 1,
                        pr: 1,
                        fontWeight: 800,
                        fontSize: "1.3rem",
                      }}
                      label="Notice"
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{
                        pt: 1.5,
                        pl: 1,
                        pr: 1,
                        fontWeight: 800,
                        fontSize: "1.3rem",
                      }}
                      label="Activity"
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{
                        pt: 1.5,
                        pl: 1,
                        pr: 1,
                        fontWeight: 800,
                        fontSize: "1.3rem",
                      }}
                      label="Resume"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
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
                      <Link
                        to={`/notice/${notice.noticeId}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <NoticeCard key={notice.noticeId} notice={notice} />
                      </Link>
                    ))}
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                    {activities.map((activity) => (
                      <Link
                        to={`/activity/detail/${activity.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <ActivityCard key={activity.id} activity={activity} />
                      </Link>
                    ))}
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
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
                    {resumes.map((resume) => (
                      <Link
                        to={`/resume/edit/${resume.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <ResumeCard key={resume.id} resume={resume} />
                      </Link>
                    ))}
                  </Box>
                </TabPanel>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <ForceNotice />
    </>
  );
}
