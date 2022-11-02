import React from 'react';
import { Grid, Container, styled, Box } from '@mui/material';
import BasicCard from './BasicCard';
const Section = styled(Container)({
  marginTop: 0,
  padding: 0,
  borderRadius: 8,
});
function CardGrid({ noticeList }) {
  const Propcheck = () => {
    console.log(noticeList);
  };
  const NoticeTocard = () => {
    var arr = [];
    noticeList.map((notice) =>
      arr.push(
        <Grid key={notice.id} item xs={12} lg={6}>
          <BasicCard data={notice}></BasicCard>
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
