import { Card, Typography, CardContent, Box } from "@mui/material";
import TextMaxLine from "../../components/text-max-line";

export default function ResumeCard({ resume }) {
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
              "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_18.jpg"
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
            {resume.createdAt}
          </Typography>

          {/* <Link to={`/notice/${notice.notice.noticeId}`}> */}
          <TextMaxLine variant={"h5"} line={2} persistent>
            {resume.title}
          </TextMaxLine>
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
          {/* <HtmlToString /> */}
        </CardContent>
      </Card>
    </>
  );
}
{
  /* <Card sx={{ textAlign: "center" }}>
       <Box sx={{ position: "relative" }}>
         <Image src={userImg} ratio="16/9" />
       </Box>

       <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: "black" }}>
         {"제목"}
       </Typography>
       <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontWeight: "bolder" }}
      >
        {"3"}학기
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontWeight: "bolder" }}
      >
        {"220000371"}
      </Typography>
    </Card> */
}
