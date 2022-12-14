import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSemesters,
  getActivity,
  editActivity,
  getTags,
} from "../../api/activity";

const data = {
  title: "활동 이름",
  start: "2022.11.20",
  end: "-",
  text1: "추가 정보 1",
  text2: "추가 정보 2",
  newImgFile: "",
  newImgDir: "",
};

export default function ActivityEdit() {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [newImgFile, setNewImgFile] = useState(data.newImgFile);
  const [newImgDir, setNewImgDir] = useState(data.newImgDir);
  const [dateState, setDateState] = useState(true);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [jsonList, setJsonList] = useState([]);
  const [activity, setActivity] = useState([]);

  const listActivity = async (activityId) => {
    const activity = await getActivity(activityId);
    setActivity(activity);
    const json = JSON.parse(activity.data);
    setJsonList(json);
  };

  useEffect(() => {
    listActivity(activityId);
    getSemesters().then((data) => {
      setSemesters(data);
    });
    getTags().then((data) => {
      setSections(data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    reset(activity);
  }, [activity]);

  const editData = (id, param, type, e) => {
    const fieldData = e.currentTarget.value ? e.currentTarget.value : "";
    setJsonList((old) =>
      old.map((item) => (item.id === id ? { ...item, data: fieldData } : item))
    );
  };

  const onValid = async (formData) => {
    const final = _.uniqBy(jsonList.reverse(), "id");
    final.sort((d1, d2) => {
      return d1.id - d2.id;
    });

    formData.data = JSON.stringify(final);
    await editActivity(activityId, formData);
    navigate("/activity");
    enqueueSnackbar("수정되었습니다.", { variant: "success" });
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
        width={"calc(60vw)"}
        minHeight={600}
        p={3}
        borderRadius={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        boxShadow={24}
      >
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography sx={{ fontWeight: "600", fontSize: "1.1rem", pb: 3 }}>
              활동 수정
            </Typography>
          </Box>
          <Box maxHeight={400} overflow="scroll">
            <Box display={"flex"} gap={2}>
              <InputLabel sx={{ mt: 1 }}>학기</InputLabel>
              <FormControl sx={{ minWidth: 120, m: 1 }} size="small">
                <NativeSelect
                  labelId="demo-select-small"
                  id="demo-select-small"
                  defaultValue={activity.semester}
                  {...register("semester", { required: "필수 항목입니다." })}
                >
                  {semesters.map((semester) => (
                    <option value={semester.semester} key={semester.semester}>
                      {semester.semester}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <InputLabel sx={{ mt: 1, ml: 5 }}>카테고리</InputLabel>
              <FormControl sx={{ minWidth: 120, m: 1 }} size="small">
                <NativeSelect
                  labelId="demo-select-small"
                  id="demo-select-small"
                  defaultValue={activity.section}
                  {...register("section", { required: "필수 항목입니다." })}
                >
                  {sections.map((section) => (
                    <option value={section} key={section}>
                      {section}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <InputLabel sx={{ mt: 1 }}>제목</InputLabel>
            <TextField
              color="secondary"
              InputProps={{ disableUnderline: true }}
              fullWidth
              hiddenLabel
              variant="filled"
              size="small"
              sx={{ mb: 1 }}
              {...register("name", {
                required: "필수 항목입니다.",
              })}
            />
            {activity.data ? (
              <>
                {jsonList.map((item) => (
                  <Box key={item.id}>
                    {item.type === "image" ? (
                      <>
                        <InputLabel sx={{ mt: 1 }}>{item.field}</InputLabel>
                        <img src={item.data}></img>
                      </>
                    ) : (
                      <>
                        <InputLabel sx={{ mt: 1 }}>{item.field}</InputLabel>
                        <TextField
                          color="secondary"
                          InputProps={{ disableUnderline: true }}
                          fullWidth
                          hiddenLabel
                          variant="filled"
                          size="small"
                          value={item.data}
                          sx={{ mb: 1 }}
                          onChange={(e) => {
                            editData(item.id, item.data, "text", e);
                          }}
                        />
                      </>
                    )}
                  </Box>
                ))}
              </>
            ) : (
              ""
            )}
            {activity.remark ? (
              <>
                <InputLabel sx={{ mt: 1 }}>비고</InputLabel>
                <TextField
                  color="secondary"
                  InputProps={{ disableUnderline: true }}
                  fullWidth
                  hiddenLabel
                  variant="filled"
                  size="small"
                  value={activity.remark}
                  sx={{ mb: 1 }}
                  {...register("remark")}
                />
              </>
            ) : (
              <></>
            )}

            {/* <InputLabel sx={{ mt: 1 }}>이미지 (option)</InputLabel>
          <Box display="flex" mt={1}>
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
                등록된 이미지가 없습니다.
              </Box>
            )}
          </Box> */}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Box display="flex" gap={1.5}>
            <Button
              color="secondary"
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
                onClick={handleSubmit(onValid)}
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
