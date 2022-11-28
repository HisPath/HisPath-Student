import {
  Box,
  Card,
  Grid,
  Container,
  CardHeader,
  CardContent,
} from "@mui/material";

import {
  ChartLine,
  ChartMixed,
  ChartsRadarBar,
  ChartRadialBar,
} from "../../components/charts";

export default function DemoChartsPage() {
  return (
    <>
      <Container sx={{ my: 10 }}>
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
