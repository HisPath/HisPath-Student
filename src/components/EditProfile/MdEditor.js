import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function MdEditor() {
  return (
    <Box sx={{ mt: 4, ml: 8, maxWidth: "26rem", width: "24rem" }}>
      <TextField
        id="standard-multiline-static"
        label="Profile.md"
        multiline
        fullWidth
        rows={15.4}
        defaultValue="# Kimhandong
        ### ⭐️ TECH STACK ⭐️
        [![JAVA](https://img.shields.io/badge/Java-ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)](#)
          [![JavaScript](https://img.shields.io/badge/JAVASCRIPT-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=323330)](#)
          [![Figma](https://img.shields.io/static/v1?style=for-the-badge&message=Figma&color=F24E1E&logo=Figma&logoColor=FFFFFF&label=)](#)
          [![Flutter](https://img.shields.io/badge/Flutter-00c7fa.svg?&style=for-the-badge&logo=Flutter&logoColor=white)](#)
          [![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)](#)
          [![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)](#)
          [![React
          JS](https://img.shields.io/badge/ReactJs-61DAFB?.svg&style=for-the-badge&logo=react&logoColor=white)](#)"
        variant="standard"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant={"contained"} p={10} sx={{ ml: 13, mt: 3 }}>
          프로필 수정
        </Button>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <Button variant={"outlined"} p={10} sx={{ ml: 2, mt: 3 }}>
            취소
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
