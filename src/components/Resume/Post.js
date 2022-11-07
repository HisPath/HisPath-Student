import {
  Avatar,
  Box,
  Button,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CategoryFieldArray from "./CategoryFieldArray";
import CategoryModal from "./CategoryModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blueGrey } from "@mui/material/colors";
import axios from "axios";
import { postResume } from "../../api/resume";

function Post() {
  const [info, setInfo] = useState([]);
  const getInfo = async () => {
    const info = await axios.get("http://localhost:8080/api/student/1");
    setInfo(info.data);
  };
  useEffect(() => {
    getInfo();
  }, []);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([
    "경력",
    "학력",
    "기술",
    "자격증",
    "수상",
    "외국어",
    "링크",
    "기타",
  ]);
  const [resume, setResume] = useState([]);
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { title: "이력서" } });
  const { move } = useFieldArray({
    control,
    name: `content`,
  });
  const onValid = (data) => {
    postResume({ ...data, content: JSON.stringify(data.content) });
    navigate("..");
  };
  const onInvalid = () => {
    enqueueSnackbar("모든 칸을 채워 주세요.", { variant: "error" });
  };
  return (
    <Box sx={{ position: "fixed", width: 1, height: 1, top: 0 }}>
      <Box sx={{ display: "flex", height: 1 }}>
        <Box
          maxWidth="sm"
          sx={{
            px: 2,
            width: 1,
            backgroundColor: "background.default",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "background.default",
              zIndex: "appBar",
              mb: 2,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit(onValid, onInvalid)}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => navigate("..")}
                startIcon={<ArrowBackIcon />}
              >
                이전
              </Button>
              <Box sx={{ display: "flex", gap: 1 }}>
                <CategoryModal {...{ categories, setCategories, move }} />
                <Button variant="contained" type="submit">
                  저장
                </Button>
              </Box>
            </Box>
            <Divider />
          </Box>
          <Box>
            <Box sx={{ p: 2 }}>
              <InputLabel>이력서 제목</InputLabel>
              <TextField variant="standard" {...register("title")} />
            </Box>
            {categories.map((category, categoryIndex) => (
              <CategoryFieldArray
                key={category}
                category={category}
                categoryIndex={categoryIndex}
                {...{ register, watch, control, errors }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "center",
            backgroundColor: blueGrey[600],
            p: 4,
          }}
        >
          <Box
            sx={{
              width: 720,
              backgroundColor: "background.paper",
              height: 1,
              borderRadius: 2,
              p: 5,
              overflow: "auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Typography variant="h4" component="h1">
                {watch("title")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, mb: 5 }}>
              <Avatar
                alt={info.name}
                src={info.profile}
                sx={{ width: 100, height: 100, mx: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  m: 1,
                }}
              >
                <Typography>{info.name}</Typography>
                <Typography>{info.departmentName}</Typography>
                <Typography>{info.email}</Typography>
              </Box>
            </Box>
            {watch("content")?.map((item, index) => (
              <Box key={index} mb={4}>
                {item.data.length !== 0 && (
                  <>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {categories[index]}
                    </Typography>
                    <Box mb={2}>
                      {watch(`content[${index}].data`).map(
                        (data, dataIndex) => (
                          <Box key={dataIndex} p={1} py={0.5}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                mb: 0.5,
                              }}
                            >
                              <Typography variant="h6" component="h3">
                                {data.title}
                              </Typography>
                              {data.hasDate && (
                                <Typography variant="caption">
                                  {data.startDate === data.endDate
                                    ? data.startDate
                                    : `${data.startDate} ~ ${
                                        data.endDate || "현재"
                                      }`}
                                </Typography>
                              )}
                            </Box>
                            <Typography p={1} pt={0}>
                              {data.description
                                .split("\n")
                                .map((line, index) => {
                                  return (
                                    <span key={index}>
                                      {line}
                                      <br />
                                    </span>
                                  );
                                })}
                            </Typography>
                          </Box>
                        )
                      )}
                      <Divider />
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Post;
