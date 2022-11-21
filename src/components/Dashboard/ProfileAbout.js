import { Card, CardHeader, Stack, Typography } from "@mui/material";
import Iconify from "../../components/iconify/Iconify.js";
import { styled } from "@mui/material/styles";
import { useState, useEffect, React } from "react";
import { getInfo } from "../../api/dashboard";
import Label from "../../components/label";

export default function ProfileAbout() {
  const [info, setInfo] = useState([]);

  const getDashboardInfo = async () => {
    const info = await getInfo();
    setInfo(info.data);
  };

  useEffect(() => {
    getDashboardInfo();
  }, []);

  const StyledIcon = styled(Iconify)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: 16,
  }));

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Label
          variant="soft"
          color={"secondary"}
          sx={{
            fontSize: "1.3rem",
            p: 2,
            pt: 2.5,
            fontFamily: "Public Sans,sans-serif",
          }}
        >
          Hello {info.name}
        </Label>
        <Stack direction="row">
          <StyledIcon icon="eva:flag-fill" />

          {info.semester === 1 ? (
            <Typography variant="body2">
              {info.semester}학년 {info.semester}학기
            </Typography>
          ) : (
            <Typography variant="body2">
              {Math.floor(info.semester / 2)}학년 {info.semester}학기
            </Typography>
          )}
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">{"전산전자"}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">1전공 : {info.major1?.name}</Typography>
        </Stack>

        {info.major2 && (
          <Stack direction="row">
            <StyledIcon icon="ic:round-business-center" />

            <Typography variant="body2">2전공 : {info.major2?.name}</Typography>
          </Stack>
        )}

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{info.email}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:phone" />

          <Typography variant="body2">{info.phone}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
