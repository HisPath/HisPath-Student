import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { semesterState } from "../../store/atom";
import { getSemesters } from "../../api/mileage";
import styles from "../../style/mileage.module.css";

export default function SemesterSelect() {
  const [semesterText, SetSemesterText] = React.useState("");
  const setSemesters = useSetRecoilState(semesterState);
  const [test, setTest] = React.useState([]);

  const handleChange = (event) => {
    SetSemesterText(event.target.value);
    setSemesters(event.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const semester = await getSemesters();
      setTest(semester);
    };
    fetch();
  }, []);

  return (
    <FormControl
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
        backgroundColor: "white",
      }}
      size="small"
    >
      <InputLabel id="demo-select-small" sx={{ paddingTop: 1 }}>
        학기
      </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={semesterText}
        label="2022-1학기"
        onChange={handleChange}
        sx={{ minWidth: 100 }}
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
