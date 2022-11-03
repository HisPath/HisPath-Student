import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Activity from "./pages/Activity";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import MileageStudent from "./pages/MileageStudent";
import ActivityDetail from "./components/Activity/ActivityDetail";
import ActivityAdd from "./components/Activity/ActivityAdd";
import ActivityEdit from "./components/Activity/ActivityEdit";
import AddPrize from "./components/Activity/Add/AddPrize";
import AddTech from "./components/Activity/Add/AddTech";
import AddEdu from "./components/Activity/Add/AddEdu";
import AddBlog from "./components/Activity/Add/AddBlog";
import AddIntern from "./components/Activity/Add/AddIntern";
import AddCert from "./components/Activity/Add/AddCert";
import AddLang from "./components/Activity/Add/AddLang";
import Resume from "./pages/Resume";
import Notice from "./components/Dashboard/Notice";
import Post from "./components/Notice/Post";

function Router() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:noticeId" element={<Post />} />
        <Route path="/mileage" element={<MileageStudent />} />
        <Route path="/activity/*" element={<Activity />} />
        <Route path="/activity/detail" element={<ActivityDetail />} />
        <Route path="/activity/add" element={<ActivityAdd />} />
        <Route path="/activity/add/prize" element={<AddPrize />} />
        <Route path="/activity/add/tech" element={<AddTech />} />
        <Route path="/activity/add/edu" element={<AddEdu />} />
        <Route path="/activity/add/blog" element={<AddBlog />} />
        <Route path="/activity/add/intern" element={<AddIntern />} />
        <Route path="/activity/add/cert" element={<AddCert />} />
        <Route path="/activity/add/lang" element={<AddLang />} />
        <Route path="/activity/edit" element={<ActivityEdit />} />
        <Route path="/resume/*" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
