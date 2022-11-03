import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { blue, red } from "@mui/material/colors";

export default function ApplyButton() {
  const [open, setOpen] = React.useState(false);
  const [apply, setApply] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickApply = () => {
    setApply(true);
  };

  return (
    <div>
      {apply ? (
        <Button disabled="true" variant="outlined" onClick={handleClickOpen}>
          신청완료
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          신청
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: 20, width: 300, textAlign: "center" }}
        >
          {`신청하시겠습니까? `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus sx={{ color: red[500] }}>
            취소
          </Button>
          <Button
            onClick={() => {
              handleClose();
              clickApply();
            }}
            sx={{ color: blue[900] }}
          >
            신청
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
