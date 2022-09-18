import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Container, Typography } from "@mui/material";
import { Palette } from "@mui/icons-material";

const data = {
  name: "김한동",
  studentNumber: 22000000,
  department: "전산전자공학부",
  major1: "전산",
  major2: "전자",
  grade: 3,
  semester: 6,
  state: "1", // 1이면 재학, 0이면 휴학
  contact: "010-1234-5678",
  email: "example@handong.ac.kr",
};

export default function ImageAvatars() {
  return (
    <Box>
      <Avatar
        alt="K"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 256, height: 256, mr: 10, mt: 5, mb: 5 }}
      />
      <Box>
        <Typography
          mb={1}
          fontSize={"2.3rem"}
          fontWeight={900}
          fontFamily="Ubuntu"
          color="#60748b"
          // color={Palette.primary}
        >
          {data.name} {data.studentNumber}
        </Typography>
        <Typography mt={1} mb={1} fontSize={"1.3rem"} fontWeight={600}>
          {data.department} {data.grade}학년 {data.semester}학기{" "}
          {data.state ? "재학" : "휴학"}
        </Typography>
        <Box display={"flex"} gap={2}>
          <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
            1전공 : {data.major1}
          </Typography>
          {data.major2 && (
            <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
              2전공 : {data.major2}
            </Typography>
          )}
        </Box>
        <Typography mt={1} mb={1} fontSize={"1.2rem"} fontWeight={400}>
          {data.contact}
        </Typography>
        <Typography mt={1} mb={2} fontSize={"1.2rem"} fontWeight={400}>
          {data.email}
        </Typography>
      </Box>
      <Button variant={"outlined"} p={10}>
        프로필 수정
      </Button>
    </Box>
  );
}
