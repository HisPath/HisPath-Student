import { Card, Typography, CardContent, Box } from "@mui/material";
import TextMaxLine from "../../components/text-max-line";

export default function ActivityCard({ activity }) {
  return (
    <>
      <Card sx={{ mt: 3, width: 1 }}>
        <Box
          sx={
            {
              // backgroundColor: "#dacdff",
              // height: "calc(20vh)",
            }
          }
        >
          <img
            src={
              "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_15.jpg"
            }
          />
        </Box>
        <CardContent
          sx={{
            pt: 2,
            // width: 1,
            maxHeight: "calc(40vh)",
            overflow: "scroll",
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{
              color: "text.disabled",
            }}
          >
            {activity.semester}
          </Typography>

          {/* <Link to={`/notice/${notice.notice.noticeId}`}> */}
          <TextMaxLine variant={"h5"} line={2} persistent>
            {activity.name}
          </TextMaxLine>
          {/* </Link> */}
        </CardContent>
      </Card>
    </>
  );
}
