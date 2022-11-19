import { Card, CardHeader, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import { getInfo } from "../../api/dashboard";
import { useEffect, useState } from "react";
import Iconify from "../iconify/Iconify";

export default function ProfileSocialInfo() {
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
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
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
