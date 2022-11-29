import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
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
import ActivityAdd from "./ActivityAdd";
import { useState } from "react";

const drawerWidth = 240;
const style = {
  //   color: "#004dc2",
  fontWeight: "bold",
};

export default function TagMenu() {
  const setActivities = useSetRecoilState(activityState);
  const [sec, setSec] = useState("");

  const changeSections = (value) => {
    if (!value) {
      getActivities().then((data) => setActivities(data));
      setSec("");
    } else {
      getActivitiesBySec(value).then((data) => setActivities(data));
      setSec(value);
    }
  };

  return (
    <Box sx={{ display: "flex" }} border="none">
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
          {sec === "" ? (
            <>
              <ListItem
                key={"전체"}
                onClick={() => changeSections()}
                sx={{
                  backgroundColor: "rgb(232, 245, 233)",
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
            </>
          ) : (
            <>
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
            </>
          )}
          {sec === "마일리지" ? (
            <>
              {" "}
              <ListItem
                key={"# 마일리지"}
                onClick={() => changeSections("마일리지")}
                sx={{
                  backgroundColor: "rgb(232, 245, 233)",
                }}
              >
                <ListItemButton>
                  <TagIcon />
                  <ListItemText
                    sx={{ ml: 1 }}
                    onClick={changeSections}
                    primaryTypographyProps={{ style: style }}
                    primary={"마일리지"}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              {" "}
              <ListItem
                key={"# 마일리지"}
                onClick={() => changeSections("마일리지")}
              >
                <ListItemButton>
                  <TagIcon />
                  <ListItemText
                    sx={{ ml: 1 }}
                    onClick={changeSections}
                    primaryTypographyProps={{ style: style }}
                    primary={"마일리지"}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {[
            ["수상", "add/prize", <AddPrize />, "#f9fbe7"],
            ["기술", "add/tech", <AddTech />, "#f1f8e9"],
            ["교육", "add/edu", <AddEdu />, "#e8f5e9"],
            ["링크", "add/blog", <AddBlog />, "#e0f2f1"],
            ["경험", "add/intern", <AddIntern />, "#e0f7fa"],
            ["자격증", "add/cert", <AddCert />, "#e1f5fe"],
            ["외국어", "add/lang", <AddLang />, "#e3f2fd"],
            ["기타", "add", <ActivityAdd />, "#e8eaf6"],
          ].map((text) =>
            sec === text[0] ? (
              <>
                <ListItem
                  key={text[0]}
                  onClick={() => changeSections(text[0])}
                  sx={{
                    backgroundColor: "rgb(232, 245, 233)",
                  }}
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
                </ListItem>
              </>
            ) : (
              <>
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
                </ListItem>
              </>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}
