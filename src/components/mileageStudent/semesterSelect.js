import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { semesterState } from "../../store/atom";

export default function SemesterSelect() {
  const [semester, setSemester] = React.useState("");
  const setSemesters = useSetRecoilState(semesterState);
  const [test, setTest] = React.useState([]);

  const getSemesters = async () => {
    const sem = await axios.get("http://localhost:8080/api/semester/1");
    setTest(sem.data);
  };
  const handleChange = (event) => {
    setSemester(event.target.value);
    // props.setSemesters(event.target.value);
    setSemesters(event.target.value);
  };
  useEffect(() => {
    getSemesters();
    // props.setSemesters("2022-2");
    // setSemesters("2022-2");
  }, []);

  return (
    <FormControl
      className="selectBar"
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
        <MenuItem value="ALL">
          <em>전기간</em>
        </MenuItem>
        {test.map((m) => (
          <MenuItem value={m.semester}>{m.semester}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
