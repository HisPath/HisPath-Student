import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
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
import AWS from "aws-sdk";
import { getSemesters } from "../../../api/activity";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { addActivity } from "../../../api/activity";

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

function TextInput({ id, name, addData }) {
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
        onChange={(e) => {
          addData(id, name, "text", e);
        }}
      />
    </Box>
  );
}

function LinkInput({ id, name, addData }) {
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
        onChange={(e) => {
          addData(id, name, "link", e);
        }}
      />
    </Box>
  );
}

function ImageInput({ id, name, addImage }) {
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

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  });
  const uploadBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_S3_REGION,
  });

  const handleFileInput = (e) => {
    uploadFile(e.target.files[0]);
    addImage(
      id,
      name,
      "image",
      `${process.env.REACT_APP_S3_STORAGE}/activity-${id}/${e.target.files[0].name}`
    );
  };
  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: `upload/activity-${id}/` + file.name,
      ContentType: "image/jpeg",
    };

    uploadBucket
      .putObject(params)
      .on("httpUploadProgress", (event) => {})
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
        <InputLabel sx={{ mt: 1 }}>{name}</InputLabel>
        <Box display="flex" mt={1}>
          <Button
            component="label"
            color="secondary"
            variant="contained"
            sx={{ height: 36.5 }}
            onChange={handleFileInput}
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

function DateInput({ id, name, addData }) {
  return (
    <>
      <Box display="flex" gap={4}>
        <Box width="calc(20vw)">
          <InputLabel sx={{ mt: 1 }}>{name}</InputLabel>
          <TextField
            color="secondary"
            InputProps={{ disableUnderline: true }}
            fullWidth
            hiddenLabel
            variant="filled"
            size="small"
            type="date"
            onChange={(e) => {
              addData(id, name, "date", e);
            }}
          />
        </Box>
        {/* <Box width="calc(20vw)">
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
        </Box> */}
      </Box>
    </>
  );
}

export default function ActivityAdd({ getActivities }) {
  const { enqueueSnackbar } = useSnackbar();
  const [textField, setTextField] = useState([]);
  // const [imageField, setImageField] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState(0);
  const [open, setOpen] = useState(false); // dialog
  const [semesters, setSemesters] = useState([]);
  //   const [json, setJson] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  const addData = (id, param, type, e) => {
    const fieldData = e.currentTarget.value ? e.currentTarget.value : "";

    setJsonData((old) => {
      return [
        ...old,
        {
          id: id,
          field: param,
          type: type,
          data: fieldData,
        },
      ];
    });
  };

  const addImage = (id, param, type, url) => {
    setJsonData((old) => {
      return [
        ...old,
        {
          id: id,
          field: param,
          type: type,
          data: url,
        },
      ];
    });
  };

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

  // const addActivity = async (formdata) => {
  //   await axios.post("http://localhost:8080/api/student-activity/1", {
  //     ...formdata,
  //     section: "외국어",
  //   });
  // };

  const onValid = (formData) => {
    const final = _.uniqBy(jsonData.reverse(), "id");
    final.sort((d1, d2) => {
      return d1.id - d2.id;
    });

    formData.data = JSON.stringify(final);
    addActivity(formData, "외국어");
    window.location.reload();
    // getActivities();
    handleCloseAdd();
    enqueueSnackbar("추가되었습니다.", { variant: "success" });
  };

  const onRemove = (removeId) => {
    _.remove(jsonData, function (n) {
      if (n.id === removeId) {
        return true;
      }
    });
    setJsonData(jsonData);

    setTextField((old) => old.filter((item) => item.id !== removeId));
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
              <TextInput id={id} name={name} addData={addData} />
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
              <LinkInput id={id} name={name} addData={addData} />
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
              <ImageInput name={name} id={id} addImage={addImage} />{" "}
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
              <DateInput id={id} name={name} addData={addData} />
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
      <AddIcon fontSize="sm" color="secondary" onClick={handleOpenAdd} />
      {/* <Button
        sx={{
          backgroundColor: "secondary.main",
          fontWeight: "600",
          pl: 3,
          pr: 3,
        }}
        variant="contained"
        onClick={handleOpenAdd}
      >
        활동 추가
      </Button> */}

      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography sx={{ fontWeight: "600", fontSize: "1.1rem", pb: 1 }}>
              어학 사항 추가
            </Typography>
          </Box>
          <Alert severity="info" sx={{ mb: 1 }}>
            TOEFL, TOEIC, TEPS, IELTS, etc.
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
            <InputLabel sx={{ mt: 1 }}>시험 종류</InputLabel>
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              {...register("name", {
                required: "필수 항목입니다.",
              })}
              size="small"
            />
            <InputLabel sx={{ mt: 1 }}>취득일</InputLabel>
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              onChange={(e) => addData("취득일", "취득일", "date", e)}
              // {...register("data", {
              //   required: "필수 항목입니다.",
              // })}
              size="small"
              type={"date"}
            />
            <InputLabel sx={{ mt: 1 }}>점수</InputLabel>
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              onChange={(e) => addData("점수", "점수", "text", e)}
              size="small"
            />
            {textField.map((item) => (
              <Box key={item.id}>{item.component}</Box>
            ))}
          </Box>
          <Divider sx={{ mt: "auto" }} />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button color="secondary" sx={{ gap: 1 }} onClick={handleClickOpen}>
              <AddIcon />
              항목 추가
            </Button>

            <Box display="flex" gap={1.5}>
              <Button
                onClick={handleCloseAdd}
                color="secondary"
                variant="outlined"
                sx={{ fontWeight: "600" }}
              >
                취소
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{ fontWeight: "600" }}
                onClick={handleSubmit(onValid)}
              >
                추가
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={itemHandleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box display={"flex"} alignItems={"center"} pt={3}>
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
    </>
  );
}
