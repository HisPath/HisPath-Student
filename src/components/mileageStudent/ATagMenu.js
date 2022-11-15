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
import { myActivityState } from "../../store/atom";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { semesterState } from "../../store/atom";
import { CategoryRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { getMyActivitiesBySemCate } from "../../api/mileage";

const drawerWidth = 240;
const style = {
  fontWeight: "bold",
};

// export const getMyActivitiesBySemCate = async (section, semester) => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_SERVER}/student-activities/status?semester=${semester}&section=${section}`
//   );

//   return response.data;
// };

export default function ATagMenu() {
  const setActivities = useSetRecoilState(myActivityState);
  const semester = useRecoilValue(semesterState);

  const changeSections = (section) => {
    if (!section) {
      getActivities().then((data) => setActivities(data));
    } else {
      getMyActivitiesBySemCate(section, semester).then((data) => {
        setActivities(data);
        // console.log("section : " + section);
        // console.log("semester : " + semester);
      });
    }
  };

  useEffect(() => {
    // getActivities();

    // getAllActivities();
    changeSections("ALL");
  }, []);
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
        <List>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          <ListItem></ListItem>
          {[
            ["수상", "add/tech"],
            ["기술", "add/tech"],
            ["학력", "add/tech"],
            ["링크", "add/tech"],
            ["경력", "add/tech"],
            ["자격증", "add/tech"],
            ["외국어", "add/tech"],
            ["기타", "add/tech"],
          ].map((text) => (
            <ListItem key={text[0]} onClick={() => changeSections(text[0])}>
              <ListItemButton>
                <TagIcon />
                <ListItemText
                  // onClick={changeSections}
                  sx={{ ml: 1 }}
                  primaryTypographyProps={{ style: style }}
                  primary={text[0]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
