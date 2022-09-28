import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Main from "./pages/Main";
import MileageStudent from "./pages/MileageStudent";
function Router() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mileage" element={<MileageStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
