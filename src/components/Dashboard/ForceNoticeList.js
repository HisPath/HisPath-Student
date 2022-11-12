import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const noticeWidth = '28rem';

const style = {
  padding: 2,
  margin: 3,
  marginTop: 1,
  marginBottom: 1,
  maxWidth: noticeWidth,
  bgcolor: 'background.paper',
};

export default function Notice() {
  const [notices, setNotices] = React.useState([]);

  const getNotices = async () => {
    const notice = await axios.get('http://localhost:8080/api/student/dashboard/1');
    setNotices(notice.data.notice);
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <Box>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        m={3}
        mt={1}
        marginBottom={1}
        fontFamily="Ubuntu"
        textAlign="center"
        color="secondary.dark"
        width={noticeWidth}
      >
        필수공지
      </Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {notices.map((notice) => (
          <ListItem button divider>
            <ListItemText
              primary={notice.title}
              secondary={notice.pubDate}
              onClick={() => {
                window.open(`/notice/${notice.noticeId}`, '_self');
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
