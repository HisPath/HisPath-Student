import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getResumes } from "../api/resume";
import Edit from "../components/Resume/Edit";
import List from "../components/Resume/List";
import Post from "../components/Resume/Post";

function Resume() {
  const [resumes, setResumes] = useState([]);
  const refresh = () => {
    getResumes().then((data) => {
      setResumes(data);
    });
  };
  useEffect(() => {
    refresh();
  }, []);
  return (
    <Routes>
      <Route index element={<List resumes={resumes} />} />
      <Route path="post" element={<Post refresh={refresh} />} />
      <Route path="edit/:resumeId" element={<Edit refresh={refresh} />} />
    </Routes>
  );
}

export default Resume;
