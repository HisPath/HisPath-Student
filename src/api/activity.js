import axios from "axios";

export const getActivities = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-activities/1?section=ALL&semester=ALL`
  );
  return response.data.reverse();
};

export const getActivitiesBySec = async (section) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-activities/1?semester=ALL&section=${section}`
  );
  return response.data.reverse();
};

export const getActivitiesBySem = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-activities/1?section=ALL&semester=${semester}`
  );
  return response.data.reverse();
};

export const getSemesters = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/semester`);
  return response.data.reverse();
};

export const getTags = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/sections`);
  return response.data;
};
