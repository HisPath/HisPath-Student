import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, styled, Typography } from '@mui/material';

import { getNoticeById } from '../../api/notice';

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
    if (imp)
      return (
        <Typography variant="p" color="error">
          중요공지
        </Typography>
      );
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
          style={{
            float: 'right',
          }}
          onClick={() => {
            window.history.go(-1);
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

              <Typography variant="p">작성자: {managerName}</Typography>
              <Typography variant="p">
                게시기간: {pubDate} ~ {expDate}
              </Typography>
              <Typography variant="p" color="green">
                조회수: {viewCnt}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <hr />
        <Container maxWidth="md">
          <HtmlToString />
        </Container>
        <br />
      </Box>
    </Section>
  );
}

function Post({ modalId = -1 }) {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState();

  const loadData = async () => {
    if (modalId === -1) {
      getNoticeById(noticeId).then(function (data) {
        setNotice(data);
      });
    } else {
      getNoticeById(modalId).then(function (data) {
        setNotice(data);
      });
    }
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
