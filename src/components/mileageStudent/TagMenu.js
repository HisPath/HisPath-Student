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
import { CategoryRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { getActivitiesBySemCate } from "../../api/mileage";

const drawerWidth = 240;
const style = {
  fontWeight: "bold",
};

// export const getActivitiesBySemCate = async (category, semester) => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_SERVER}/student-allmactivities/18?semester=${semester}&category=${category}`
//   );

//   return response.data;
// };

export default function TagMenu() {
  const setActivities = useSetRecoilState(activityState);
  const semester = useRecoilValue(semesterState);

  const changeSections = (category) => {
    if (!category) {
      getActivities().then((data) => setActivities(data));
    } else {
      getActivitiesBySemCate(category, semester).then((data) => {
        setActivities(data);
      });
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
        <List>
          <ListItem />
          <ListItem />
          <ListItem />
          {[
            ["참여여부"],
            ["전공마일리지"],
            ["산학마일리지"],
            ["비교과-연구활동"],
            ["비교과-특강참여"],
            ["비교과-행사참여"],
            ["비교과-학회활동"],
            ["기타"],
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
