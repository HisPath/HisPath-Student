import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Activity from "./pages/Activity";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import MileageStudent from "./pages/MileageStudent";
import ActivityDetail from "./components/Activity/ActivityDetail";
import ActivityAdd from "./components/Activity/ActivityAdd";
import ActivityEdit from "./components/Activity/ActivityEdit";

function Router() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/mileage" element={<MileageStudent />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity/detail" element={<ActivityDetail />} />
        <Route path="/activity/add" element={<ActivityAdd />} />
        <Route path="/activity/edit" element={<ActivityEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
