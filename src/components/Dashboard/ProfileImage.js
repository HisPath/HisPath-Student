import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInfo } from "../../api/dashboard";
import userImg from "../../assets/user.png";

export default function ProfileImage() {
  const [info, setInfo] = useState([]);

  const getDashboardInfo = async () => {
    const info = await getInfo();
    setInfo(info.data);
  };

  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <>
      <Avatar
        alt="K"
        src={`${info.profile}`}
        sx={{ width: 256, height: 256, ml: 5, mt: 5, mb: 0 }}
      />
      <Link to={`/edit`} style={{ textDecoration: "none" }}>
        <Button
          variant={"contained"}
          p={10}
          sx={{ ml: 30, mt: -3, borderRadius: 8 }}
          color={"secondary"}
        >
          프로필 수정
        </Button>
      </Link>
    </>
  );
}
