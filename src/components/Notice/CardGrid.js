import React from 'react';
import { Grid, Container, styled, Box } from '@mui/material';
import NoticeCard from './NoticeCard';
const Section = styled(Container)({
  marginTop: 0,
  padding: 0,
  borderRadius: 8,
});
function CardGrid({ noticeList }) {
  return (
    <>
      <Container maxWidth={'lg'}>
        <Box
          gap={5}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          style={{ height: 'auto' }}
        >
          {noticeList.map((notice) => (
            <NoticeCard notice={notice}></NoticeCard>
          ))}
        </Box>
      </Container>
    </>
  );
}
export default CardGrid;
