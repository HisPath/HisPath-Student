import { useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import RadarChart from "./RadarChart";

const ChartTab = ({ semester }) => {
  return (
    <Box overflow={"auto"} maxHeight="calc(80vh)" maxWidth={"calc(80vw)"}>
      <Box m={1} mt={3} display={"flex"} justifyContent={"space-evenly"}>
        <Card dir="ltr">
          <CardHeader title="활동 분포" />
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RadarChart semester={semester} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ChartTab;
