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

export const addActivity = async (formdata, sec) => {
  await axios.post(`${process.env.REACT_APP_SERVER}/student-activity/1`, {
    ...formdata,
    section: sec,
  });
};

export const getActivity = async (activityId) => {
  const activity = await axios.get(
    `${process.env.REACT_APP_SERVER}/activity-detail/${activityId}`
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
    {}
  );
};
