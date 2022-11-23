import { Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { getMajor, getStudentInfo, updateInfoData } from "../api/editprofile";
import EditForm from "../components/EditProfile/EditForm";
import MdEditor from "../components/EditProfile/MdEditor";
import Title from "../components/EditProfile/Title";

export default function EditProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const [info, setInfo] = useState([]);
  const getInfo = async () => {
    const info = await getStudentInfo();
    setInfo(info.data);
  };

  const updateInfo = async (data) => {
    await updateInfoData(data);
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
    updateInfo(data);
    enqueueSnackbar("수정되었습니다.", { variant: "success" });
    window.location.replace(`/dashboard`);
  };

  const [majors, setMajors] = useState([]);
  const getMajors = async () => {
    const major = await getMajor();
    console.log(major.data);
    setMajors(major.data);
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex", mt: 10, gap: 5 }}>
      <Title info={info} getInfo={getInfo} />
      <EditForm watch={watch} register={register} majors={majors} />
      <MdEditor
        register={register}
        handleSubmit={handleSubmit}
        onValid={onValid}
      />
    </Container>
  );
}
