import { Box, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";

const readmeWidth = "25rem";

const data = {
  name: "김한동",
  studentNumber: 22000000,
  department: "전산전자공학부",
  major1: "전산",
  major2: "전자",
  grade: 3,
  semester: 6,
  contact: "010-1234-5678",
  email: "example@handong.ac.kr",
  // githubid: "https://github.com",
};

export default function Readme() {
  return (
    <>
      <Box
        sx={{
          mt: 6,
          mb: 6,
          border: "1px solid #d0d7de",
          borderRadius: "6px",
          padding: 3,
          paddingBottom: 0,
        }}
      >
        <Typography
          sx={{
            width: readmeWidth,
            fontSize: ".8rem",
          }}
        >
          {data.name}/README.md
        </Typography>
        <ReactMarkdown># Kimhandong</ReactMarkdown>
        <ReactMarkdown>### ⭐️ TECH STACK ⭐️</ReactMarkdown>
        <ReactMarkdown>
          [![JAVA](https://img.shields.io/badge/Java-ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)](#)
          [![JavaScript](https://img.shields.io/badge/JAVASCRIPT-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=323330)](#)
          [![Figma](https://img.shields.io/static/v1?style=for-the-badge&message=Figma&color=F24E1E&logo=Figma&logoColor=FFFFFF&label=)](#)
          [![Flutter](https://img.shields.io/badge/Flutter-00c7fa.svg?&style=for-the-badge&logo=Flutter&logoColor=white)](#)
          [![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)](#)
          [![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)](#)
          [![React
          JS](https://img.shields.io/badge/ReactJs-61DAFB?.svg&style=for-the-badge&logo=react&logoColor=white)](#)
        </ReactMarkdown>
      </Box>
    </>
  );
}
