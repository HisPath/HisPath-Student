import { Card, Typography, CardContent, InputBase } from "@mui/material";
import { Link } from "react-router-dom";
import TextMaxLine from "../../components/text-max-line";

export default function NoticeCard({ title }) {
  return (
    <Card sx={{ mt: 3, width: 1 }}>
      <CardContent
        sx={{
          pt: 4.5,
          // width: 1,
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
          {"2022-11-03"}
        </Typography>

        {/* <Link to={`/notice/${notice.notice.noticeId}`}> */}
        <TextMaxLine variant={"h5"} line={2} persistent>
          {"notice title"}
        </TextMaxLine>
        {/* </Link> */}
        <InputBase
          multiline
          fullWidth
          // rows={4}
          value="이거 공지 내용이거 공지 내용이거 공지 내용이거 공지 내용이거 공지 내용이거 공지 내용이거 공지 내용이거 공지 내용이거 공지 내용"
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 1,
          }}
        />
      </CardContent>
    </Card>
  );
}
