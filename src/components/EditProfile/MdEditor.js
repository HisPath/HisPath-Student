import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function MdEditor({ register, handleSubmit, onValid }) {
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
          onClick={handleSubmit(onValid)}
          p={10}
          sx={{
            ml: 13,
            mt: 3,
            borderRadius: 8,
            backgroundColor: "secondary.main",
          }}
        >
          프로필 수정
        </Button>
        <Link to={`/dashboard`} style={{ textDecoration: "none" }}>
          <Button
            variant={"outlined"}
            p={10}
            sx={{
              ml: 2,
              mt: 3,
              borderRadius: 8,
              color: "secondary.main",
              borderColor: "secondary.main",
            }}
          >
            취소
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
