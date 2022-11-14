import axios from 'axios';

export const postResume = async (data) => {
  await axios.post('http://localhost:8080/api/resume', data, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
};

export const getInfo = async () => {
  const response = await axios.get('http://localhost:8080/api/resume/info', {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};

export const getResumes = async () => {
  const response = await axios.get('http://localhost:8080/api/resumes', {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};

export const getResumeByResumeId = async (resumeId) => {
  const response = await axios.get(`http://localhost:8080/api/resume?resumeId=${resumeId}`, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};

export const putResume = async (id, data) => {
  await axios.put(`http://localhost:8080/api/resume/${id}`, data, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
};

export const deleteResume = async (id) => {
  await axios.delete(`http://localhost:8080/api/resume/${id}`);
};
