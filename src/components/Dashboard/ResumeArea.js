import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ResumeArea() {
  return (
    <>
      <Typography variant="h1" sx={{ fontWeight: 800, lineHeight: 4, mt: 5 }}>
        Resume
      </Typography>
      <Typography sx={{ fontWeight: 200, mb: 10, ml: 5, fontSize: "1.2rem" }}>
        이력서를 관리하세요
        <br />
        <br />
        나의 활동과 마일리지를 바탕으로 이력서 작성까지!
        <br />
        <br />
        모든 과정을 HisPath에서 간편하게!
      </Typography>
      <Link to={`/resume`} style={{ textDecoration: "none" }}>
        <Button
          sx={{
            fontWeight: "900",
            fontSize: "1.2rem",
            fontFamily: "Ubuntu",
            backgroundColor: "secondary.main",
            color: "white",
            width: "10rem",
            height: "3.5rem",
            borderRadius: 6,
            mr: 0.5,
          }}
        >
          이력서
        </Button>
      </Link>
    </>
  );
}
