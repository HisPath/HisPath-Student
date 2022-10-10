import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

function TextInput({ name }) {
  // const onRemove = (id) => {
  //   setTextField(users.filter((user) => user.id !== id));
  // };

  return (
    <Box>
      {/* <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      > */}
      <InputLabel sx={{ mt: 1, width: 420 }}>{name}</InputLabel>
      {/* <DeleteIcon fontSize="small" />
      </Box> */}

      <TextField
        color="secondary"
        InputProps={{ disableUnderline: true }}
        fullWidth
        hiddenLabel
        variant="filled"
        size="small"
      />
    </Box>
  );
}

function LinkInput({ name }) {
  return (
    <Box display="flex" mt={1} gap={2}>
      <Box width={150}>
        <InputLabel>{name}</InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true }}
          hiddenLabel
          variant="filled"
          size="small"
        />
      </Box>
      <Box width={260}>
        <InputLabel>URL</InputLabel>
        <TextField
          color="secondary"
          InputProps={{ disableUnderline: true }}
          fullWidth
          hiddenLabel
          variant="filled"
          size="small"
        />
      </Box>
    </Box>
  );
}

function ImageInput({ name }) {
  const [newImgFile, setNewImgFile] = useState(null);
  const [newImgDir, setNewImgDir] = useState(null);

  const onChangeChooseImg = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setNewImgDir(fileReader.result);
    };
    const { files } = event.target;
    setNewImgFile(files ? files[0] : null);
    if (files) fileReader.readAsDataURL(files[0]);
  };

  return (
    <>
      {/* <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"flex-end"}
      > */}
      <InputLabel sx={{ mt: 1 }}>{name}</InputLabel>
      {/* <DeleteIcon fontSize="small" /> */}
      {/* </Box> */}

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
    </>
  );
}

export default function ActivityAdd() {
  const [textField, setTextField] = useState([]);
  // const [imageField, setImageField] = useState([]);
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState(0);

  const [dateState, setDateState] = useState(true);
  const [open, setOpen] = React.useState(false); // dialog

  const onRemove = (event) => {
    console.log(name);
    setTextField(textField.filter((name) => textField.name !== name));
  };

  // dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //dialog
  const handleClose = (e) => {
    setOpen(false);
  };

  const onChangeFieldName = (e) => {
    setName(e.currentTarget.value);
  };

  const onChangeType = (e) => {
    setType(+e.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(type);
    if (type === 0)
      setTextField((old) => [
        ...old,
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <TextInput name={name} />
          <DeleteIcon fontSize="small" onClick={() => onRemove(name)} />
        </Box>,
      ]);
    else if (type === 1)
      setTextField((old) => [
        ...old,
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <LinkInput name={name} />
          <DeleteIcon fontSize="small" onClick={() => onRemove(name)} />
        </Box>,
      ]);
    else if (type === 2)
      setTextField((old) => [
        ...old,
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <ImageInput name={name} />
          <DeleteIcon fontSize="small" onClick={() => onRemove(name)} />
        </Box>,
      ]);
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
              활동 추가
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
          <Box maxHeight={450} overflow="auto" pb={1}>
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
            {textField.map((item, index) => (
              <Box key={index}>{item}</Box>
            ))}
          </Box>
        </Box>
        <Divider sx={{ mt: "auto" }} />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button color="secondary" sx={{ gap: 1 }} onClick={handleClickOpen}>
            <AddIcon />
            항목 추가
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
                      항목 이름
                    </Typography>
                    <TextField
                      color="secondary"
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      hiddenLabel
                      variant="outlined"
                      size="small"
                      sx={{ width: 240 }}
                      onChange={onChangeFieldName}
                    />
                  </Box>
                  <Box display={"flex"} alignItems={"center"} sx={{ mt: 2 }}>
                    <Typography sx={{ pr: 2.5, color: "#222222" }} value={type}>
                      항목 유형
                    </Typography>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={0}
                      onChange={onChangeType}
                    >
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="텍스트"
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="링크"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="이미지"
                      />
                    </RadioGroup>
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
                  항목 추가
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Box display="flex" gap={1.5}>
            <Link to={`/activity`} style={{ textDecoration: "none" }}>
              <Button
                color="secondary"
                variant="outlined"
                sx={{ fontWeight: "600" }}
              >
                취소
              </Button>
            </Link>
            <Link to={`/activity`} style={{ textDecoration: "none" }}>
              <Button
                color="secondary"
                variant="contained"
                sx={{ fontWeight: "600" }}
              >
                추가
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
