import axios from "axios";

export const applyMyActivity = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/activity/apply/${id}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getMyActivitiesBySemCate = async (section, semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-activities/status?semester=${semester}&section=${section}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/categories`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getActivities = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/studentmileage/1`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );

  return response.data;
};

export const getSemesters = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/semester/18`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getActivitiesBySemCate = async (category, semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-allmactivities/18?semester=${semester}&category=${category}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};
