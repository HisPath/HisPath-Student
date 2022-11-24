import { Card, Typography, CardContent, Box } from "@mui/material";
import TextMaxLine from "../../components/text-max-line";
import resumeImg from "../../assets/resume.jpeg";

export default function ResumeCard({ resume }) {
  const date = new Date(resume.createdAt);
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
          <img src={resumeImg} />
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
            {date.getFullYear()}년 {date.getMonth() - 1}월 {date.getDate() - 1}
            일
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
