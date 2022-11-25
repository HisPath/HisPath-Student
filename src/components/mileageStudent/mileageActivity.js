import { Fab } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavigatorToTop from "./NavigatorToTop";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { scholarshipApplyState, semesterState } from "../../store/atom";
import { activityState } from "../../store/atom";
import { useRecoilState } from "recoil";
import DoneIcon from "@mui/icons-material/Done";
import {
  getActivities,
  getCategories,
  getActivitiesBySemCate,
} from "../../api/mileage";
import { Container } from "@mui/material";
import { applyScholarship } from "../../api/mileage";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { blue, red } from "@mui/material/colors";
import { useSnackbar } from "notistack";

export default function MileageTables() {
  const [categories, setCategories] = React.useState([]);
  const semester = useRecoilValue(semesterState);
  const [mileageActivities, setActivities] = useRecoilState(activityState);
  const [open, setOpen] = React.useState(false);
  const [applied, setApplied] = useRecoilState(scholarshipApplyState);
  const { enqueueSnackbar } = useSnackbar();

  const changeSections = (category) => {
    if (!category) {
      getActivities().then((data) => setActivities(data));
    } else {
      getActivitiesBySemCate(category, semester).then((data) => {
        setActivities(data);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyScholar = () => {
    setOpen(true);
  };

  const confirmScholar = (semester) => {
    enqueueSnackbar("신청 완료되었습니다.", { variant: "success" });
    applyScholarship(semester);
    setApplied(true);
    // setApplied(false);
  };

  useEffect(() => {
    const fetchCate = async () => {
      const cate = await getCategories();
      setCategories(cate);
    };
    fetchCate();
    changeSections("ALL");
  }, []);

  useEffect(() => {
    changeSections("ALL");
  }, [semester]);

  return (
    <Container
      sx={{
        width: "100%",
        paddingBottom: "100px",
        display: "flex",
        justifyContent: "center",
        marginBottom: "50px",
        marginTop: "50px",
      }}
    >
      <TableContainer sx={{ width: "90%", minWidth: 900 }} component={Paper}>
        <Table
          sx={{
            border: `1px solid #e6e6e6`,
          }}
          aria-label="simple table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%" }}>카테고리</TableCell>
              <TableCell sx={{ width: "20%" }}>학기</TableCell>
              <TableCell sx={{ width: "20%" }}>항목명</TableCell>
              <TableCell sx={{ width: "20%" }} align="center">
                참여여부
              </TableCell>
              <TableCell sx={{ width: "20%" }}>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semester === "ALL" ? (
              <>
                {categories.map((m) => (
                  <>
                    {mileageActivities.map((activity) =>
                      activity.category === m.name ? (
                        <TableRow
                          key={activity.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textOverflow: "ellipsis", width: "20%" }}
                          >
                            {activity.category}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textOverflow: "ellipsis", width: "20%" }}
                          >
                            {activity.semester}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textOverflow: "ellipsis", width: "20%" }}
                          >
                            {activity.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              textOverflow: "ellipsis",
                              width: "20%",
                            }}
                            align="center"
                          >
                            {activity.participated && <DoneIcon />}
                          </TableCell>
                          <TableCell>{activity.remark}</TableCell>
                        </TableRow>
                      ) : (
                        ""
                      )
                    )}
                  </>
                ))}
              </>
            ) : (
              <>
                {categories.map((m) => (
                  <>
                    {mileageActivities.map((activity) => {
                      return activity.category === m.name &&
                        activity.semester === semester ? (
                        <TableRow
                          key={activity.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textOverflow: "ellipsis" }}
                          >
                            {activity.category}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ textOverflow: "ellipsis" }}
                          >
                            {activity.semester}
                          </TableCell>
                          <TableCell
                            sx={{
                              textOverflow: "ellipsis",
                            }}
                          >
                            {activity.name}
                          </TableCell>
                          <TableCell
                            sx={{ textOverflow: "ellipsis" }}
                            align="center"
                          >
                            {activity.participated && <DoneIcon />}
                          </TableCell>
                          <TableCell>{activity.remark}</TableCell>
                        </TableRow>
                      ) : (
                        ""
                      );
                    })}
                  </>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <NavigatorToTop></NavigatorToTop>

      {applied ? (
        <Button disabled onClick={applyScholar}>
          <Fab
            sx={{
              backgroundColor: "grey !important",
              position: "fixed !important",
              bottom: "50px",
              right: "50px",
              height: "48px",
            }}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
          >
            신청 완료
          </Fab>
        </Button>
      ) : (
        <Button onClick={() => applyScholar(semester)}>
          <Fab
            sx={{
              position: "fixed !important",
              bottom: "50px",
              right: "50px",
              height: "48px",
            }}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
          >
            장학금 신청
          </Fab>
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: 20, width: 300, textAlign: "center" }}
        >
          {`장학금 신청하시겠습니까? `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus sx={{ color: red[500] }}>
            취소
          </Button>
          <Button
            onClick={() => {
              handleClose();
              confirmScholar("2022-2");
            }}
            sx={{ color: blue[900] }}
          >
            신청
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

//onClick={applyScholar(semester)}
