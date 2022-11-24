import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { getImpNotices } from '../../api/notice';

const noticeWidth = '28rem';

const style = {
  padding: 2,
  margin: 3,
  marginTop: 1,
  marginBottom: 1,
  maxWidth: noticeWidth,
  bgcolor: 'background.paper',
};

const checkLocalStorage = async (notice) => {
  const item = window.localStorage.getItem(`IMP#${notice.noticeId}`);
  if (item == null) {
    const exp = new Date(notice.expDate);
    const obj = { viewed: false, expire: exp };
    window.localStorage.setItem(`IMP#${notice.noticeId}`, JSON.stringify(obj));
  }
};

const changeViewed = (id) => {
  var item = JSON.parse(window.localStorage.getItem(`IMP#${id}`));
  window.localStorage.removeItem(`IMP#${id}`);
  item.viewed = true;
  window.localStorage.setItem(`IMP#${id}`, JSON.stringify(item));
};

const GetfromLS = ({ notice, setId }) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    checkLocalStorage(notice).then(() => {
      setState(JSON.parse(window.localStorage.getItem(`IMP#${notice.noticeId}`)).viewed);
    });
  }, []);
  return (
    <ListItem button divider>
      <ListItemText
        primary={notice.title}
        secondary={notice.pubDate}
        onClick={() => {
          setState(true);
          changeViewed(notice.noticeId);
          setId(notice.noticeId);
        }}
      />
    </ListItem>
  );
};

export default function ForceNoticeList({ setId }) {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    getImpNotices().then((data) => {
      setNotices(data);
    });
  }, []);

  const CheckViwed = ({ n, setId }) => {
    const obj = JSON.parse(window.localStorage.getItem(`IMP#${n.noticeId}`));
    if (obj === null || obj.viewed === false) return <GetfromLS notice={n} setId={setId} />;
  };
  return (
    <Box>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        mt={1}
        mb={1}
        textAlign="center"
        fontWeight={600}
        color="secondary.dark"
        width={noticeWidth}
      >
        필수공지
      </Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {notices.map((notice) => (
          <CheckViwed n={notice} setId={setId} />
        ))}
      </List>
    </Box>
  );
}
