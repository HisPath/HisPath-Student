import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
import { getActivities, getActivitiesBySec } from "../../api/activity";
import { activityState } from "../../store/atom";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { semesterState } from "../../store/atom";

const drawerWidth = 240;
const style = {
  fontWeight: "bold",
};

export default function TagMenu() {
  const setActivities = useSetRecoilState(activityState);
  const semester = useRecoilValue(semesterState);

  const getActivitiesBySemCate = async (semester, category) => {
    const response = await axios.get(
      `http://localhost:8080/api/student-mactivities/1?semester=${category}&category=${semester}`
    );
    return response.data;
  };

  const changeSections = (cate) => {
    if (!cate) {
      getActivities().then((data) => setActivities(data));
    } else {
      getActivitiesBySemCate(cate, semester).then((data) =>
        setActivities(data)
      );
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            position: "relative",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List
        // sx={{ pt: "calc(11vh)" }}
        >
          {/* <ListItem key={"전체"} onClick={() => changeSections()}>
            <ListItemButton>
              <TagIcon />
              <ListItemText
                sx={{ ml: 1 }}
                primaryTypographyProps={{ style: style }}
                primary={"전체"}
              />
            </ListItemButton> */}
          {/* </ListItem>
          <ListItem key={"# 마일리지"}>
            <ListItemButton>
              <TagIcon />
              <ListItemText
                sx={{ ml: 1 }}
                primaryTypographyProps={{ style: style }}
                primary={"마일리지"}
              />
            </ListItemButton>
          </ListItem> */}
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          {[
            ["참여여부", "add/tech"],
            ["전공마일리지", "add/tech"],
            ["산학마일리지", "add/tech"],
            ["비교과-연구활동", "add/tech"],
            ["비교과-특강참여", "add/tech"],
            ["비교과-행사참여", "add/tech"],
            ["비교과-학회활동", "add/tech"],
            ["기타", "add/tech"],

            // ["링크", "add/blog"],
            // ["인턴", "add/intern"],
            // ["자격증", "add/cert"],
            // ["언어", "add/lang"],
            // ["기타", "add"],
          ].map((text) => (
            <ListItem key={text[0]} onClick={() => changeSections(text[0])}>
              <ListItemButton>
                <TagIcon />
                <ListItemText
                  onClick={changeSections}
                  sx={{ ml: 1 }}
                  primaryTypographyProps={{ style: style }}
                  primary={text[0]}
                />
              </ListItemButton>

              {/* <Link to={text[1]} style={{ textDecoration: "none" }}>
                <AddIcon fontSize="sm" color="secondary" />
              </Link> */}
            </ListItem>
          ))}
        </List>
        {/* <List
        // sx={{ pt: "calc(11vh)" }}
        >
          {[
            "# 마일리지",
            "# 수상",
            "# 기술",
            "# 교육과정",
            "# 블로그",
            "# 인턴",
            "# 자격증",
            "# 어학사항",
            "# 기타",
          ].map((text, index) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemText
                  primaryTypographyProps={{ style: style }}
                  primary={text}
                />
              </ListItemButton>
              <Link to={`/activity/add`} style={{ textDecoration: "none" }}>
                <AddIcon fontSize="sm" color="secondary" />
              </Link>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </Box>
  );
}
