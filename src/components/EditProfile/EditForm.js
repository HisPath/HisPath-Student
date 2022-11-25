import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { getDepartment } from "../../api/editprofile";

export default function EditForm({ watch, register, majors }) {
  const [departments, setDepartments] = React.useState([]);

  const getDepartments = async () => {
    const department = await getDepartment();
    setDepartments(department.data);
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <Box sx={{ mt: 3, width: 1 }}>
      <Box display={"flex"} alignItems="baseline" gap={1}>
        <Typography
          fontSize={"2.1rem"}
          fontWeight={900}
          fontFamily="Ubuntu"
          color="secondary.dark"
        >
          {watch("name")}
        </Typography>

        <Typography
          mt={1}
          mb={1}
          fontSize={"1.3rem"}
          fontWeight={600}
          color="secondary.dark"
        >
          {Math.ceil(watch("semester") / 2)}학년 {watch("semester")}학기
        </Typography>
      </Box>
      <Typography mt={1} mb={1} fontSize={"1.5rem"} fontWeight={600}>
        {watch("studentNum")}
      </Typography>
      <Typography mt={2} mb={2} fontSize={"1.2rem"} fontWeight={400}>
        {watch("email")}
      </Typography>
      <Box m={1}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label" shrink={true}>
            학부
          </InputLabel>
          <NativeSelect {...register("department")}>
            {departments.map((department, index) => (
              <option key={index} value={department.name}>
                {department.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
      <Box display={"flex"} gap={2}>
        <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
          <InputLabel id="demo-simple-select-standard-label" shrink={true}>
            1 전공
          </InputLabel>
          <NativeSelect {...register("major1Id")}>
            {majors.map((major, index) => (
              <option key={index} value={index + 1}>
                {major.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
          <InputLabel id="demo-simple-select-standard-label" shrink={true}>
            2 전공
          </InputLabel>
          <NativeSelect {...register("major2Id")}>
            {majors.map((major, index) => (
              <option key={index} value={index + 1}>
                {major.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Box>
      <Box display={"flex"}>
        <TextField
          id="standard-multiline-flexible"
          label="Contact"
          multiline
          maxRows={4}
          {...register("phone")}
          variant="standard"
          sx={{ m: 1, width: 1 }}
          focused
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <GitHubIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          multiline
          label="Github Id"
          variant="standard"
          {...register("githubId")}
          sx={{ width: 1, mr: 1 }}
          focused
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
        <LinkIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          multiline
          label="Blog Url"
          {...register("blog")}
          variant="standard"
          sx={{ width: 1, mr: 1 }}
          focused
        />
      </Box>
    </Box>
  );
}
