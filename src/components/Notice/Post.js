import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Container, Grid, styled, Stack, Typography } from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReportIcon from '@mui/icons-material/Report';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import axios from 'axios';
const Section = styled(Container)({
  marginTop: 10,
  paddingLeft: 0,
  borderRadius: 8,
});
const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: 10,
});
function Article({
  id,
  managerId,
  managerName,
  title,
  content,
  viewCnt,
  importance,
  pubDate,
  expDate,
}) {
  const StatusIcons = ({ imp }) => {
    if (imp) {
      return <PriorityHighIcon color="error" />;
    }
  };

  function HtmlToString() {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
  return (
    <Section>
      <Header>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          공지사항 &#62; 상세
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            window.history.go(-1);
          }}
          style={{
            float: 'right',
          }}
        >
          돌아가기
        </Button>
      </Header>
      <hr />
      <Box container>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Box display="flex" justifyContent={'left'} alignItems="center">
              <StatusIcons imp={importance} style={{ float: 'left' }} />
              <Typography variant="h5">{title}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" gap={3} justifyContent={'right'} mr={3}>
              <Typography color="primary"> 작성자: {managerName} </Typography>
              <Typography color="primary"> 게시일: {pubDate} </Typography>
              <Typography color="primary"> 만료일: {expDate} </Typography>
              <Typography color="primary"> 조회수: {viewCnt} </Typography>
            </Box>
          </Grid>
        </Grid>

        <hr />
        <HtmlToString />
      </Box>
    </Section>
  );
}

function Post() {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState();

  const loadData = async () => {
    await axios.get(`http://localhost:8080/api/notice/${noticeId}`).then(function (response) {
      setNotice(response.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Section fixed>
      <Article {...notice} />
    </Section>
  );
}

export default Post;
