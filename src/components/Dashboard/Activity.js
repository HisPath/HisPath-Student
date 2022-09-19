import * as React from "react";
import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { Palette } from "@mui/icons-material";

const style = {
  padding: 2,
  margin: 3,
  //   width: "100%",
  //   height: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

export default function Activity() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        mt: 8,
      }}
    >
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          sx={{
            fontWeight: "bold",
            fontFamily: "Ubuntu",
            width: "12rem",
            height: "3rem",
          }}
        >
          Activity
        </Button>
        <Button
          sx={{
            fontWeight: "bold",
            fontFamily: "Ubuntu",
            backgroundColor: "primary.light",
            width: "12rem",
          }}
        >
          Mileage
        </Button>
        <Button
          sx={{ fontWeight: "bold", fontFamily: "Ubuntu", width: "12rem" }}
        >
          Portfolio
        </Button>
      </ButtonGroup>
    </Box>
  );
}
