import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function MdEditor({ register, handleSubmit, onVaild }) {
  return (
    <Box sx={{ mt: 4, maxWidth: "26rem", width: 1 }}>
      <TextField
        id="standard-multiline-static"
        label="Profile.md"
        multiline
        fullWidth
        rows={15.4}
        variant="standard"
        focused
        {...register("readme")}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant={"contained"}
          onClick={handleSubmit(onVaild)}
          p={10}
          sx={{ ml: 13, mt: 3 }}
        >
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
