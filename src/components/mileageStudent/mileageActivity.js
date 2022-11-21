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
// import { getActivitiesBySemCate } from "./TagMenu";
import { useRecoilState } from "recoil";
import { Chip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import {
  getActivities,
  getCategories,
  getActivitiesBySemCate,
} from "../../api/mileage";
import { Container } from "@mui/material";

const lightColor = "rgba(255, 255, 255, 0.7)";
export default function MileageTables() {
  const [categories, setCategories] = React.useState([]);
  const [allActivity, setAllActivities] = React.useState([]);
  const semester = useRecoilValue(semesterState);
  const [mileageActivities, setActivities] = useRecoilState(activityState);

  // console.log(mileageActivities);
  // const getCategories = async () => {
  //   const category = await axios.get(
  //     `${process.env.REACT_APP_SERVER}/categories`
  //   );
  //   setCategories(category.data);
  // };

  // const getAllActivities = async () => {
  //   const activities = await axios.get(
  //     `${process.env.REACT_APP_SERVER}/mileage/semester?semester=${semester}`
  //   );
  //   setAllActivities(activities.data);
  // };

  // const getActivities = async () => {
  //   const activity = await axios.get(
  //     `${process.env.REACT_APP_SERVER}/studentmileage/1`
  //   );
  //   setActivities(activity.data.activities);
  // };

  const changeSections = (category) => {
    if (!category) {
      getActivities().then((data) => setActivities(data));
    } else {
      getActivitiesBySemCate(category, semester).then((data) => {
        setActivities(data);
        // console.log(category);
        console.log(semester);
        // console.log(data);
      });
    }
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
    // getAllActivities();
    changeSections("ALL");
  }, [semester]);

  return (
    <Container>
      <div className="root">
        <div className="paper">
          <TableContainer
            sx={{ marginLeft: 10, width: "90%", minWidth: 900 }}
            component={Paper}
            // style={{ maxHeight: 500 }}
          >
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
                      // <div id={m.categoryId}>
                      <>
                        {/* <Typography color={"grey"} sx={{ marginLeft: 10 }}>
                        {/* {m.name} */}
                        {/* </Typography> */}
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
                      // <div id={m.categoryId}>
                      //   <Typography color={"grey"} sx={{ marginLeft: 10 }}>
                      //     {/* {m.name} */}
                      //   </Typography>
                      <>
                        {mileageActivities.map((activity) => {
                          // console.log(m, activity, semester);
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
    </Container>
  );
}
