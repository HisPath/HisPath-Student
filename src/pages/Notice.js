import { Box } from '@mui/material';
import TT from '../components/Notice/TT';

export default function Notice() {
  return (
    <>
      <Box maxWidth="xl" sx={{ display: 'flex' }}>
        <TT />
      </Box>
    </>
  );
}
