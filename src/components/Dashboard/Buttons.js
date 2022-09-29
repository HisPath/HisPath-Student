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
        mt: 4,
      }}
    >
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to={`/activity`} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              fontWeight: "bold",
              fontFamily: "Ubuntu",
              width: btnWidth,
              height: "3rem",
            }}
          >
            내 활동
          </Button>
        </Link>
        <Link to={`/mileage`} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              fontWeight: "bold",
              fontFamily: "Ubuntu",
              backgroundColor: "primary.light",
              width: btnWidth,
              height: "3rem",
            }}
          >
            마일리지
          </Button>
        </Link>
        <Button
          sx={{ fontWeight: "bold", fontFamily: "Ubuntu", width: btnWidth }}
        >
          포트폴리오
        </Button>
      </ButtonGroup>
    </Box>
  );
}
