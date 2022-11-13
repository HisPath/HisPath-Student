import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Box, FormControlLabel, FormGroup, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

const noticeWidth = '28rem';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
  // console.log(window.localStorage.getItem(`IMP#${notice.noticeId}`));
  // return window.localStorage.getItem(`IMP#${notice.noticeId}`);
};

const changeViewed = (id) => {
  var item = JSON.parse(window.localStorage.getItem(`IMP#${id}`));
  window.localStorage.removeItem(`IMP#${id}`);
  console.log('before: ' + item.viewed);
  item.viewed = true;
  console.log('after: ' + item.viewed);
  window.localStorage.setItem(`IMP#${id}`, JSON.stringify(item));
};

function clear() {
  window.localStorage.clear();
}
function length() {
  console.log(window.localStorage.length);
}
const GetfromLS = ({ notice }) => {
  const [state, setState] = useState(false);
  // clear();
  // length();

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
          window.open(`/notice/${notice.noticeId}`);
        }}
      />
      <Checkbox disabled checked={state} />
    </ListItem>
  );
};
const loadViewData = async (notices) => {
  console.log('LOAD VIEW DATA');
  await deleteExpData();
  let arr = [];
  notices.map((notice) => {
    const obj = JSON.parse(window.localStorage.getItem(`IMP#${notice.noticeId}`));
    if (obj.viewed) arr.push(notice.noticeId);
  });
  console.log(arr);
  return arr;
};
const deleteExpData = async () => {
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const obj = JSON.parse(window.localStorage.getItem(key));
    const today = new Date();
    if (obj.expire < today) window.localStorage.removeItem(key);
  }
  // for (let i = 0; i < window.localStorage.length; i++) {
  //   const key = window.localStorage.key(i);
  //   const obj = window.localStorage.getItem(key);
  //   console.log('key: ' + key + ', obj: ' + obj);
  // }
  console.log('DELETE()');
};

export default function ForceNoticeList() {
  const [notices, setNotices] = useState([]);
  let viewedList = [];
  const getNotices = async () => {
    await axios.get('http://localhost:8080/api/notice/imp').then((response) => {
      setNotices(response.data);
    });
  };
  const getViewed = async () => {
    viewedList = await loadViewData(notices);
  };
  useEffect(() => {
    getNotices();
  }, []);

  useEffect(() => {
    getViewed();
  }, [notices]);

  const CheckViwed = ({ n }) => {
    console.log(viewedList);
    if (!(n.noticeId in viewedList)) return <GetfromLS notice={n} />;
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
          <CheckViwed n={notice} />
        ))}
      </List>
    </Box>
  );
}
