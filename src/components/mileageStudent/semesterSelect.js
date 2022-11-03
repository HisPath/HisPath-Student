import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import axios from "axios";

export default function SemesterSelect(props) {
  const [semester, setSemester] = React.useState("");
  const [test, setTest] = React.useState([]);

  const getSemesters = async () => {
    const sem = await axios.get("http://localhost:8080/api/semester/1");
    setTest(sem.data);
  };
  const handleChange = (event) => {
    setSemester(event.target.value);
    props.setSemesters(event.target.value);
  };
  useEffect(() => {
    getSemesters();
    props.setSemesters("2022-2");
  }, []);

  return (
    <FormControl
      className="selectBar"
      // sx={{ m: 1, minWidth: 120 }}
      sx={{
        m: 1,
        minWidth: 120,
        backgroundColor: "white",
        overflow: "auto",
        position: "sticky",
        top: 0,
        paddingTop: 1,
        zIndex: "20",
        float: "right",
      }}
      size="small"
    >
      <InputLabel id="demo-select-small" sx={{ paddingTop: 1 }}>
        학기
      </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={semester}
        label="2022-1학기"
        onChange={handleChange}
      >
        <MenuItem value="whole">
          <em>전기간</em>
        </MenuItem>
        {test.map((m) => (
          <MenuItem value={m.semester}>{m.semester}</MenuItem>
        ))}
        {/* <MenuItem value={"2020-1"}>2020-1</MenuItem>
        <MenuItem value={"2020-2"}>2020-2</MenuItem>
        <MenuItem value={"2021-1"}>2021-1</MenuItem>
        <MenuItem value={"2021-2"}>2021-2</MenuItem>
        <MenuItem value={"2022-1"}>2022-1</MenuItem> */}
      </Select>
    </FormControl>
  );
}
