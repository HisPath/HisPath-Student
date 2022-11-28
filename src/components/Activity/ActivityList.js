import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useRecoilValue } from "recoil";
import { activityState } from "../../store/atom";
import ActivityCard from "./ActivityCard";

export default function ActivityList() {
  const activities = useRecoilValue(activityState);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        mb={5}
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
      >
        {activities.map((activity) => (
          <Link
            to={`/activity/detail/${activity.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ActivityCard key={activity.activityId} activity={activity} />
          </Link>
        ))}
      </Box>
    </>
  );
}
