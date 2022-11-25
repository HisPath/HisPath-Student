import {
  Box,
  Button,
  Chip,
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
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2.5 }}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                pl: 2,
                pt: 0.5,
                fontFamily: "Public Sans,sans-serif",
              }}
            >
              활동 상세
            </Typography>

            <Box display={"flex"}>
              {activity.mileage ? (
                <Chip
                  label="마일리지"
                  variant="outlined"
                  sx={{
                    color: "primary.main",
                    backgroundColor: "#fff",
                    fontWeight: 800,
                    m: 0.5,
                    mr: 2,
                  }}
                />
              ) : (
                <Chip
                  label="개인활동"
                  variant="outlined"
                  sx={{
                    color: "secondary.main",
                    backgroundColor: "#fff",
                    fontWeight: 800,
                    m: 0.5,
                    mr: 2,
                  }}
                />
              )}
              <Label color={"success"} sx={{ mt: 1 }}>
                학기
              </Label>
              <Typography sx={{ p: 1, mr: 2 }}>{activity.semester}</Typography>

              <Label color={"success"} sx={{ mt: 1 }}>
                카테고리
              </Label>
              <Typography sx={{ p: 1, mr: 2 }}>{activity.section}</Typography>

              <Label color={"success"} sx={{ mt: 1 }}>
                제목
              </Label>
              <Typography sx={{ p: 1, mr: 2 }}>{activity.name}</Typography>
            </Box>
          </Box>
          <Box maxHeight={500} overflow="scroll" p={3} pt={1}>
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
                        <Typography sx={{ p: 2 }}>{item.data}</Typography>
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
