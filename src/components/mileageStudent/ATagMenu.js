import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TagIcon from "@mui/icons-material/Tag";
import { getActivities, getActivitiesBySec } from "../../api/activity";
import { myActivityState } from "../../store/atom";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../store/atom";
import { useEffect } from "react";
import { getMyActivitiesBySemCate } from "../../api/mileage";

const drawerWidth = 240;
const style = {
  fontWeight: "bold",
};

export default function ATagMenu() {
  const setActivities = useSetRecoilState(myActivityState);
  const semester = useRecoilValue(semesterState);

  const changeSections = (section) => {
    if (!section) {
      getActivities().then((data) => setActivities(data));
    } else {
      getMyActivitiesBySemCate(section, semester).then((data) => {
        setActivities(data);
      });
    }
  };

  useEffect(() => {
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
          <ListItem />
          <ListItem />
          <ListItem />
          {[
            ["전체"],
            ["수상"],
            ["기술"],
            ["학력"],
            ["링크"],
            ["경력"],
            ["자격증"],
            ["외국어"],
            ["기타"],
          ].map((text) => (
            <ListItem key={text[0]} onClick={() => changeSections(text[0])}>
              <ListItemButton>
                <TagIcon />
                <ListItemText
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
