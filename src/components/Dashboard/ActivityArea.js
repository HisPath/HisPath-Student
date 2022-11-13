import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ActivityArea() {
  return (
    <>
      <Typography variant="h1" sx={{ fontWeight: 800, lineHeight: 6, mt: 15 }}>
        My Activities
      </Typography>
      <Typography sx={{ fontWeight: 200, mb: 10, ml: 5, fontSize: "1.2rem" }}>
        지금까지 나의 활동을 추가하고 확인하세요
        <br />
        <br />
        활동 추가하고, 마일리지 인정까지!
        <br />
        <br />
        모든 과정을 HisPath에서 간편하게!
      </Typography>
      <Link to={`/activity`} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color={"secondary"}
          sx={{
            fontWeight: "900",
            fontSize: "1.2rem",
            fontFamily: "Ubuntu",
            width: "10rem",
            height: "3.5rem",
            borderRadius: 6,
            mr: 0.5,
          }}
        >
          내 활동
        </Button>
      </Link>
    </>
  );
}
