import axios from "axios";

export const getActivities = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-activities/1?section=ALL&semester=ALL`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data.reverse();
};

export const getActivitiesBySec = async (section) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-activities/1?semester=ALL&section=${section}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data.reverse();
};

export const getActivitiesBySem = async (semester) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/student-activities/1?section=ALL&semester=${semester}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data.reverse();
};

export const getSemesters = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/semester`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data.reverse();
};

export const getTags = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/sections`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const addActivity = async (formdata, sec) => {
  await axios.post(
    `${process.env.REACT_APP_SERVER}/student-activity/1`,
    {
      ...formdata,
      section: sec,
    },
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
};

export const getActivity = async (activityId) => {
  const activity = await axios.get(
    `${process.env.REACT_APP_SERVER}/activity-detail/${activityId}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return activity.data;
};

export const editActivity = async (activityId) => {
  // await axios.put(
  //   `${process.env.REACT_APP_SERVER}/student-activity/${activityId}`
  // );
};

export const deleteActivity = async (activityId) => {
  await axios.delete(
    `${process.env.REACT_APP_SERVER}/activity/student/${activityId}`,
    {},
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
};
