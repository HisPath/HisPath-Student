import { Card, Typography, CardContent, Box, Chip } from "@mui/material";
import TextMaxLine from "../../components/text-max-line";

export default function ActivityCard({ activity }) {
  console.log(activity);
  function HtmlToString() {
    return <div dangerouslySetInnerHTML={{ __html: activity.content }}></div>;
  }
  //api-dev-minimal-v4.vercel.app/assets/images/covers/cover_5.jpg
  https: return (
    <>
      <Card sx={{ mt: 3, width: 1 }}>
        <Box>
          {activity.section === "수상" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_18.jpg"
              }
            />
          ) : activity.section === "기술" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_5.jpg"
              }
            />
          ) : activity.section === "학력" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_9.jpg"
              }
            />
          ) : activity.section === "링크" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_10.jpg"
              }
            />
          ) : activity.section === "경력" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_11.jpg"
              }
            />
          ) : activity.section === "자격증" ? (
            <img
              src={
                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_15.jpg"
              }
            />
          ) : activity.section === "언어" ? (
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
          {/* <img
            src={
              "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_18.jpg"
            }
          /> */}
        </Box>
        <CardContent
          sx={{
            pt: 2,
            // width: 1,
            maxHeight: "calc(40vh)",
            overflow: "scroll",
          }}
        >
          <Box display={"flex"} gap={2} mb={2} justifyContent="space-around">
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              sx={{
                color: "text.disabled",
                mt: 0.8,
              }}
            >
              {activity.semester}
            </Typography>
            {activity.section === "수상" ? (
              <Chip
                label={activity.section}
                sx={{
                  backgroundColor: "#e6fa32",
                  color: "#222",
                  fontWeight: 900,
                }}
              />
            ) : activity.section === "기술" ? (
              <Chip
                label={activity.section}
                sx={{
                  background: "#9bf731",
                  color: "#222",
                  fontWeight: 900,
                }}
              />
            ) : activity.section === "학력" ? (
              <Chip
                label={activity.section}
                sx={{
                  background: "#49f558",
                  color: "#222",
                  fontWeight: 900,
                }}
              />
            ) : activity.section === "링크" ? (
              <Chip
                label={activity.section}
                sx={{
                  background: "#49f2ea",
                  color: "#222",
                  fontWeight: 900,
                }}
              />
            ) : activity.section === "경력" ? (
              <Chip
                label={activity.section}
                sx={{
                  background: "#4be5fa",
                  color: "#fff",
                  fontWeight: 900,
                }}
              />
            ) : activity.section === "자격증" ? (
              <Chip
                label={activity.section}
                sx={{
                  background: "#33beff",
                  color: "#fff",
                  fontWeight: 900,
                }}
              />
            ) : activity.section === "언어" ? (
              <Chip
                label={activity.section}
                sx={{
                  background: "#32a8fc",
                  color: "#fff",
                  fontWeight: 900,
                }}
              />
            ) : (
              <Chip
                label={activity.section}
                sx={{
                  background: "#4963f5",
                  color: "#fff",
                  fontWeight: 900,
                }}
              />
            )}
            {activity.mileage ? (
              <Chip
                label="마일리지"
                variant="outlined"
                sx={{
                  color: "primary.main",
                  backgroundColor: "#fff",
                  fontWeight: 800,
                }}
              />
            ) : (
              ""
            )}
          </Box>

          {/* <Link to={`/notice/${notice.notice.noticeId}`}> */}
          <TextMaxLine variant={"h5"} line={2} persistent>
            {activity.name}
          </TextMaxLine>
          <Typography persistent>{activity.remark}</Typography>
          {/* </Link> */}
          {/* <InputBase
                multiline
                fullWidth
                // rows={4}
                value={html(notice.content)}
                sx={{
                  p: 1,
                  mb: 1,
                  borderRadius: 1,
                }}
              /> */}
          <HtmlToString />
        </CardContent>
      </Card>
    </>
  );
}
