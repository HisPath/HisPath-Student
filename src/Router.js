import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Activity from "./pages/Activity";
import ActivityDetail from "./pages/ActivityDetail";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import MileageStudent from "./pages/MileageStudent";

function Router() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity/detail" element={<ActivityDetail />} />
        <Route path="/mileage" element={<MileageStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
