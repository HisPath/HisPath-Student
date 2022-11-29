import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Grid,
  Button,
  CircularProgress,
  Container,
  styled,
  Typography,
} from "@mui/material";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import AlarmIcon from "@mui/icons-material/Alarm";
import Switch from "@mui/material/Switch";
import CardGrid from "./CardGrid";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ModeSwitch from "./ModeSwitch";

import { getNotices } from "../../api/notice";
import { useNavigate } from "react-router-dom";

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingBottom: 10,
  paddingTop: 10,
});

const Article = styled(Box)({
  height: "calc(100vh - 236.5px)",
});

const CardArticle = styled(Box)({
  height: "auto",
  paddingBottom: 24,
});

function AlarmIconCheck({ t }) {
  const p = new Date(t.row.pubDate);
  const d = new Date();
  const s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  const today = new Date(s);
  if (p > today)
    return (
      <Box display="flex" gap={6.5}>
        <Typography variant="h7" fontWeight="normal">
          {t.row.viewCnt}
        </Typography>
        <AlarmIcon
          fontSize="small"
          style={{
            float: "right",
          }}
        />
      </Box>
    );
  else
    return (
      <Typography variant="h7" fontWeight="normal">
        {t.row.viewCnt}
      </Typography>
    );
}

const StatusIcons = ({ p }) => {
  let imp = false;
  if (p.row.importance) imp = true;
  if (imp) {
    return (
      <PriorityHighIcon
        fontSize="small"
        style={{
          float: "right",
          color: "red",
        }}
      />
    );
  }
};

function TT() {
  const navigate = useNavigate();
  const [noticeType, setNoticeType] = useState(0);
  const [init, setInit] = useState(false);
  const [noticeList, setNoticeList] = useState([]);

  const [card, setCard] = useState(
    window.localStorage.getItem("card") === "true"
  );

  const PublishDuration = ({ p }) => {
    var pubD = p.row.pubDate;
    var expD = p.row.expDate;
    return (
      <Typography variant="h7" fontWeight="normal">
        {pubD} ~ {expD}
      </Typography>
    );
  };

  const columns = [
    {
      width: 10,
      renderCell: (param) => (
        <strong>
          <Box
            style={{
              textAlign: "center",
            }}
          >
            <StatusIcons p={param} />
          </Box>
        </strong>
      ),
    },
    {
      field: "id",
      headerName: "No",
      width: 50,
      filterable: false,
      renderCell: (index) =>
        noticeList.length - index.api.getRowIndex(index.row.id),
    },

    {
      field: "title",
      width: 600,
      headerName: "제목",
    },
    {
      field: "managerName",
      width: 150,
      headerName: "작성자",
    },
    {
      field: "pubDate",
      width: 200,
      headerName: "게시기간",
      renderCell: (param) => (
        <strong>
          <Box
            style={{
              textAlign: "center",
            }}
          >
            <PublishDuration p={param} />
          </Box>
        </strong>
      ),
    },
    {
      field: "viewCnt",
      width: 100,
      headerName: "조회수",
      renderCell: (param) => (
        <strong>
          <AlarmIconCheck t={param} />
        </strong>
      ),
    },
  ];
  function noticeFilter(arr) {
    if (!(noticeType === 2)) {
      const d = new Date();
      const t = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        const pubD = new Date(data.pubDate);
        const expD = new Date(data.expDate);
        return pubD <= today && expD >= today;
      });
    } else if (noticeType === 2) {
      const d = new Date();
      const t = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        const expD = new Date(data.expDate);
        return expD < today;
      });
    }
    if (noticeType === 1) {
      arr = arr.filter(function (data) {
        return data.importance;
      });
    }

    setNoticeList(arr);
  }
  const loadData = async () => {
    getNotices().then(function (data) {
      noticeFilter(data);
      setInit(true);
      setCard(window.localStorage.getItem("card") === "true");
    });
  };
  useEffect(() => {
    loadData();
  }, [noticeType]);

  useEffect(() => {
    window.localStorage.setItem("card", card);
  }, [card]);
  return (
    <Container>
      <Header>
        <Grid container alignItems="center">
          <Grid item xs="4">
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              공지사항
            </Typography>
          </Grid>
          <Grid item xs="5" display="flex" justifyContent={"right"}>
            <ModeSwitch card={card} setCard={setCard} />
          </Grid>
          <Grid item xs="3">
            <Box id="all" display="flex" gap={1.5} justifyContent={"right"}>
              <Button
                variant="outlined"
                onClick={() => {
                  setNoticeType(0);
                }}
              >
                전체 공지
              </Button>
              <Button
                id="imp"
                variant="outlined"
                onClick={() => setNoticeType(1)}
              >
                중요 공지
              </Button>
              <Button
                id="exp"
                variant="outlined"
                onClick={() => setNoticeType(2)}
              >
                지난 공지
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Header>
      {card ? (
        <CardArticle>
          {init ? (
            <CardGrid noticeList={noticeList}></CardGrid>
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </CardArticle>
      ) : (
        <Article>
          {init ? (
            <DataGrid
              components={{
                Toolbar: GridToolbar,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                  printOptions: { disableToolbarButton: true },
                },
              }}
              rows={noticeList}
              columns={columns}
              onRowClick={({ id }) => navigate(`/notice/${id}`)}
              pageSize={10}
              rowsPerPageOptions={[10]}
              AlternationCount="{ Binding MainData.ProjColl.Count}"
              disableColumnMenu
              disableDensitySelector
              hideFooterSelectedRowCount
            />
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Article>
      )}
    </Container>
  );
}
export default TT;
