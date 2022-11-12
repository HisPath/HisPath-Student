import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import TT from '../components/Notice/TT';

export default function Notice() {
  // const [mode, setMode] = useState(false);
  // useEffect(() => {
  //   window.localStorage.setItem('card', mode);
  // }, [mode]);
  // useEffect(() => {
  //   initMode();
  // }, []);
  // const initMode = () => {
  //   const m = window.localStorage.getItem('card');
  //   if (mode != null) setCard(m);
  // };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {/* <TT card={mode} setCard={setMode} /> */}
        <TT />
      </Box>
    </>
  );
}
