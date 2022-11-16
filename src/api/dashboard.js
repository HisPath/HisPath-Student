import axios from "axios";

export const getInfo = async () => {
  const info = await axios.get(
    `${process.env.REACT_APP_SERVER}/student/dashboard`,
    {
      headers: { Authorization: localStorage.getItem("TOKEN") },
    }
  );

  return info;
};
