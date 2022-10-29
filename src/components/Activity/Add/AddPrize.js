import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
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
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

function TextInput({ name }) {
  return (
    <Box mt={1} width={"calc(47vw)"}>
      <InputLabel>{name}</InputLabel>
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
    <Box mt={1} width={"calc(47vw)"}>
      <InputLabel>{name}</InputLabel>
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
      <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
        <InputLabel sx={{ mt: 1 }}>{name}</InputLabel>
        {/* <DeleteIcon fontSize="small" /> */}
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
    </>
  );
}

function DateInput() {
  return (
    <>
      <Box display="flex" gap={4}>
        <Box width="calc(20vw)">
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
        <Box width="calc(20vw)">
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
    </>
  );
}

export default function AddPrize() {
  const [textField, setTextField] = useState([]);
  // const [imageField, setImageField] = useState([]);
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState(0);
  const [open, setOpen] = React.useState(false); // dialog

  const onRemove = (id) => {
    setTextField((old) => old.filter((item) => item.id !== id));
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
    const id = Date.now();
    if (type === 0)
      setTextField((old) => [
        ...old,
        {
          id,
          component: (
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <TextInput name={name} />
              <DeleteIcon
                sx={{ mt: 3 }}
                fontSize="small"
                onClick={() => onRemove(id)}
              />
            </Box>
          ),
        },
      ]);
    else if (type === 1)
      setTextField((old) => [
        ...old,
        {
          id,
          component: (
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <LinkInput name={name} />
              <DeleteIcon
                sx={{ mt: 3 }}
                fontSize="small"
                onClick={() => onRemove(id)}
              />
            </Box>
          ),
        },
      ]);
    else if (type === 2)
      setTextField((old) => [
        ...old,
        {
          id,
          component: (
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <ImageInput name={name} />
              <DeleteIcon
                sx={{ mt: 3 }}
                fontSize="small"
                onClick={() => onRemove(id)}
              />
            </Box>
          ),
        },
      ]);
    else if (type === 3)
      setTextField((old) => [
        ...old,
        {
          id,
          component: (
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <DateInput />
              <DeleteIcon
                sx={{ mt: 3 }}
                fontSize="small"
                onClick={() => onRemove(id)}
              />
            </Box>
          ),
        },
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
        width={"calc(50vw)"}
        minHeight={"calc(50vh)"}
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
            <Typography sx={{ fontWeight: "600", fontSize: "1.1rem", pb: 1 }}>
              수상 추가
            </Typography>
          </Box>
          <Alert severity="info" sx={{ mb: 1 }}>
            수상 정보에 관련해서 추가적으로 입력하고 싶은 내용이 있다면, 항목
            추가를 활용하세요!
          </Alert>
          <Box maxHeight={450} overflow="auto" pb={1}>
            <InputLabel sx={{ mt: 1 }}>수상명</InputLabel>
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
            <Box>
              <InputLabel sx={{ mt: 1 }}>수상일</InputLabel>
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
            <InputLabel sx={{ mt: 1 }}>수상기관</InputLabel>
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
            />
            {textField.map((item) => (
              <Box key={item.id}>{item.component}</Box>
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
                      hiddenLabel
                      variant="outlined"
                      size="small"
                      sx={{ width: "calc(20vw)" }}
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
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label="날짜"
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
