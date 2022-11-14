import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  getActivities,
  getActivitiesBySem,
  getSemesters,
} from "../../api/activity";
import { activityState } from "../../store/atom";

export default function SelectAndSearch() {
  const [semesters, setSemesters] = useState([]);
  const setActivities = useSetRecoilState(activityState);
  useEffect(() => {
    getSemesters().then((data) => {
      setSemesters(data);
    });
  }, []);
  const changeSemesters = (event) => {
    if (!event.target.value)
      getActivities().then((data) => setActivities(data));
    else
      getActivitiesBySem(event.target.value).then((data) =>
        setActivities(data)
      );
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-filled-label">Semester</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          // value={}
          label="Semester"
          onChange={changeSemesters}
          displayEmpty
        >
          <MenuItem value="ALL">ALL</MenuItem>
          {semesters.map((semester) => (
            <MenuItem value={semester.semester} key={semester.semester}>
              {semester.semester}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <TextField
          placeholder="Search"
          id="outlined-size-small"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
    </>
  );
}
