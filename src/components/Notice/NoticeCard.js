import React from 'react';
import parse from 'html-react-parser';
import { Box, Card, Divider, Typography } from '@mui/material';
import NoticeImg from '../../assets/noticeImg.jpeg';
import Image from '../image';
import Iconify from '../iconify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

function NoticeCard({ notice }) {
  return (
    <Card sx={{ textAlign: 'center' }} onClick={() => window.open(`/notice/${notice.id}`, '_self')}>
      <Box
        sx={{
          position: 'relative',
          width: 'inherit',
          height: 'inherit',
          backgroundColor: 'primary',
        }}
      >
        <Image src={NoticeImg} ratio="16/9" />
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" sx={{ ml: 4.5, mr: 4.5, mb: 4.5 }}>
        <Typography
          variant="subtitle1"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            mt: 6,
            mb: 0.5,
            color: 'black',
          }}
        >
          {notice.title}
        </Typography>
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 5,
            color: 'text.disabled',
          }}
          variant="body2"
        >
          {parse(notice.content)}
        </Typography>
      </Box>

      {/* <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
          {major.department}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
          {major.totalcredits}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5, color: 'black' }}>
          {major.studentCnt}
        </Typography> */}

      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 2 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            등록일
          </Typography>
          <Typography variant="caption" component="div" sx={{ mb: 0.75 }}>
            {notice.pubDate}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            작성자
          </Typography>
          <Typography variant="caption" component="div" sx={{ mb: 0.75 }}>
            {notice.managerName}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            조회수
          </Typography>
          <Typography variant="caption" component="div" sx={{ mb: 0.75 }}>
            {notice.viewCnt}
          </Typography>
        </div>
      </Box>
    </Card>
  );
}
export default NoticeCard;

// import React, { useEffect, useState } from 'react';
// import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import parse from 'html-react-parser';
// import Notice from '../../pages/Notice';
// import { cyan } from '@material-ui/core/colors';

// export default function NoticeCard({ data }) {
//   const DefaultCard = () => (
//     <>
//       <Box container style={{ height: 200 }}>
//         <CardContent style={{ padding: '16px 16px 16px', height: '100%' }}>
//           <StatusIcons imp={data.importance} style={{ float: 'right' }} />
//           <Typography variant="body2">{data.managerName}</Typography>
//           <Typography sx={{ fontSize: 14 }} color="text.secondary">
//             {data.pubDate}
//           </Typography>
//           <Typography
//             variant="h5"
//             sx={{
//               display: '-webkit-box',
//               overflow: 'hidden',
//               WebkitBoxOrient: 'vertical',
//               WebkitLineClamp: 1,
//             }}
//             style={{
//               fontWeight: 'bold',
//               paddingBottom: 10,
//               height: 30,
//             }}
//           >
//             {data.title}
//           </Typography>
//           <Box display="flex" style={{ height: 'auto' }}>
//             <Typography
//               sx={{
//                 display: '-webkit-box',
//                 overflow: 'hidden',
//                 WebkitBoxOrient: 'vertical',
//                 WebkitLineClamp: 2,
//               }}
//               color="text.secondary"
//               style={{
//                 fontWeight: 'normal',
//                 height: 'inherit',
//               }}
//             >
//               {parse(data.content)}
//             </Typography>
//           </Box>
//         </CardContent>
//       </Box>
//       <Typography
//         sx={{ fontSize: 15 }}
//         color="text.secondary"
//         style={{ float: 'right', marginRight: 10 }}
//         gap={0.5}
//       >
//         {data.viewCnt} <VisibilityIcon style={{ float: 'right', marginTop: 2 }} fontSize="small" />
//       </Typography>
//     </>
//   );

//   const [comp, setComp] = useState(<DefaultCard />);
//   const [isHover, setIsHover] = useState(false);

//   const toPost = () => {
//     window.open(`/notice/${data.id}`, '_self');
//   };
//   const StatusIcons = ({ imp }) => {
//     if (imp) {
//       return (
//         <PriorityHighIcon
//           fontSize="small"
//           style={{
//             float: 'right',
//             color: 'red',
//           }}
//         />
//       );
//     }
//   };
//   const handleMouseEnter = () => {
//     setIsHover(true);
//   };
//   const handleMouseLeave = () => {
//     setIsHover(false);
//   };

//   const cardStyle = {
//     color: isHover ? '#24385e' : '#44627b',
//   };

//   return (
//     <Card
//       onClick={toPost}
//       sx={{ borderRadius: '16px' }}
//       style={cardStyle}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {comp}
//     </Card>
//   );
// }
