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
  function ImpChip({ imp }) {
    if (imp) return <Chip label={'중요'} variant="outlined" color="error" />;
  }

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
      <Box container>
        <br />
        <Box container display="flex" justifyContent={'center'}>
          <Typography variant="h3" p={1}>
            {title}
          </Typography>
        </Box>
        <br />
        <hr />
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" gap={3} justifyContent={'center'} mr={3}>
              <ImpChip imp={importance} label="Important Notice" />
              <Chip label={'작성자: ' + managerName} variant="outlined" color="primary" />
              <Chip label={'게시일: ' + pubDate} variant="outlined" color="primary" />
              <Chip label={'만료일: ' + expDate} variant="outlined" color="primary" />
              <Chip label={'조회수: ' + viewCnt} variant="outlined" color="success" />
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
