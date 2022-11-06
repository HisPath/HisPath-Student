import { Box, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import Edit from "../components/Resume/Edit";
import List from "../components/Resume/List";
import Post from "../components/Resume/Post";
import View from "../components/Resume/View";

function Resume() {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 8 }}>
        이력서
      </Typography>
      <Box sx={{ display: "flex", gap: 1, my: 3 }}>
        <Link to="">리스트</Link>
        <Link to="view">view</Link>
        <Link to="post">post</Link>
        <Link to="edit">edit</Link>
      </Box>
      <Routes>
        <Route index element={<List />} />
        <Route path="view" element={<View />} />
        <Route path="post" element={<Post />} />
        <Route path="edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default Resume;
