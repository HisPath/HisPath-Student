import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getInfo } from "../../api/dashboard";

const readmeWidth = "25rem";

export default function Readme() {
  const [info, setInfo] = React.useState([]);

  const getInformation = async () => {
    const info = await getInfo();
    setInfo(info.data);
  };

  useEffect(() => {
    getInformation();
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
          backgroundColor: "#fff",
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
