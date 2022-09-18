import { Box, Container } from "@mui/material";
import Info from "../components/Dashboard/Info.js";
import Navigation from "../components/Dashboard/Navigation.js";

function Dashboard() {
  return (
    <Container sx={{ display: "flex" }}>
      <Info />
      <Navigation />
    </Container>
  );
}

export default Dashboard;
