import DeleteButton from "./DeleteButton";

import SemesterSelect from "./semesterSelect";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tags from "./Tag";
import { Typography } from "@mui/material";
import NavigatorToTop from "./NavigatorToTop";
import axios from "axios";
import { useEffect } from "react";

export default function BasicTable() {
  const [activities, setActivities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [semesters, setSemesters] = React.useState([]);

  const getCategories = async () => {
    const category = await axios.get("http://localhost:8080/api/categories");
    setCategories(category.data);
  };

  const getActivities = async () => {
    const activity = await axios.get(
      "http://localhost:8080/api/studentmileage/1"
    );
    setActivities(activity.data.activities);
  };
  useEffect(() => {
    getActivities();
    getCategories();
  }, []);
  return (
    <>
      <Tags></Tags>
      <h4>내 활동들</h4>
      {/* {categories.map((m) => (
        <div className="paper">
          <div id={m.categoryId}>
            {/* <Typography sx={{ color: "grey" }}>{m.period}</Typography> */}
      {/* <Typography sx={{ color: "grey" }}></Typography>
          </div> */}{" "}
      */}
      <TableContainer
        component={Paper}
        sx={{ marginLeft: 10, width: "90%" }}
        style={{ maxHeight: 500 }}
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
              <TableCell sx={{ width: "20%" }}>내용</TableCell>
              <TableCell sx={{ width: "20%" }}>마일리지 신청</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesters === "whole" ? (
              <>
                {activities.map((activity) =>
                  activity.categoryDto.name === m.name &&
                  activity.personal === true ? (
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
                        <DeleteButton></DeleteButton>
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
                  activity.categoryDto.name === m.name &&
                  activity.personal === false &&
                  activity.semester === semesters ? (
                    <TableRow
                      key={activity.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {activity.name}
                      </TableCell>
                      <TableCell>{activity.remark}</TableCell>
                      <TableCell>{activity.semester}</TableCell>
                      <TableCell>
                        <DeleteButton></DeleteButton>
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
      {/* </div> */}
      // ))}
      <NavigatorToTop></NavigatorToTop>
    </>
  );
}
