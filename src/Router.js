import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";

function Router() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
