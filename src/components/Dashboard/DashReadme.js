import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getInfo } from "../../api/dashboard";

export default function DashReadme() {
  const [info, setInfo] = React.useState([]);

  const getInformation = async () => {
    const info = await getInfo();
    console.log(info.data);
    setInfo(info.data);
  };

  useEffect(() => {
    getInformation();
  }, []);

  return (
    <Card sx={{ p: 3 }}>
      <Typography sx={{ fontSize: ".8rem" }}>{info.name}/README.md</Typography>
      <ReactMarkdown
        children={info.readme}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
        }}
      />
    </Card>
  );
}
