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
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditForm() {
  const [info, setInfo] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);

  const getInfo = async () => {
    const info = await axios.get("http://localhost:8080/api/student/1");
    setInfo(info.data);
  };

  const getDepartments = async () => {
    const department = await axios.get("http://localhost:8080/api/departments");
    setDepartments(department.data);
  };

  useEffect(() => {
    getInfo();
    getDepartments();
  }, []);

  const [major1, setMajor1] = React.useState(info.major1);
  const [major2, setMajor2] = React.useState(info.major2);
  const [contact, setContact] = React.useState();
  const [github, setGithub] = React.useState();
  const [blog, setBlog] = React.useState();

  const handleChangeOne = (event) => {
    setMajor1(event.target.value);
  };

  const handleChangeTwo = (event) => {
    setMajor2(event.target.value);
  };

  const changeContact = (event) => {
    setContact(event.target.value);
  };

  const changeGithub = (event) => {
    setGithub(event.target.value);
  };

  const changeBlog = (event) => {
    setBlog(event.target.value);
  };

  return (
    <>
      <Box sx={{ mt: 3, ml: 5 }}>
        <Typography
          mb={1}
          fontSize={"2.1rem"}
          fontWeight={900}
          fontFamily="Ubuntu"
          color="primary.light"
        >
          {info.name} {info.studentNum}
        </Typography>
        <Typography mt={1} mb={1} fontSize={"1.3rem"} fontWeight={600}>
          {info.departmentName} {Math.floor(info.semester / 2)}학년{" "}
          {info.semester}학기
        </Typography>
        <Typography mt={2} mb={2} fontSize={"1.2rem"} fontWeight={400}>
          {info.email}
        </Typography>
        <Box display={"flex"} gap={2}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label" shrink={true}>
              1 전공
            </InputLabel>
            <NativeSelect defaultValue={info.major1} onChange={handleChangeOne}>
              {departments.map((department) => (
                <option value={department.name}>{department.name}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label" shrink={true}>
              2 전공
            </InputLabel>
            <NativeSelect defaultValue={info.major2} onChange={handleChangeTwo}>
              {departments.map((department) => (
                <option value={department.name}>{department.name}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>

        <TextField
          id="standard-multiline-flexible"
          label="Contact"
          multiline
          maxRows={4}
          defaultValue={info.phone}
          onChange={changeContact}
          variant="standard"
          sx={{ m: 1, width: "16.9rem" }}
          focused
        />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <GitHubIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            multiline
            label="Github Id"
            variant="standard"
            defaultValue={info.githubId}
            sx={{ width: "15.4rem" }}
            onChange={changeGithub}
            focused
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
          <LinkIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            multiline
            label="Blog Url"
            defaultValue={info.blog}
            onChange={changeBlog}
            variant="standard"
            sx={{ width: "15.4rem" }}
            focused
          />
        </Box>
      </Box>
    </>
  );
}
