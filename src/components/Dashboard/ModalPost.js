import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import axios from 'axios';
const Section = styled(Container)({
  marginTop: 10,
  paddingRight: 0,
  borderRadius: 8,
  width: '700px',
  maxHeight: '500px',
  overflowY: 'scroll',
  overflowX: 'hidden',
});
const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: 10,
});
function Article({ managerName, title, content, viewCnt, importance, pubDate, expDate }) {
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
    <Section style={{ paddingLeft: 0, paddingRight: 50 }}>
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

function ModalPost({ modalId = -1 }) {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState();

  const loadData = async () => {
    if (modalId === -1) {
      await axios.get(`http://localhost:8080/api/notice/${noticeId}`).then(function (response) {
        setNotice(response.data);
      });
    } else {
      await axios.get(`http://localhost:8080/api/notice/${modalId}`).then(function (response) {
        setNotice(response.data);
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

export default ModalPost;
