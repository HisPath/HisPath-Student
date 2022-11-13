import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  Switch,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ActivityAdd() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [newImgFile, setNewImgFile] = useState(null);
  const [newImgDir, setNewImgDir] = useState(null);
  const [dateState, setDateState] = useState(true);
  const [open, setOpen] = React.useState(false); // dialog

  const onChangeChooseImg = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setNewImgDir(fileReader.result);
    };
    const { files } = event.target;
    setNewImgFile(files ? files[0] : null);
    if (files) fileReader.readAsDataURL(files[0]);
  };

  // dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //dialog
  const handleClose = (e) => {
    setOpen(false);
    setName(e.target.value);
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      name: "",
      type: "text",
    });
  };

  return (
    <Box
      sx={{
        height: "calc(90vh)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={Paper}
        width={500}
        minHeight={600}
        p={3}
        borderRadius={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography sx={{ fontWeight: "600", fontSize: "1.1rem", pb: 3 }}>
              활동 수정
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2">날짜 입력</Typography>
              <Switch
                defaultChecked
                color="secondary"
                onClick={() => setDateState((old) => !old)}
              />
            </Box>
          </Box>
          <InputLabel sx={{ mt: 1 }}>제목</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
          />
          {dateState && (
            <Box display="flex" gap={2}>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>시작일</InputLabel>
                <TextField
                  color="secondary"
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                  type="date"
                />
              </Box>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>종료일</InputLabel>
                <TextField
                  color="secondary"
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                  type="date"
                />
              </Box>
            </Box>
          )}

          <InputLabel sx={{ mt: 1 }}>텍스트1 (option)</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
          />
          <InputLabel sx={{ mt: 1 }}>텍스트2 (option)</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            // multiline
          />
          <InputLabel sx={{ mt: 1 }}>이미지 (option)</InputLabel>
          <Box display="flex" mt={1}>
            <Button
              component="label"
              color="secondary"
              variant="contained"
              sx={{ height: 36.5 }}
            >
              파일 선택
              <input
                type="file"
                accept="image/x-png, image/gif, image/jpeg"
                onChange={onChangeChooseImg}
                hidden
              />
            </Button>
            {newImgDir ? (
              <Box
                ml={2}
                component="img"
                alt="newImg"
                src={typeof newImgDir === "string" ? newImgDir : undefined}
                sx={{ width: "auto", height: 100 }}
              />
            ) : (
              <Box display="inline" ml={2} mt={0.5}>
                이미지를 선택하세요
              </Box>
            )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button color="secondary" sx={{ gap: 1 }} onClick={handleClickOpen}>
            <AddIcon />
            필드 추가
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Box display={"flex"} alignItems={"center"}>
                    <Typography sx={{ pr: 2, color: "#222222" }}>
                      필드 이름
                    </Typography>
                    <TextField
                      size="small"
                      sx={{ width: 240 }}
                      value={name}
                    ></TextField>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} sx={{ mt: 2 }}>
                    <Typography sx={{ pr: 2.5, color: "#222222" }} value={type}>
                      필드 유형
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="text"
                      >
                        <FormControlLabel
                          value="text"
                          control={<Radio />}
                          label="텍스트"
                        />
                        <FormControlLabel
                          value="link"
                          control={<Radio />}
                          label="링크"
                        />
                        <FormControlLabel
                          value="image"
                          control={<Radio />}
                          label="이미지"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} sx={{ fontWeight: 600 }}>
                  취소
                </Button>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  sx={{ fontWeight: 600 }}
                  variant={"contained"}
                  autoFocus
                  type="submit"
                >
                  필드 추가
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Box display="flex" gap={1.5}>
            <Button
              variant="outlined"
              sx={{ fontWeight: "600" }}
              onClick={() => {
                window.history.back();
              }}
            >
              취소
            </Button>
            <Link to={`/activity`} style={{ textDecoration: "none" }}>
              <Button
                color="secondary"
                variant="contained"
                sx={{ fontWeight: "600" }}
              >
                수정
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
