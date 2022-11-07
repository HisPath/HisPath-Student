// import { Fab } from "@mui/material";
// import Link from "@mui/material/Link";
// import SemesterSelect from "./semesterSelect";

// import Tags from "./Tag";

// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Typography } from "@mui/material";
// import NavigatorToTop from "./NavigatorToTop";
// import axios from "axios";
// import { useEffect } from "react";
// import { LocalActivityOutlined } from "@mui/icons-material";
// import { Box } from "@mui/system";
// import { Padding } from "@mui/icons-material";
// import { useRecoilValue } from "recoil";
// import { semesterState } from "../../store/atom";

// const lightColor = "rgba(255, 255, 255, 0.7)";
// export default function MileageTables() {
//   const [activities, setActivities] = React.useState([]);
//   const [categories, setCategories] = React.useState([]);
//   const [allActivity, setAllActivities] = React.useState([]);
//   const semester = useRecoilValue(semesterState);

//   const getCategories = async () => {
//     const category = await axios.get("http://localhost:8080/api/categories");
//     setCategories(category.data);
//   };

//   const getAllActivities = async () => {
//     const activities = await axios.get(
//       "http://localhost:8080/api/mileage/semester?semester=" + semester
//     );
//     setAllActivities(activities.data);
//   };

//   const getActivities = async () => {
//     const activity = await axios.get(
//       "http://localhost:8080/api/studentmileage/1"
//     );
//     setActivities(activity.data.activities);
//   };

//   useEffect(() => {
//     getActivities();
//     getCategories();
//     getAllActivities();
//   }, []);

//   useEffect(() => {
//     getAllActivities();
//   }, [semester]);

//   return (
//     <div className="root">
//       <Tags></Tags>

//       {/* {categories.map((m) => ( */}
//       <div className="paper">
//         <TableContainer
//           sx={{ marginLeft: 10, width: "90%" }}
//           component={Paper}
//           style={{ maxHeight: 500 }}
//         >
//           <Table
//             sx={{
//               minWidth: 650,
//               border: `1px solid #e6e6e6`,
//             }}
//             aria-label="simple table"
//             stickyHeader
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ width: "20%" }}>카테고리</TableCell>
//                 <TableCell sx={{ width: "20%" }}>학기</TableCell>
//                 <TableCell sx={{ width: "20%" }}>항목명</TableCell>
//                 <TableCell sx={{ width: "20%" }}>참여여부</TableCell>
//                 <TableCell sx={{ width: "20%" }}>비고</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {semester === "ALL" ? (
//                 <>
//                   {categories.map((m) => (
//                     <div id={m.categoryId}>
//                       <Typography color={"grey"} sx={{ marginLeft: 10 }}>
//                         {/* {m.name} */}
//                       </Typography>
//                     </div>

//                   {activities.map((activity) =>
//                     activity.categoryDto.name === m.name &&
//                     activity.personal === false ? (
//                       <TableRow
//                         key={activity.id}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                         }}
//                       >
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           sx={{ textOverflow: "ellipsis" }}
//                         >
//                           {activity.categoryDto.name}
//                         </TableCell>
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           sx={{ textOverflow: "ellipsis" }}
//                         >
//                           {activity.semester}
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {activity.name}
//                         </TableCell>
//                         <TableCell sx={{ textOverflow: "ellipsis" }}>
//                           {}
//                         </TableCell>
//                         <TableCell>{activity.remark}</TableCell>
//                       </TableRow>
//                     ) : (
//                       ""
//                     )
//                   )}
//                   ))}
//                 </>
//               ) : (
//                 <>
//                   {activities.map((activity) =>
//                     activity.categoryDto.name === m.name &&
//                     activity.personal === false &&
//                     activity.semester === semester ? (
//                       <TableRow
//                         key={activity.id}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                         }}
//                       >
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           sx={{ textOverflow: "ellipsis" }}
//                         >
//                           {activity.categoryDto.name}
//                         </TableCell>
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           sx={{ textOverflow: "ellipsis" }}
//                         >
//                           {activity.semester}
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           {activity.name}
//                         </TableCell>
//                         <TableCell sx={{ textOverflow: "ellipsis" }}>
//                           {}
//                         </TableCell>
//                         <TableCell>{activity.remark}</TableCell>
//                       </TableRow>
//                     ) : (
//                       ""
//                     )
//                   )}
//                 </>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//       {/* ))} */}
//       <NavigatorToTop></NavigatorToTop>
//       <Link
//         href="/"
//         variant="body2"
//         sx={{
//           textDecoration: "none",
//           color: lightColor,
//           "&:hover": {
//             color: "common.white",
//           },
//         }}
//         rel="noopener noreferrer"
//       >
//         <Fab
//           className="apply_button"
//           variant="extended"
//           size="medium"
//           color="primary"
//           aria-label="add"
//         >
//           장학금 신청
//         </Fab>
//       </Link>
//     </div>
//   );
// }

