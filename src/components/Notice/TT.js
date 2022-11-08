import React, { useState, useEffect } from 'react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  styled,
  Typography,
} from '@mui/material';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import AlarmIcon from '@mui/icons-material/Alarm';
import Switch from '@mui/material/Switch';
import CardGrid from './CardGrid';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 3,
  borderRadius: 4,
  width: 500,
  minHeight: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingBottom: 10,
  paddingTop: 10,
});

const Article = styled(Box)({
  height: 'calc(100vh - 236.5px)',
});

function AlarmIconCheck({ t }) {
  const p = new Date(t.row.pubDate);
  const d = new Date();
  const s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
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
            float: 'right',
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
          float: 'right',
          color: 'red',
        }}
      />
    );
  }
};

function TT() {
  const [noticeType, setNoticeType] = useState(0);
  const [init, setInit] = useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [card, setCard] = useState(false);

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
              textAlign: 'center',
            }}
          >
            <StatusIcons p={param} />
          </Box>
        </strong>
      ),
    },

    {
      field: 'id',
      headerName: 'No',
      width: 50,
      filterable: false,
      renderCell: (index) => noticeList.length - index.api.getRowIndex(index.row.id),
    },

    {
      field: 'title',
      width: 600,
      headerName: '제목',
    },
    {
      field: 'managerName',
      width: 150,
      headerName: '작성자',
    },
    {
      field: 'pubDate',
      width: 200,
      headerName: '게시기간',
      renderCell: (param) => (
        <strong>
          <Box
            style={{
              textAlign: 'center',
            }}
          >
            <PublishDuration p={param} />
          </Box>
        </strong>
      ),
    },
    {
      field: 'viewCnt',
      width: 100,
      headerName: '조회수',
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
      const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      const today = new Date(t);
      arr = arr.filter(function (data) {
        const pubD = new Date(data.pubDate);
        const expD = new Date(data.expDate);
        return pubD <= today && expD >= today;
      });
    } else if (noticeType === 2) {
      const d = new Date();
      const t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
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
  const loadData = () => {
    axios.get('http://localhost:8080/api/notice').then(function (response) {
      noticeFilter(response.data);
      setInit(true);
    });
  };

  useEffect(() => {
    loadData();
  }, [noticeType]);

  const Mode = () => {
    if (card)
      return (
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          카드
        </Typography>
      );
    else {
      return (
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          테이블
        </Typography>
      );
    }
  };

  return (
    <Container>
      <Header>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          공지사항
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color={card ? 'primary' : 'secondary'}
                componentsProps={{ input: { 'aria-label': 'card mode' } }}
                checked={card}
                label="View Mode"
                onChange={(event) => {
                  setCard(event.target.checked);
                }}
              />
            }
            labelPlacement="start"
            label={`Select View Mode: ${card ? 'Card Mode' : 'Table Mode'}`}
          />
        </FormGroup>
        {/* <Switch
          color={card ? 'primary' : 'secondary'}
          componentsProps={{ input: { 'aria-label': 'card mode' } }}
          checked={card}
          label="View Mode"
          onChange={(event) => {
            setCard(event.target.checked);
          }}
        /> */}
      </Header>
      <Box display="flex" paddingBottom={1} gap={1.5} justifyContent={'right'}>
        <Button variant="outlined" onClick={() => setNoticeType(0)}>
          전체 공지
        </Button>
        <Button variant="outlined" onClick={() => setNoticeType(1)}>
          중요 공지
        </Button>
        <Button variant="outlined" onClick={() => setNoticeType(2)}>
          지난 공지
        </Button>
      </Box>
      {card ? (
        <Article>
          {init ? (
            <CardGrid noticeList={noticeList}></CardGrid>
          ) : (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Article>
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
              onRowClick={({ id }) => window.open(`/notice/${id}`, '_self')}
              pageSize={10}
              rowsPerPageOptions={[10]}
              AlternationCount="{ Binding MainData.ProjColl.Count}"
              disableColumnMenu
              disableDensitySelector
              hideFooterSelectedRowCount
            />
          ) : (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
