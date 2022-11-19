import { useEffect, useState } from 'react';
import {
  Select as MUISelect,
  Button as MUIButton,
  Paper,
  Modal as MUIModal,
  Box,
  Typography,
} from '@mui/material';
import ForceNoticeList from './ForceNoticeList';
import Post from './ModalPost';

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
const postModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 3,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

function Modal({ open, handleClose, openPost, handlePostOpen, handlePostClose }) {
  const [targetId, setTargetId] = useState(-1);

  useEffect(() => {
    if (targetId != -1) handlePostOpen();
  }, [targetId]);

  return (
    <Box container>
      <MUIModal open={open} onClose={handleClose}>
        <Box component={Paper} sx={modalStyle}>
          <ForceNoticeList setId={setTargetId} />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <MUIButton color="secondary" onClick={handleClose}>
              확인
            </MUIButton>
          </Box>
        </Box>
      </MUIModal>
      <MUIModal open={openPost} onClose={handlePostClose}>
        <Box component={Paper} sx={postModalStyle}>
          <Post modalId={targetId} />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <MUIButton color="secondary" onClick={handlePostClose}>
              확인
            </MUIButton>
          </Box>
        </Box>
      </MUIModal>
    </Box>
  );
}
function ForceNotice() {
  const checkUnread = () => {
    let count = 0;
    let view = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key.includes('IMP')) {
        const today = new Date();
        const obj = JSON.parse(window.localStorage.getItem(key));
        if (obj.expire < today) window.localStorage.removeItem(key);
        else {
          count = count + 1;
          if (obj.viewed === true) view = view + 1;
        }
      }
    }
    if (count == 0) return true;
    else if (count === view) return false;
    else return true;
  };
  const [open, setOpen] = useState(checkUnread);
  const [openpost, setOpenpost] = useState(false);

  return (
    <Modal
      open={open}
      handleClose={() => setOpen(false)}
      openPost={openpost}
      handlePostOpen={() => setOpenpost(true)}
      handlePostClose={() => setOpenpost(false)}
    />
  );
}
export default ForceNotice;
