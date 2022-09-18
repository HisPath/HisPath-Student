import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { Palette } from "@mui/icons-material";

const style = {
  padding: 2,
  margin: 3,
  //   width: "100%",
  //   height: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

export default function Activity() {
  return (
    <Box>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        m={3}
        marginBottom={1}
        fontFamily="Ubuntu"
        textAlign="center"
        // color={Palette.primary}
        color="#60748b"
      >
        Activity
      </Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="전공 활동" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="산학 활동" />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="비교과 활동"
            secondary="전공, 연구, 특강, 행사, 학회"
          />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="봉사 활동" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="기타 활동" />
        </ListItem>
      </List>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 8 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button sx={{ fontWeight: "bold", fontFamily: "Ubuntu" }}>
            Mileage
          </Button>
          <Button sx={{ fontWeight: "bold", fontFamily: "Ubuntu" }}>
            Portfolio
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
