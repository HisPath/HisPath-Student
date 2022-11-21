import {
  Avatar,
  Box,
  Button,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import CategoryFieldArray from "./CategoryFieldArray";
import CategoryModal from "./CategoryModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { green } from "@mui/material/colors";
import {
  deleteResume,
  getInfo,
  getResumeByResumeId,
  putResume,
} from "../../api/resume";

function Edit({ refresh }) {
  const { resumeId } = useParams();
  const [info, setInfo] = useState([]);
  const [resume, setResume] = useState();
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
  useEffect(() => {
    getInfo().then((data) => setInfo(data));
    getResumeByResumeId(resumeId).then((data) => {
      const { categories, dataList } = JSON.parse(data.content);
      setCategories(categories);
      setResume({ title: data.title, content: dataList });
    });
  }, []);
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return resume;
    }, [resume]),
  });
  const { move, remove } = useFieldArray({
    control,
    name: `content`,
  });
  const onValid = async (data) => {
    await putResume(resumeId, {
      title: data.title,
      content: JSON.stringify({
        dataList: data.content,
        categories: categories,
      }),
    });
    refresh();
    navigate("..");
    enqueueSnackbar("저장되었습니다.", { variant: "success" });
  };
  const onInvalid = () => {
    enqueueSnackbar("모든 칸을 채워 주세요.", { variant: "error" });
  };
  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await deleteResume(resumeId);
      refresh();
      navigate("..");
      enqueueSnackbar("삭제되었습니다.", { variant: "success" });
    }
  };
  useEffect(() => {
    reset(resume);
  }, [resume]);
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
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Button
                onClick={() => navigate("..")}
                startIcon={<ArrowBackIcon />}
              >
                이전
              </Button>
              <Box sx={{ display: "flex", gap: 1 }}>
                <CategoryModal
                  {...{ categories, setCategories, move, remove }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
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
            backgroundColor: green[100],
            p: 4,
          }}
        >
          <Box
            sx={{
              width: 720,
              backgroundColor: "background.paper",
              height: 1,
              borderRadius: 1,
              overflow: "auto",
              display: "flex",
              gap: 1,
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: green[800],
                color: "white",
                p: 5,
                width: 220,
              }}
            >
              <Avatar
                alt={info.name}
                src={info.profile}
                sx={{ width: 100, height: 100, mb: 3 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  m: 1,
                }}
              >
                <Typography variant="h4">{info.studentName}</Typography>
                <Typography fontWeight={600}>{info.departmentName}</Typography>
                <Typography fontWeight={600}>{info.email}</Typography>
              </Box>
            </Box>
            <Box sx={{ p: 5, width: 1 }}>
              <Typography variant="h4" component="h1" mb={3}>
                {watch("title")}
              </Typography>
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
    </Box>
  );
}

export default Edit;