import { Fab } from "@mui/material";
import Link from "@mui/material/Link";
import SemesterSelect from "./semesterSelect";

import Tags from "./Tag";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import NavigatorToTop from "./NavigatorToTop";
import axios from "axios";
import { useEffect } from "react";
import { LocalActivityOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Padding } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../store/atom";
import { activityState } from "../../store/atom";

const lightColor = "rgba(255, 255, 255, 0.7)";
export default function MileageTables() {
  const [activities, setActivities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [allActivity, setAllActivities] = React.useState([]);
  const semester = useRecoilValue(semesterState);
  const mileageActivities = useRecoilValue(activityState);

  const getCategories = async () => {
    const category = await axios.get("http://localhost:8080/api/categories");
    setCategories(category.data);
  };

  const getAllActivities = async () => {
    const activities = await axios.get(
      "http://localhost:8080/api/mileage/semester?semester=" + semester
    );
    setAllActivities(activities.data);
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
    getAllActivities();
  }, []);

  useEffect(() => {
    getAllActivities();
  }, [semester]);

  return (
    <div className="root">
      <Tags></Tags>

      {/* {categories.map((m) => ( */}
      <div className="paper">
        <TableContainer
          sx={{ marginLeft: 10, width: "90%" }}
          component={Paper}
          style={{ maxHeight: 500 }}
        >
          <Table
            sx={{
              minWidth: 650,
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
                <TableCell sx={{ width: "20%" }}>참여여부</TableCell>
                <TableCell sx={{ width: "20%" }}>비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {semester === "ALL" ? (
                <>
                  {categories.map((m) => (
                    // <div id={m.categoryId}>
                    <>
                      {/* <Typography color={"grey"} sx={{ marginLeft: 10 }}>
                        {/* {m.name} */}
                      {/* </Typography> */}
                      {mileageActivities.map((activity) =>
                        activity.categoryDto.name === m.name &&
                        activity.personal === false ? (
                          <TableRow
                            key={activity.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ textOverflow: "ellipsis" }}
                            >
                              {activity.categoryDto.name}
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
                                width: "20%",
                              }}
                            >
                              {activity.name}
                            </TableCell>
                            <TableCell sx={{ textOverflow: "ellipsis" }}>
                              {}
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
                    <div id={m.categoryId}>
                      <Typography color={"grey"} sx={{ marginLeft: 10 }}>
                        {/* {m.name} */}
                      </Typography>
                      {activities.map((activity) =>
                        activity.categoryDto.name === m.name &&
                        activity.personal === false &&
                        activity.semester === semester ? (
                          <TableRow
                            key={activity.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ textOverflow: "ellipsis" }}
                            >
                              {activity.categoryDto.name}
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
                            <TableCell sx={{ textOverflow: "ellipsis" }}>
                              {}
                            </TableCell>
                            <TableCell>{activity.remark}</TableCell>
                          </TableRow>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* ))} */}
      <NavigatorToTop></NavigatorToTop>
      <Link
        href="/"
        variant="body2"
        sx={{
          textDecoration: "none",
          color: lightColor,
          "&:hover": {
            color: "common.white",
          },
        }}
        rel="noopener noreferrer"
      >
        <Fab
          className="apply_button"
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
        >
          장학금 신청
        </Fab>
      </Link>
    </div>
  );
}
