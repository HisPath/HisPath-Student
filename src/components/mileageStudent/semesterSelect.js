import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SemesterSelect() {
  const [semester, setSemester] = React.useState("");

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

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
      <InputLabel id="demo-select-small">학기</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={semester}
        label="2022-1학기"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"2020-1"}>2020-1</MenuItem>
        <MenuItem value={"2020-2"}>2020-2</MenuItem>
        <MenuItem value={"2021-1"}>2021-1</MenuItem>
        <MenuItem value={"2021-2"}>2021-2</MenuItem>
        <MenuItem value={"2022-1"}>2022-1</MenuItem>
      </Select>
    </FormControl>
  );
}
