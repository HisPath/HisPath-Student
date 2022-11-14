import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import userImg from "../../assets/user.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getInfo } from "../../api/dashboard";

export default function Info() {
  const [info, setInfo] = React.useState([]);

  const getDashboardInfo = async () => {
    const info = await getInfo();
    console.log("내정보", info.data);
    setInfo(info.data);
  };

  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <Box>
      {info && (
        <>
          <Avatar
            alt="K"
            src={info.profile === "profile.url" ? userImg : info.profile}
            sx={{ width: 256, height: 256, mr: 7, mt: 5, mb: 0 }}
          />
          <Link to={`/edit`} style={{ textDecoration: "none" }}>
            <Button
              variant={"contained"}
              p={10}
              sx={{ ml: 23, borderRadius: 8 }}
              color={"secondary"}
            >
              프로필 수정
            </Button>
          </Link>
          <Box sx={{ mt: 3 }}>
            <Box display={"flex"} alignItems="baseline" gap={1}>
              <Typography
                fontSize={"2.1rem"}
                fontWeight={900}
                fontFamily="Ubuntu"
                color="secondary.dark"
              >
                {info.name}
              </Typography>

              <Typography
                mt={1}
                mb={1}
                fontSize={"1.3rem"}
                fontWeight={600}
                color="secondary.dark"
              >
                {Math.floor(info.semester / 2)}학년 {info.semester}학기
              </Typography>
            </Box>
            <Typography mt={1} mb={1} fontSize={"1.3rem"} fontWeight={600}>
              {info.departmentName}
            </Typography>
            <Box display={"flex"} flexDirection="column">
              <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
                1전공 : {info.major1?.name}
              </Typography>
              {info.major2 && (
                <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
                  2전공 : {info.major2?.name}
                </Typography>
              )}
            </Box>
            <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
              {info.phone}
            </Typography>
            <Typography mt={1} mb={2} fontSize={"1.2rem"} fontWeight={400}>
              {info.email}
            </Typography>
            <Tooltip title={info.githubId}>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="a"
                href={`https://github.com/${info.githubId}`}
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={info.blog}>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="a"
                href={`${info.blog}`}
                target="_blank"
              >
                <LinkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
    </Box>
  );
}
