import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { getInfo } from "../../api/dashboard";

const noticeWidth = "28rem";

const style = {
  padding: 2,
  margin: 3,
  marginTop: 1,
  marginBottom: 1,
  maxWidth: noticeWidth,
  bgcolor: "background.paper",
};

export default function Notice() {
  const [notices, setNotices] = React.useState([]);

  const getNotices = async () => {
    const notice = await getInfo();
    setNotices(notice.data.notice);
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <Box>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        m={3}
        mt={3}
        fontFamily="Ubuntu"
        textAlign="center"
        color="secondary.dark"
        width={noticeWidth}
      >
        Notice
      </Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {notices.map((notice) => (
          <ListItem button divider>
            <ListItemText
              primary={notice.title}
              secondary={notice.pubDate}
              onClick={() => {
                window.open(`/notice/${notice.noticeId}`, "_self");
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
