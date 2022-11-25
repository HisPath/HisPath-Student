import ApplyButton from "./ApplyButton";
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
import { semesterState } from "../../store/atom";
import { useRecoilState } from "recoil";
import { myActivityState } from "../../store/atom";
import { getActivities } from "../../api/activity";
import { useState } from "react";
import { getMyActivitiesBySemCate } from "../../api/mileage";
import { Container } from "@mui/material";
import styles from "../../style/mileage.module.css";

export default function BasicTable() {
  const semesters = useRecoilValue(semesterState);
  const [activities, setActivities] = useRecoilState(myActivityState);

  const changeSections = (section) => {
    if (!section) {
      getActivities().then((data) => setActivities(data));
    } else {
      getMyActivitiesBySemCate(section, semesters).then((data) => {
        setActivities(data);
      });
    }
  };
  useEffect(() => {
    changeSections("ALL");
  }, []);

  useEffect(() => {
    changeSections("ALL");
  }, [semesters]);
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
      <TableContainer component={Paper} sx={{ width: "90%", minWidth: 900 }}>
        <Table
          sx={{ minWidth: 650, border: `1px solid #e6e6e6` }}
          aria-label="simple table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%" }}>학기</TableCell>
              <TableCell sx={{ width: "20%" }}>항목명</TableCell>
              <TableCell sx={{ width: "20%" }}>비고</TableCell>
              <TableCell sx={{ width: "20%" }}>마일리지 신청</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesters === "ALL" ? (
              <>
                {activities.map((activity) =>
                  activity.requestStatus !== 1 ? (
                    <TableRow
                      key={activity.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {activity.semester}
                      </TableCell>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>{activity.remark}</TableCell>
                      <TableCell>
                        <ApplyButton
                          requestStatus={activity.requestStatus}
                          id={activity.id}
                          changeSections={changeSections}
                        ></ApplyButton>
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )
                )}
              </>
            ) : (
              <>
                {activities.map((activity) =>
                  activity.requestStatus !== 1 &&
                  semesters === activity.semester ? (
                    <TableRow
                      key={activity.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {activity.semester}
                      </TableCell>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>{activity.remark}</TableCell>
                      <TableCell>
                        <ApplyButton
                          requestStatus={activity.requestStatus}
                          id={activity.id}
                          changeSections={changeSections}
                        ></ApplyButton>
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <NavigatorToTop></NavigatorToTop>
    </Container>
  );
}
