import React from "react";
import { Card, Grid, Container, CardHeader, CardContent } from "@mui/material";

import {
  ChartRadialBar,
  ChartLine,
  ChartMixed,
  ChartsRadarBar,
} from "../charts";

export default function MileageChart() {
  return (
    <>
      <Container
        sx={{ width: "100%", marginBottom: "50px", marginTop: "50px" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ marginBottom: "20px" }}>
            <Card dir="ltr">
              <CardHeader title="마일리지 분포" />
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChartsRadarBar />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} sx={{ marginBottom: "20px" }}>
            <Card dir="ltr">
              <CardHeader title="내 마일리지 총점 순위" />
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChartRadialBar />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginBottom: "20px" }}>
          <Card dir="ltr">
            <CardHeader title="마일리지 참여 횟수" />
            <CardContent>
              <ChartMixed />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginBottom: "20px" }}>
          <Card dir="ltr">
            <CardHeader title="내 마일리지 성장 타임라인" />
            <CardContent>
              <ChartLine />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </>
  );
}
