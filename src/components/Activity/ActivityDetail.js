import { Box, Button, InputLabel, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  const { activityId } = useParams();

  const [newImgFile, setNewImgFile] = useState(data.newImgFile);
  const [newImgDir, setNewImgDir] = useState(data.newImgDir);
  const [dateState, setDateState] = useState(true);
  const [jsonList, setJsonList] = useState([]);

  const [activity, setActivity] = React.useState([]);

  const getActivity = async () => {
    const activity = await axios.get(
      `http://localhost:8080/api/activity-detail/${activityId}`
    );
    setActivity(activity.data);
    const json = JSON.parse(activity.data.data);
    setJsonList(json);
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
        width={550}
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
          <Box maxHeight={400} overflow="scroll">
            <InputLabel sx={{ mt: 1 }}>학기</InputLabel>
            <Typography sx={{ p: 2 }}>{activity.semester}</Typography>
            <Box>
              <InputLabel sx={{ mt: 1 }}>카테고리</InputLabel>
              <Typography sx={{ p: 2 }}>{activity.section}</Typography>
            </Box>
            <InputLabel sx={{ mt: 1 }}>제목</InputLabel>
            <Typography sx={{ p: 2 }}>{activity.name}</Typography>
            {activity.data ? (
              <>
                {jsonList.map((item) => (
                  <Box key={item.id}>
                    <InputLabel sx={{ mt: 1 }}>{item.field}</InputLabel>
                    <Typography sx={{ p: 2 }}>{item.data}</Typography>
                  </Box>
                ))}
              </>
            ) : (
              ""
            )}
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
            <Link
              to={`/activity/edit/${activityId}`}
              style={{ textDecoration: "none" }}
            >
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
