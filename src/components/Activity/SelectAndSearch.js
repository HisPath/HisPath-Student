import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function SelectAndSearch() {
  const [semester, setSemester] = React.useState("");

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  return (
    <Box display={"flex"} justifyContent="space-between">
      <Box display={"flex"} alignItems="center">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-filled-label">Semester</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={semester}
            label="Semester"
            onChange={handleChange}
          >
            <MenuItem value={"22 - 2"}>22-2</MenuItem>
            <MenuItem value={"22 - 1"}>22-1</MenuItem>
            <MenuItem value={"21 - 2"}>21-2</MenuItem>
            <MenuItem value={"21 - 1"}>21-1</MenuItem>
          </Select>
        </FormControl>
        <TextField
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
        />
      </Box>
      <Box display={"flex"} alignItems="center" sx={{ mr: 1 }}>
        <Link to={`/activity/add`} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              backgroundColor: "secondary.main",
              fontWeight: "600",
              pl: 3,
              pr: 3,
            }}
            variant="contained"
          >
            활동 추가
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
