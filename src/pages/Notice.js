import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import TT from '../components/Notice/TT';
export default function Notice() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <TT />
      </Box>
    </>
  );
}
