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
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List
        // sx={{ pt: "calc(11vh)" }}
        >
          <ListItem key={"전체"} onClick={() => changeSections()}>
            <ListItemButton>
              <TagIcon />
              <ListItemText
                sx={{ ml: 1 }}
                primaryTypographyProps={{ style: style }}
                primary={"전체"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"# 마일리지"}>
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
            ["수상", "add/prize", <AddPrize />],
            ["기술", "add/tech", <AddTech />],
            ["과정", "add/edu", <AddEdu />],
            ["링크", "add/blog", <AddBlog />],
            ["인턴", "add/intern", <AddIntern />],
            ["자격증", "add/cert", <AddCert />],
            ["언어", "add/lang", <AddLang />],
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
              {text[2]}
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
