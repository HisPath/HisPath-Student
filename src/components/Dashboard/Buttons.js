import * as React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  padding: 2,
  margin: 3,
  //   width: "100%",
  //   height: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const btnWidth = "9rem";

export default function Buttons() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <ButtonGroup variant="text" aria-label="outlined primary button group">
        <Link to={`/activity`} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              fontWeight: "400",
              fontSize: "1rem",
              fontFamily: "Ubuntu",
              backgroundColor: "secondary.main",
              color: "white",
              width: btnWidth,
              height: "3rem",
              borderRadius: 6,
              mr: 0.5,
            }}
          >
            내 활동
          </Button>
        </Link>
        <Link to={`/mileage`} style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              fontWeight: "400",
              fontSize: "1rem",
              fontFamily: "Ubuntu",
              color: "secondary.dark",
              width: btnWidth,
              height: "3rem",
              borderRadius: 6,
              mr: 0.5,
            }}
          >
            마일리지
          </Button>
        </Link>
        <Link to={`/resume`} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              fontWeight: "400",
              fontSize: "1rem",
              fontFamily: "Ubuntu",
              backgroundColor: "secondary.main",
              color: "white",
              width: btnWidth,
              height: "3rem",
              borderRadius: 6,
            }}
          >
            포트폴리오
          </Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
}
