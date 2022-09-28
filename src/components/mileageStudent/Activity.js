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

const rows = [
  {
    id: 0,
    title: "(캠프)웹서비스 프로젝트(spring)_장소연_2022",
    description: "Spring Framework를 기반으로 한 웹서비스 구현",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
  {
    id: 1,
    title: "(캠프)PPS(Programming Problem Solving",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
  {
    id: 2,
    title: "(캠프)Design System을 활용한 디자이너-개발",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "2. 산학 마일리지",
  },
  {
    id: 3,
    title: "(캠프) 비즈플로우",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "2. 산학 마일리지",
  },
  {
    id: 4,
    title: "(캠프)미리미리C 캠프_김광_2022.07.04~07.",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
  {
    id: 5,
    title: "(캠프)Unity Camp_안민규 (+외부강사)_202",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
  {
    id: 6,
    title: "(캠프)MicroLearnable Camp (실습형 앱",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
  {
    id: 7,
    title: "(캠프)프로그래밍 집중훈련 캠프_김호준_2022.06",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
  {
    id: 8,
    title: "(캠프)Advanced Flutter Camp_조성배_",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
  {
    id: 9,
    title: "(캠프)Unity Camp_안민규 (+외부강사)_202",
    description: "-",
    period: "2021-10 ~ 2021-12",
    category: "3. 비교과-전공활동",
  },
];

const categories = [
  {
    id: 1,
    name: "1. 전공 마일리지",
  },
  {
    id: 2,
    name: "2. 산학 마일리지",
  },
  {
    id: 3,
    name: "3. 비교과-전공활동",
  },
  {
    id: 4,
    name: "4. 비교과-연구활동",
  },
  {
    id: 5,
    name: "5. 비교과-특강참여",
  },
  {
    id: 6,
    name: "6. 비교과-행사참여",
  },
  {
    id: 7,
    name: "7. 비교과-학회활동",
  },
  {
    id: 8,
    name: "8. 기타",
  },
];

export default function BasicTable() {
  return (
    <>
      <Tags></Tags>
      <SemesterSelect></SemesterSelect>
      <h4>내 활동들</h4>

      {categories.map((m) => (
        <div className="paper">
          <div id={m.id}>
            <Typography sx={{ color: "grey" }}>{m.name}</Typography>
          </div>
          <TableContainer component={Paper} style={{ maxHeight: 500 }}>
            <Table
              sx={{ minWidth: 650, border: `1px solid #e6e6e6` }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>항목명</TableCell>
                  <TableCell>내용</TableCell>
                  <TableCell>기간</TableCell>
                  <TableCell>마일리지 신청</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) =>
                  row.category === m.name ? (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.period}</TableCell>
                      <TableCell>
                        <DeleteButton></DeleteButton>
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </>
  );
}
