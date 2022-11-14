import axios from 'axios';

export const getNoticeById = async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/notice/${id}`, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};

export const getNotices = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/notice`, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};

export const getImpNotices = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/notice/imp`, {
    headers: { Authorization: localStorage.getItem('TOKEN') },
  });
  return response.data;
};
