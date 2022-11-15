import ApplyButton from "./ApplyButton";

import SemesterSelect from "./semesterSelect";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import NavigatorToTop from "./NavigatorToTop";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../store/atom";
import { useRecoilState } from "recoil";
import { myActivityState } from "../../store/atom";
import { getActivities } from "../../api/activity";
// import { getMyActivitiesBySemCate } from "./ATagMenu";
import { useState } from "react";
import { getMyActivitiesBySemCate } from "../../api/mileage";

export default function BasicTable() {
  // const [categories, setCategories] = React.useState([]);
  // const [semesters, setSemesters] = React.useState([]);
  const semesters = useRecoilValue(semesterState);
  const [activities, setActivities] = useRecoilState(myActivityState);
  const [activityId, setActivityId] = useState();
  const [rq, setRq] = useState();
  const [apply, setApply] = useState();

  const changeSections = (section) => {
    if (!section) {
      getActivities().then((data) => setActivities(data));
    } else {
      getMyActivitiesBySemCate(section, semesters).then((data) => {
        setActivities(data);
        console.log(semesters);
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
    <div className="root">
      {/* <Tags></Tags> */}
      {/* <h4>내 활동들</h4> */}
      {/* {categories.map((m) => ( */}
      <div className="paper">
        {/* <div id={m.categoryId}>
            <Typography sx={{ color: "grey" }}>{m.period}</Typography>
            <Typography sx={{ color: "grey" }}></Typography>
          </div> */}
        <TableContainer
          component={Paper}
          sx={{ marginLeft: 10, width: "90%", minWidth: 900 }}
          // style={{ maxHeight: 500 }}
        >
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
                          {activity.requestStatus !== 3
                            ? (apply = true)
                            : (apply = false)}
                          <ApplyButton
                            requestStatus={rq}
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
      </div>
      {/* ))} */}
      <NavigatorToTop></NavigatorToTop>
    </div>
  );
}
