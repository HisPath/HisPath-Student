import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Headers";
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
import DashboardNotice from "./components/Dashboard/Notice";
import Notice from "./pages/Notice";
import Post from "./components/Notice/Post";
import AboutUs from "./pages/AboutUs";
import { useEffect, useState } from "react";
import Page404 from "./pages/Page404";
import { getInfo } from "./api/dashboard";
import GuestLoginModal from "./components/Dashboard/GuestLoginModal";

function Router() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegisted, setIsRegisted] = useState(false);
  useEffect(() => {
    const getUserStatus = async () => {
      const token = localStorage.getItem("TOKEN");
      await getInfo()
        .then(() => setIsRegisted(true))
        .catch(() => setIsRegisted(false));
      if (token) {
        setIsLogin(true);
      }
    };
    getUserStatus();
  }, []);
  return (
    <BrowserRouter>
      {isLogin && <Header />}
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/dashboard/notice" element={<DashboardNotice />} />
            <Route path="/notice/:noticeId" element={<Post />} />
            <Route path="/mileage" element={<MileageStudent />} />
            <Route path="/activity" element={<Activity />} />
            <Route
              path="/activity/detail/:activityId"
              element={<ActivityDetail />}
            />
            <Route path="/activity/add" element={<ActivityAdd />} />
            <Route path="/activity/add/prize" element={<AddPrize />} />
            <Route path="/activity/add/tech" element={<AddTech />} />
            <Route path="/activity/add/edu" element={<AddEdu />} />
            <Route path="/activity/add/blog" element={<AddBlog />} />
            <Route path="/activity/add/intern" element={<AddIntern />} />
            <Route path="/activity/add/cert" element={<AddCert />} />
            <Route path="/activity/add/lang" element={<AddLang />} />
            <Route
              path="/activity/edit/:activityId"
              element={<ActivityEdit />}
            />

            <Route path="/resume/*" element={<Resume />} />
            <Route path="*" element={<Page404 />} />
          </>
        ) : (
          <Route path="*" element={<AboutUs />} />
        )}
      </Routes>
      <GuestLoginModal isLogin={isLogin} isRegisted={isRegisted} />
    </BrowserRouter>
  );
}

export default Router;
