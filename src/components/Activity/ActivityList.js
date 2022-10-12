import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";

function createData(title, content, remark, semester, detail) {
  return {
    title,
    content,
    remark,
    semester,
    detail,
  };
}

const rows = [
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
  createData("Bizflow M Contest", "최우수상", "수상", "2022-2", ""),
];

export default function ActivityList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

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
          <TableHead>
            <TableRow>
              <TableCell>학기</TableCell>
              <TableCell>제목</TableCell>
              <TableCell align="right">내용</TableCell>
              <TableCell align="right">비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[{ rowsPerPage }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </Paper> */}
    </>
  );
}
