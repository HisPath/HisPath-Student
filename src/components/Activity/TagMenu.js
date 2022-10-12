import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;
const style = {
  //   color: "#004dc2",
  fontWeight: "bold",
};

export default function TagMenu() {
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
        </List>
      </Drawer>
    </Box>
  );
}
