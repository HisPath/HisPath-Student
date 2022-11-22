import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import styles from "../../style/mileage.module.css";
import NavigationIcon from "@mui/icons-material/Navigation";

// const MoveToTop = () => {
//   // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

export default function NavigatorToTop() {
  const MoveToTop = () => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Fab
      className={styles.movetop_button}
      variant="extended"
      onClick={MoveToTop}
      sx={{
        backgroundColor: "primary.main",
        float: "right",
        marginRight: "0",
        ":hover": {
          backgroundColor: "primary.main",
        },
      }}
    >
      <NavigationIcon sx={{ color: "white" }} />
    </Fab>
  );
}
