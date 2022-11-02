import axios from "axios";

export const getActivities = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/student-activities/1?section=ALL&semester=ALL"
  );
  return response.data;
};

export const getActivitiesBySec = async (section) => {
  const response = await axios.get(
    `http://localhost:8080/api/student-activities/1?semester=ALL&section=${section}`
  );
  return response.data;
};

export const getActivitiesBySem = async (semester) => {
  const response = await axios.get(
    `http://localhost:8080/api/student-activities/1?section=ALL&semester=${semester}`
  );
  return response.data;
};

export const getSemesters = async () => {
  const response = await axios.get("http://localhost:8080/api/semester");
  return response.data;
};

export const getTags = async () => {
  const response = await axios.get("http://localhost:8080/api/sections");
  return response.data;
};
