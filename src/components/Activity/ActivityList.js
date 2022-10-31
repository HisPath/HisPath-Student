import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
import { Box } from "@mui/system";
import { useRecoilValue } from "recoil";
import { activityState } from "../../store/atom";

export default function ActivityList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const activities = useRecoilValue(activityState);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {/* <Paper sx={{ width: "100%", mb: 2, mt: 3 }}> */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="tableTitle">
          <TableHead sx={{ fontWeight: 600 }}>
            <TableRow>
              <TableCell>
                <Box display="flex" alignItems={"center"}>
                  <TagIcon fontSize="small" sx={{ mr: 0.3 }} />
                  {/* <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
                    태그
                  </Typography> */}
                </Box>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
                  학기
                </Typography>
              </TableCell>
              <TableCell fontweight="600">
                <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
                  제목
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
                  비고
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((activity) => (
                <TableRow
                  key={activity.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ width: "calc(5vw)" }}>
                    {activity.section}
                  </TableCell>
                  <TableCell style={{ width: "calc(10vw)" }}>
                    {activity.semester}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "calc(35vw)" }}
                  >
                    <Link
                      to={`/activity/detail`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {activity.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right" style={{ width: "calc(15vw)" }}>
                    {activity.remark ? activity.remark : ""}
                  </TableCell>
                </TableRow>
              ))}
            {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.semester}</TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/activity/detail`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.content}</TableCell>
                  <TableCell align="right">{row.remark}</TableCell>
                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPage}
        component="div"
        count={activities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </Paper> */}
    </>
  );
}
