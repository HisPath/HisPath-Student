import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import parse from 'html-react-parser';

export default function NoticeCard({ data }) {
  const DefaultCard = () => (
    <Box container style={{ height: '100px' }}>
      <CardContent style={{ padding: '16px 16px 16px', height: 'auto' }}>
        <StatusIcons imp={data.importance} style={{ float: 'right' }} />
        <Typography variant="body2">{data.managerName}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {data.pubDate}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}
          style={{
            fontWeight: 'bold',
            paddingBottom: 10,
            height: '100px',
          }}
        >
          {data.title}
        </Typography>
        <Box display="flex" stype={{ height: 'auto' }}>
          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
            color="text.secondary"
            style={{
              fontWeight: 'normal',
              height: 'inherit',
            }}
          >
            {parse(data.content)}
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: 15 }}
          color="text.secondary"
          style={{ float: 'right' }}
          gap={0.5}
        >
          {data.viewCnt}
          <VisibilityIcon style={{ float: 'right' }} fontSize="small" />
        </Typography>
      </CardContent>
    </Box>
  );

  const [comp, setComp] = useState(<DefaultCard />);
  const [isHover, setIsHover] = useState(false);

  const toPost = () => {
    window.open(`/notice/${data.id}`, '_self');
  };
  const StatusIcons = ({ imp }) => {
    if (imp) {
      return (
        <PriorityHighIcon
          fontSize="small"
          style={{
            float: 'right',
            color: 'red',
          }}
        />
      );
    }
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const cardStyle = {
    color: isHover ? '#24385e' : '#44627b',
  };

  return (
    <Card
      onClick={toPost}
      sx={{ borderRadius: '16px' }}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {comp}
    </Card>
  );
}
