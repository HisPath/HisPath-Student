import { useState } from "react";
import { Line, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Bar } from "react-chartjs-2";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { getActivities, getCategories } from "../../api/mileage";
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
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <Card dir="ltr">
            <CardHeader title="마일리지 참여 횟수" />
            <CardContent>
              <ChartMixed />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
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
