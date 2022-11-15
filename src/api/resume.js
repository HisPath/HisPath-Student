import axios from "axios";

export const postResume = async (data) => {
  await axios.post(`${process.env.REACT_APP_SERVER}/resume`, data, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
};

export const getInfo = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/resume/info`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/resumes`, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
  return response.data;
};

export const getResumeByResumeId = async (resumeId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/resume?resumeId=${resumeId}`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );
  return response.data;
};

export const putResume = async (id, data) => {
  await axios.put(`${process.env.REACT_APP_SERVER}/resume/${id}`, data, {
    headers: { Authorization: localStorage.getItem("TOKEN") },
  });
};

export const deleteResume = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER}/resume/${id}`);
};
