import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MileageArea() {
  return (
    <>
      <Typography variant="h1" sx={{ fontWeight: 600, lineHeight: 4, mt: 5 }}>
        Mileage
      </Typography>
      <Typography sx={{ fontWeight: 200, mb: 3, mr: 5, fontSize: "1.2rem" }}>
        마일리지 인정 내역을 확인하세요
      </Typography>
      <Typography sx={{ fontWeight: 200, mb: 3, mr: 5, fontSize: "1.2rem" }}>
        마일리지 차트 분석부터 나만의 장점 발견까지!
      </Typography>
      <Typography sx={{ fontWeight: 200, mb: 10, mr: 5, fontSize: "1.2rem" }}>
        모든 과정을 HisPath에서 간편하게!
      </Typography>

      <Link to={`/mileage`} style={{ textDecoration: "none" }}>
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
          마일리지
        </Button>
      </Link>
    </>
  );
}
