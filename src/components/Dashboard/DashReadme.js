import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getInfo } from "../../api/dashboard";
import Label from "../../components/label";

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
      <Label
        color={"success"}
        sx={{
          fontSize: "1.3rem",
          p: 2,
          pt: 2.5,
          fontFamily: "Public Sans,sans-serif",
        }}
      >
        {info.name}/readme.md
      </Label>
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
