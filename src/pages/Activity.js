import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getActivities } from "../api/activity";
import ActivityTab from "../components/Activity/ActivityTab";
import TagMenu from "../components/Activity/TagMenu";
import { activityState } from "../store/atom";

export default function Activity() {
  const [activities, setActivities] = useRecoilState(activityState);

  useEffect(() => {
    getActivities().then((data) => setActivities(data));
  }, []);

  return (
    <>
      <Box maxWidth="xl" sx={{ display: "flex" }}>
        <TagMenu />
        <ActivityTab />
      </Box>
    </>
  );
}
