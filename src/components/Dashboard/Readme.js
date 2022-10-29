import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

const readmeWidth = "25rem";

export default function Readme() {
  const [info, setInfo] = React.useState([]);

  const getInfo = async () => {
    const info = await axios.get(
      "http://localhost:8080/api/student/dashboard/1"
    );
    console.log(info.data);
    setInfo(info.data);
  };

  useEffect(() => {
    getInfo();
  }, []);

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
          width: "calc(25vw)",
        }}
      >
        <Typography
          sx={{
            width: readmeWidth,
            fontSize: ".8rem",
          }}
        >
          {info.name}/README.md
        </Typography>
        <h1>
          <ReactMarkdown children={info.name} />
        </h1>
        <ReactMarkdown children={info.readme} />
      </Box>
    </>
  );
}
