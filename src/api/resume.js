import axios from "axios";

export const postResume = async (data) => {
  await axios.post("http://localhost:8080/api/resume", data);
};

export const getInfo = async () => {
  const response = await axios.get("http://localhost:8080/api/resume/info");
  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get("http://localhost:8080/api/resumes");
  return response.data;
};

export const getResumeByResumeId = async (resumeId) => {
  const response = await axios.get(
    `http://localhost:8080/api/resume?resumeId=${resumeId}`
  );
  return response.data;
};

export const putResume = async (id, data) => {
  await axios.put(`http://localhost:8080/api/resume/${id}`, data);
};

export const deleteResume = async (id) => {
  await axios.delete(`http://localhost:8080/api/resume/${id}`);
};
