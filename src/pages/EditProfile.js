import { Container } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import EditForm from "../components/EditProfile/EditForm";
import MdEditor from "../components/EditProfile/MdEditor";
import Title from "../components/EditProfile/Title";

export default function EditProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const [info, setInfo] = useState([]);
  const getInfo = async () => {
    const info = await axios.get("http://localhost:8080/api/student/1");
    console.log("불러온 데이터", info.data);
    setInfo(info.data);
  };

  const updateInfo = async (data) => {
    await axios.put("http://localhost:8080/api/student/1", {
      ...data,
    });
  };
  useEffect(() => {
    getInfo();
    getMajors();
  }, []);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return info;
    }, [info]),
  });
  useEffect(() => {
    reset(info);
  }, [info]);

  const onValid = (data) => {
    setInfo(data);
    console.log(data);
    updateInfo(data);
    enqueueSnackbar("수정되었습니다.", { variant: "success" });
  };

  const [majors, setMajors] = useState([]);
  const getMajors = async () => {
    const major = await axios.get("http://localhost:8080/api/majors");
    console.log(major.data);
    setMajors(major.data);
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex", mt: 10, gap: 5 }}>
      <Title register={register} />
      <EditForm watch={watch} register={register} majors={majors} />
      <MdEditor
        register={register}
        handleSubmit={handleSubmit}
        onValid={onValid}
      />
    </Container>
  );
}
