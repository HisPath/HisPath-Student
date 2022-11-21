import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chip, IconButton, TablePagination, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
import { Box } from "@mui/system";
import { useRecoilValue } from "recoil";
import { activityState } from "../../store/atom";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteActivity } from "../../api/activity";
import ActivityCard from "./ActivityCard";

export default function ActivityList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const activities = useRecoilValue(activityState);

  // console.log(activities);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteActivityFromList = async (activityId) => {
    await deleteActivity(activityId);
    window.location.reload();
  };

  const lightGray = "#F5F5F5";
  return (
    <>
      <Box
        gap={3}
        display="grid"
        mb={5}
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
      >
        {activities.map((activity) => (
          <ActivityCard key={activity.activityId} activity={activity} />
        ))}
      </Box>
    </>
    // <>
    //   {/* <Paper sx={{ width: "100%", mb: 2, mt: 3 }}> */}
    //   <TableContainer>
    //     <Table sx={{ minWidth: 650 }} aria-label="tableTitle">
    //       <TableHead sx={{ fontWeight: 600 }}>
    //         <TableRow>
    //           <TableCell sx={{ backgroundColor: lightGray }}>
    //             <Box display="flex" alignItems={"center"}>
    //               <TagIcon fontSize="small" sx={{ mr: 0.3 }} />
    //               {/* <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
    //                 태그
    //               </Typography> */}
    //             </Box>
    //           </TableCell>
    //           <TableCell sx={{ backgroundColor: lightGray }}>
    //             <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
    //               학기
    //             </Typography>
    //           </TableCell>
    //           <TableCell fontweight="600" sx={{ backgroundColor: lightGray }}>
    //             <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
    //               제목
    //             </Typography>
    //           </TableCell>
    //           <TableCell sx={{ backgroundColor: lightGray }}>
    //             <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
    //               비고
    //             </Typography>
    //           </TableCell>
    //           <TableCell align="right" sx={{ backgroundColor: lightGray }}>
    //             <Typography sx={{ fontSize: ".875rem", fontWeight: "600" }}>
    //               기능
    //             </Typography>
    //           </TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {activities
    //           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //           .map((activity) => (
    //             <TableRow
    //               key={activity.name}
    //               sx={{
    //                 "&:last-child td, &:last-child th": { border: 0 },
    //                 "&:nth-of-type(even) td, &:nth-of-type(even) th": {
    //                   backgroundColor: lightGray,
    //                 },
    //               }}
    //             >
    //               <TableCell style={{ width: "calc(2vw)" }}>
    //                 {activity.section === "수상" ? (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       backgroundColor: "#e6fa32",
    //                       color: "#222",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 ) : activity.section === "기술" ? (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       background: "#9bf731",
    //                       color: "#222",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 ) : activity.section === "학력" ? (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       background: "#49f558",
    //                       color: "#222",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 ) : activity.section === "링크" ? (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       background: "#49f2ea",
    //                       color: "#222",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 ) : activity.section === "경력" ? (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       background: "#4be5fa",
    //                       color: "#fff",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 ) : activity.section === "자격증" ? (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       background: "#33beff",
    //                       color: "#fff",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 ) : activity.section === "언어" ? (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       background: "#32a8fc",
    //                       color: "#fff",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 ) : (
    //                   <Chip
    //                     label={activity.section}
    //                     sx={{
    //                       background: "#4963f5",
    //                       color: "#fff",
    //                       fontWeight: 900,
    //                     }}
    //                   />
    //                 )}
    //                 {/* <Chip label={activity.section} color="secondary" /> */}
    //               </TableCell>
    //               <TableCell style={{ width: "calc(3vw)" }}>
    //                 {activity.semester}
    //               </TableCell>
    //               <TableCell
    //                 component="th"
    //                 scope="row"
    //                 style={{ width: "calc(20vw)" }}
    //               >
    //                 <Link
    //                   to={`/activity/detail/${activity.id}`}
    //                   style={{ textDecoration: "none", color: "black" }}
    //                 >
    //                   {activity.name}
    //                 </Link>
    //               </TableCell>
    //               <TableCell style={{ width: "calc(15vw)" }}>
    //                 {activity.remark ? activity.remark : ""}
    //               </TableCell>
    //               <TableCell align="right" style={{ width: "calc(15vw)" }}>
    //                 <Box
    //                   display={"flex"}
    //                   justifyContent="flex-end"
    //                   alignItems={"center"}
    //                   gap={2}
    //                 >
    //                   {activity.mileage ? (
    //                     <Chip
    //                       label="마일리지"
    //                       variant="outlined"
    //                       sx={{
    //                         color: "primary.main",
    //                         backgroundColor: "#fff",
    //                         fontWeight: 800,
    //                       }}
    //                     />
    //                   ) : (
    //                     ""
    //                   )}
    //                   <IconButton
    //                     onClick={() => deleteActivityFromList(activity.id)}
    //                   >
    //                     <DeleteIcon />
    //                   </IconButton>
    //                 </Box>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    //   <TablePagination
    //     rowsPerPageOptions={rowsPerPage}
    //     component="div"
    //     count={activities.length}
    //     rowsPerPage={rowsPerPage}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    //   {/* </Paper> */}
    // </>
  );
}
