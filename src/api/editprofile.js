import axios from "axios";

export const updateInfo = async (profile, info) => {
  await axios.put(
    `${process.env.REACT_APP_SERVER}/student/1`,
    {
      ...info,
      profile,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
};

export const getDepartment = async () => {
  const department = await axios.get(
    `${process.env.REACT_APP_SERVER}/departments`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return department;
};

export const updateInfoData = async (data) => {
  await axios.put(
    `${process.env.REACT_APP_SERVER}/student/1`,
    {
      ...data,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
};

export const getStudentInfo = async () => {
  const info = await axios.get(`${process.env.REACT_APP_SERVER}/student/1`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return info;
};

export const getMajor = async () => {
  const major = await axios.get(`${process.env.REACT_APP_SERVER}/majors`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return major;
};
