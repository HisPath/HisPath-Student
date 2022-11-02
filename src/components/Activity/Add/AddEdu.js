import React, { useEffect } from "react";
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
  Modal,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getActivities, getSemesters } from "../../../api/activity";
import { useForm } from "react-hook-form";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

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

export default function AddEdu() {
  const { enqueueSnackbar } = useSnackbar();
  const [textField, setTextField] = useState([]);
  // const [imageField, setImageField] = useState([]);
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState(0);
  const [open, setOpen] = useState(false); // dialog
  const [semesters, setSemesters] = useState([]);
  const [json, setJson] = useState("");

  useEffect(() => {
    getSemesters().then((data) => {
      setSemesters(data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addActivity = async (data) => {
    await axios.post("http://localhost:8080/api/student-activity/1", {
      ...data,
      section: "과정",
      data: json,
    });
  };

  const setAgency = (event) => {
    setJson(JSON.stringify({ agency: event.target.value }));
  };

  const onValid = (data) => {
    console.log(data);
    addActivity(data);
    getActivities();
    handleCloseAdd();
    enqueueSnackbar("추가되었습니다.", { variant: "success" });
  };

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

  const itemHandleSubmit = (event) => {
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
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <Box>
        <AddIcon fontSize="sm" color="secondary" onClick={handleOpenAdd} />{" "}
      </Box>
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={style}>
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ fontWeight: "600", fontSize: "1.1rem", pb: 1 }}>
                교육과정 추가
              </Typography>
            </Box>
            <Alert severity="info" sx={{ mb: 1 }}>
              교육과정에는 지금까지 수료했던 교육과정을 모두 추가할 수 있습니다!
              <br />
              마이크로디그리, 스마트 IoT 트랙, 인공지능 인증 등이 있습니다.
            </Alert>
            <Box maxHeight={450} overflow="auto" pb={1}>
              <InputLabel sx={{ mt: 1 }}>학기</InputLabel>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  {...register("semester", { required: "필수 항목입니다." })}
                  // value={}
                >
                  {semesters.map((semester) => (
                    <MenuItem value={semester.semester} key={semester.semester}>
                      {semester.semester}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <InputLabel sx={{ mt: 1 }}>교육과정 이름</InputLabel>
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                {...register("name", { required: "필수 항목입니다." })}
              />
              <InputLabel sx={{ mt: 1 }}>기관 이름</InputLabel>
              <TextField
                color="secondary"
                InputProps={{ disableUnderline: true }}
                fullWidth
                hiddenLabel
                variant="filled"
                size="small"
                onClick={setAgency}
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
              <form onSubmit={itemHandleSubmit}>
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
                      <Typography
                        sx={{ pr: 2.5, color: "#222222" }}
                        value={type}
                      >
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
                  onClick={handleCloseAdd}
                >
                  취소
                </Button>
              </Link>
              <Link to={`/activity`} style={{ textDecoration: "none" }}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ fontWeight: "600" }}
                  onClick={handleSubmit(onValid)}
                >
                  추가
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}