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
import AddBlog from "./Add/AddBlog";
import AddCert from "./Add/AddCert";
import AddEdu from "./Add/AddEdu";
import AddIntern from "./Add/AddIntern";
import AddLang from "./Add/AddLang";
import AddPrize from "./Add/AddPrize";
import AddTech from "./Add/AddTech";
import { Typography } from "@mui/material";
import ActivityAdd from "./ActivityAdd";

const drawerWidth = 240;
const style = {
  //   color: "#004dc2",
  fontWeight: "bold",
};

export default function TagMenu() {
  const setActivities = useSetRecoilState(activityState);

  const changeSections = (value) => {
    if (!value) {
      getActivities().then((data) => setActivities(data));
    } else {
      getActivitiesBySec(value).then((data) => setActivities(data));
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
            height: "auto",
          },
          mt: 2,
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ pt: "0", pb: "0" }}>
          <ListItem
            key={"전체"}
            onClick={() => changeSections()}
            sx={{
              backgroundColor: "#fff8e1",
            }}
          >
            <ListItemButton>
              <TagIcon />
              <ListItemText
                sx={{ ml: 1 }}
                primaryTypographyProps={{ style: style }}
                primary={"전체"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"# 마일리지"} sx={{ backgroundColor: "#fffde7" }}>
            <ListItemButton>
              <TagIcon />
              <ListItemText
                sx={{ ml: 1 }}
                primaryTypographyProps={{ style: style }}
                primary={"마일리지"}
              />
            </ListItemButton>
          </ListItem>
          {[
            ["수상", "add/prize", <AddPrize />, "#f9fbe7"],
            ["기술", "add/tech", <AddTech />, "#f1f8e9"],
            ["학력", "add/edu", <AddEdu />, "#e8f5e9"],
            ["링크", "add/blog", <AddBlog />, "#e0f2f1"],
            ["경력", "add/intern", <AddIntern />, "#e0f7fa"],
            ["자격증", "add/cert", <AddCert />, "#e1f5fe"],
            ["언어", "add/lang", <AddLang />, "#e3f2fd"],
            ["기타", "add", <ActivityAdd />, "#e8eaf6"],
          ].map((text) => (
            <ListItem
              key={text[0]}
              onClick={() => changeSections(text[0])}
              sx={{ backgroundColor: text[3] }}
            >
              <ListItemButton>
                <TagIcon />
                <ListItemText
                  onClick={changeSections}
                  sx={{ ml: 1 }}
                  primaryTypographyProps={{ style: style }}
                  primary={text[0]}
                />
              </ListItemButton>
              {text[2]}
              {/* <Link to={text[1]} style={{ textDecoration: "none" }}>
                <AddIcon fontSize="sm" color="secondary" />
              </Link> */}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
