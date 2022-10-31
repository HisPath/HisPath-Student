import { Box, Button, InputLabel, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const data = {
  title: "활동 이름",
  start: "2022.11.20",
  end: "-",
  text1: "추가 정보 1",
  text2: "추가 정보 2",
  newImgFile: "",
  newImgDir: "",
};

export default function ActivityDetail() {
  const [newImgFile, setNewImgFile] = useState(data.newImgFile);
  const [newImgDir, setNewImgDir] = useState(data.newImgDir);
  const [dateState, setDateState] = useState(true);

  const [activity, setActivity] = React.useState([]);

  const getActivity = async () => {
    const activity = await axios.get("http://localhost:8080/api/activity/15");
    console.log(activity.data);
    setActivity(activity.data);
  };

  useEffect(() => {
    getActivity();
  }, []);

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
              활동 상세
            </Typography>
          </Box>

          {/* {dateState && (
            <Box display="flex" gap={2}>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>카테고리</InputLabel>
                <Typography sx={{ p: 2 }}>{activity.categoryName}</Typography>
              </Box>
              <Box width="50%">
                <InputLabel sx={{ mt: 1 }}>종료일</InputLabel>
                <Typography sx={{ p: 2 }}>{data.end}</Typography>
              </Box>
            </Box>
          )} */}

          <InputLabel sx={{ mt: 1 }}>학기</InputLabel>
          <Typography sx={{ p: 2 }}>{activity.semester}</Typography>
          <Box>
            <InputLabel sx={{ mt: 1 }}>카테고리</InputLabel>
            <Typography sx={{ p: 2 }}>{activity.categoryName}</Typography>
          </Box>
          <InputLabel sx={{ mt: 1 }}>제목</InputLabel>
          <Typography sx={{ p: 2 }}>{activity.name}</Typography>
          <InputLabel sx={{ mt: 1 }}>마일리지 인정 여부</InputLabel>
          <Typography sx={{ p: 2 }}>
            {activity.personal ? "마일리지 인정 활동" : "마일리지 미인정 활동"}
          </Typography>
          {activity.remark ? (
            <>
              <InputLabel sx={{ mt: 1 }}>비고</InputLabel>
              <Typography sx={{ p: 2 }}>{activity.remark}</Typography>
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
        <Box display="flex" justifyContent="flex-end" mt={3}>
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
            <Link to={`/activity/edit`} style={{ textDecoration: "none" }}>
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
