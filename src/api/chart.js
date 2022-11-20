import axios from "axios";

export const getChartMileage = async (semester, grade, department) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/mileage?semester=${semester}&grade=${grade}&department=${department}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getChartPopularity = async (semester, grade, department) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/popularity?semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getChartRank = async (semester, grade, department) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/rank?semester=${semester}&grade=${grade}&department=${department}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getChartTimeline = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/timeline`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );

  return response.data;
};

export const getChartWeightDistribution = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/weight?semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getChartGradeDistribution = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/grade?semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getChartDepartmentDistribution = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/chart/department?semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};
