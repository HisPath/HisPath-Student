import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CategoryFieldArray from "./CategoryFieldArray";
import CategoryModal from "./CategoryModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Post() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([
    "이력",
    "교육",
    "프로젝트",
    "언어",
  ]);
  const [resume, setResume] = useState([]);
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { move } = useFieldArray({
    control,
    name: `contents`,
  });
  const onValid = (data) => {
    alert(JSON.stringify(data));
    setResume((old) => [...old, data]);
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
            overflow: "scroll",
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
            backgroundColor: "background.paper",
            overflow: "scroll",
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", p: 3, pb: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              이력서
            </Typography>
          </Box>
          {watch("contents")?.map((item, index) => (
            <Box key={index} mb={4}>
              {item.data.length !== 0 && (
                <>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {categories[index]}
                  </Typography>
                  <Box mb={2}>
                    {watch(`contents[${index}].data`).map((data, dataIndex) => (
                      <Box key={dataIndex} p={1}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {data.title}
                        </Typography>
                        <Typography p={1} pt={0}>
                          {data.description.split("\n").map((line, index) => {
                            return (
                              <span key={index}>
                                {line}
                                <br />
                              </span>
                            );
                          })}
                        </Typography>
                      </Box>
                    ))}
                    <Divider />
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Post;
