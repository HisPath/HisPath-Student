import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getActivity, deleteActivity } from "../../api/activity";
import Label from "../../components/label";

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

  const listActivity = async () => {
    const activity = await getActivity(activityId);
    setActivity(activity);
    const json = JSON.parse(activity.data);
    setJsonList(json);
  };

  useEffect(() => {
    listActivity();
  }, []);

  const deleteActivityFromList = async (activityId) => {
    await deleteActivity(activityId);
    window.location.reload();
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
        width={550}
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
            <Label
              variant="soft"
              color={"secondary"}
              sx={{
                fontSize: "1.3rem",
                p: 2,
                pt: 2.5,
                mb: 3,
                fontFamily: "Public Sans,sans-serif",
              }}
            >
              활동 상세
            </Label>
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
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems={"center"}
          mt={3}
        >
          <Box display="flex" alignItems={"center"} gap={1.5}>
            <Link to={`/activity`} style={{ textDecoration: "none" }}>
              <Button
                color="secondary"
                variant="outlined"
                sx={{ fontWeight: "600" }}
              >
                취소
              </Button>
            </Link>
            {activity.mileage ? (
              <></>
            ) : (
              <Button
                color="error"
                variant="contained"
                sx={{ fontWeight: "600" }}
                onClick={() => {
                  deleteActivityFromList(activity.id);
                  window.history.back();
                }}
              >
                삭제
              </Button>
            )}

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
