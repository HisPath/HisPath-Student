import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { blue, red } from "@mui/material/colors";
import axios from "axios";
import { useEffect } from "react";

export default function ApplyButton(props) {
  const [open, setOpen] = React.useState(false);

  const applyMyActivity = async (id) => {
    const category = await axios.put(
      `http://localhost:8080/api/activity/apply/${id}`
    );

    window.location.replace("./mileage");
  };

  // useEffect(() => {
  //   applyMyActivity(props.id);
  // }, []);

  // prop에는 activity id 랑 requestStatus가 들어와야 함.
  // console.log("id : " + props.id);
  // console.log("requestStatus : " + props.requestStatus);
  // 산청 버튼을 눌었을 때 DB가 반영되는 함수 실행
  // refresh
  // requestStatus 값에 따라서 버튼 UI 다르게

  let cond;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickApply = (id) => {
    // props.setApply(true);
    applyMyActivity(id);
  };

  // console.log("props : " + props.test);
  return (
    <div>
      {props.requestStatus !== 3 ? (
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
              clickApply(props.id);
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
