import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Button, IconButton, Typography } from "@mui/material";
import userImg from "../../assets/user.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Info() {
  const [info, setInfo] = React.useState([]);

  const getInfo = async () => {
    const info = await axios.get("http://localhost:8080/api/student/1");
    setInfo(info.data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Box>
      <Avatar
        alt="K"
        src={userImg}
        sx={{ width: 256, height: 256, mr: 7, mt: 5, mb: 0 }}
      />
      <Link to={`/edit`} style={{ textDecoration: "none" }}>
        <Button variant={"outlined"} p={10} sx={{ ml: 23 }}>
          프로필 수정
        </Button>
      </Link>
      <Box sx={{ mt: 3 }}>
        <Typography
          mb={1}
          fontSize={"2.3rem"}
          fontWeight={900}
          fontFamily="Ubuntu"
          color="primary.light"
        >
          {info.name} {info.studentNum}
        </Typography>
        <Typography mt={1} mb={1} fontSize={"1.3rem"} fontWeight={600}>
          {info.departmentName} {Math.floor(info.semester / 2)}학년{" "}
          {info.semester}학기
        </Typography>
        <Box display={"flex"} flexDirection="column">
          <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
            1전공 : {info.major1}
          </Typography>
          {info.major2 && (
            <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
              2전공 : {info.major2}
            </Typography>
          )}
        </Box>
        <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
          {info.phone}
        </Typography>
        <Typography mt={1} mb={2} fontSize={"1.2rem"} fontWeight={400}>
          {info.email}
        </Typography>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <LinkIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
