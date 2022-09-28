import userImg from "../../assets/user.png";
import { Avatar, Box, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function Title() {
  return (
    <Box>
      <Avatar
        alt="K"
        src={userImg}
        sx={{ width: 256, height: 256, mr: 10, mt: 9, mb: 0 }}
      />
      <IconButton
        sx={{ ml: 25, mt: -6 }}
        color="primary"
        aria-label="upload picture"
        component="label"
      >
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </Box>
  );
}
