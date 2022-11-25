import { Card, CardHeader, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import { getInfo } from "../../api/dashboard";
import { useEffect, useState } from "react";
import Label from "../../components/label";
import { yellow } from "@mui/material/colors";

export default function ProfileSocialInfo() {
  const [info, setInfo] = useState([]);

  const getDashboardInfo = async () => {
    const info = await getInfo();
    setInfo(info.data);
  };

  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Label
          variant="soft"
          style={{ color: "#e69b00", backgroundColor: "#f7f5bc" }}
          sx={{
            fontSize: "1.3rem",
            p: 2,
            pt: 2.5,
            fontFamily: "Public Sans,sans-serif",
            color: yellow,
          }}
        >
          Social
        </Label>
        <Stack key={"github"} direction="row" sx={{ wordBreak: "break-all" }}>
          <GitHubIcon sx={{ mr: 2 }} />
          <Link
            component="a"
            href={`https://github.com/${info.githubId}`}
            target="_blank"
            variant="body2"
            color="text.primary"
          >
            {`https://github.com/${info.githubId}`}
          </Link>
        </Stack>
        <Stack key={"blog"} direction="row" sx={{ wordBreak: "break-all" }}>
          <LinkIcon sx={{ mr: 2 }} />
          <Link
            component="a"
            href={`${info.blog}`}
            target="_blank"
            variant="body2"
            color="text.primary"
          >
            {`${info.blog}`}
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
