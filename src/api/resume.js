import axios from "axios";

export const postResume = async (data) => {
  console.log(data);
  const response = await axios.post("http://localhost:8080/api/resume", data);
  return response.data;
};
