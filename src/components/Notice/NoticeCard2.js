import { Image } from '@mui/icons-material';
import { Card, Typography, CardContent, Box, InputBase } from '@mui/material';
import { Link } from 'react-router-dom';
import TextMaxLine from '../../components/text-max-line';
import Iconify from '../iconify/Iconify';
import Img from '../../assets/login.jpg';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function NoticeCard({ notice }) {
  function HtmlToString() {
    return <div dangerouslySetInnerHTML={{ __html: notice.content }}></div>;
  }

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
          <img src={'https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_18.jpg'} />
        </Box>
        <CardContent
          sx={{
            pt: 2,
            // width: 1,
            maxHeight: 'calc(40vh)',
            overflow: 'scroll',
          }}
        >
          {/* <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{
              color: "text.disabled",
            }}
          >
            {notice.regDate}
          </Typography> */}

          {/* <Link to={`/notice/${notice.notice.noticeId}`} >

          </Link> */}
          <Typography variant="body2">{notice.managerName}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {notice.pubDate}
          </Typography>
          <TextMaxLine variant={'h5'} line={2} persistent>
            {notice.title}
          </TextMaxLine>

          <HtmlToString />
          <Typography
            sx={{ fontSize: 15 }}
            color="text.secondary"
            style={{ float: 'right' }}
            gap={0.5}
          >
            {notice.viewCnt}
            <VisibilityIcon style={{ float: 'right' }} fontSize="small" />
          </Typography>
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
