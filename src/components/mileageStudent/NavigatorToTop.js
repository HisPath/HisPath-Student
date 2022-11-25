import * as React from "react";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function NavigatorToTop() {
  const MoveToTop = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fab
      variant="extended"
      onClick={MoveToTop}
      sx={{
        backgroundColor: "primary.main",
        float: "right",
        marginRight: "0",
        ":hover": {
          backgroundColor: "primary.main",
        },
        position: "fixed !important",
        bottom: "50px",
        right: "150px",
        height: "30px !important",
      }}
    >
      <NavigationIcon sx={{ color: "white", marginRight: "0 !important" }} />
    </Fab>
  );
}
