import { useState } from 'react';
import {
  Select as MUISelect,
  Button as MUIButton,
  Paper,
  Modal as MUIModal,
  Box,
  Typography,
} from '@mui/material';
import ForceNoticeList from './ForceNoticeList';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 3,
  borderRadius: 4,
  width: 500,
  minHeight: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

function Modal({ open, handleClose }) {
  return (
    <MUIModal open={open} onClose={handleClose}>
      <Box component={Paper} sx={modalStyle}>
        <ForceNoticeList />
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <MUIButton color="secondary" onClick={handleClose}>
            취소
          </MUIButton>
          <MUIButton color="secondary" type="submit" variant="contained">
            저장
          </MUIButton>
        </Box>
      </Box>
    </MUIModal>
  );
}

function ForceNotice() {
  const [open, setOpen] = useState(true);
  return <Modal open={open} handleClose={() => setOpen(false)} />;
}
export default ForceNotice;
