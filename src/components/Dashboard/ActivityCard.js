import { Card, Typography, CardContent, Box } from "@mui/material";
import { Link } from "react-router-dom";
import TextMaxLine from "../../components/text-max-line";

export default function ActivityCard({ activity }) {
  return (
    <>
      <Card sx={{ mt: 3, width: 1 }}>
        <Box>
          {/* <img
            src={
              "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_15.jpg"
            }
          /> */}
          {activity.participant.section === "REWARD" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_18.jpg"
              }
            />
          ) : activity.participant.section === "SKILL" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_5.jpg"
              }
            />
          ) : activity.participant.section === "EDUCATION" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_9.jpg"
              }
            />
          ) : activity.participant.section === "LINK" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_10.jpg"
              }
            />
          ) : activity.participant.section === "EXPERIENCE" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_11.jpg"
              }
            />
          ) : activity.participant.section === "CERTIFICATE" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_15.jpg"
              }
            />
          ) : activity.participant.section === "LANGUAGE" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_19.jpg"
              }
            />
          ) : (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_21.jpg"
              }
            />
          )}
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

          <TextMaxLine variant={"h5"} line={2}>
            {activity.name}
          </TextMaxLine>
        </CardContent>
      </Card>
    </>
  );
}
