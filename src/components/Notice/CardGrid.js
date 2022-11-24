import React from 'react';
import { Grid, Container, styled, Box } from '@mui/material';
import NoticeCard from './NoticeCard';
const Section = styled(Container)({
  marginTop: 0,
  padding: 0,
  borderRadius: 8,
});
function CardGrid({ noticeList }) {
  const NoticeTocard = () => {
    var arr = [];
    noticeList.map((notice) =>
      arr.push(
        <Grid key={notice.id} item xs={6} lg={4} style={{ height: 300 }}>
          <NoticeCard notice={notice}></NoticeCard>
        </Grid>,
      ),
    );
    return arr;
  };

  return (
    <Box>
      <Grid container spacing={10}>
        <NoticeTocard />
      </Grid>
    </Box>
  );
}
export default CardGrid;
