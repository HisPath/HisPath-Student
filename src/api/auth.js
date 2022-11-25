import axios from "axios";

export const getGuestUser = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/auth/login-student/guest/token`
  );
  return response;
};
