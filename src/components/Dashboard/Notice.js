import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@mui/material";
import { Palette } from "@mui/icons-material";

const style = {
  padding: 2,
  margin: 3,
  maxWidth: "38rem",
  bgcolor: "background.paper",
};

export default function Notice() {
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
        color="primary.light"
        width="38rem"
      >
        Notice
      </Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText
            primary="[여성공학인재양성] 기자재 공용 사용 안내 (충전드릴, 비트세트)"
            secondary="2022년 9월 14일"
          />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText
            primary="「2022년 우주전파재난 예측 인공지능(AI) 경진대회」안내"
            secondary="2022년 9월 14일"
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="제22회 대학생 프로그래밍 경시대회 개최 안내"
            secondary="2022년 9월 13일"
          />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText
            primary="[대학원] 세미나(9월 16일, 홍성은 교수)-AI 활용분야 및 최신 기술 트렌드"
            secondary="2022년 9월 13일"
          />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText
            primary="[SW중심대] 22-2학기 노트북(Macbook) 추가 신규 승인 공지"
            secondary="2022년 9월 7일"
          />
        </ListItem>
      </List>
    </Box>
  );
}
