import { BrowserRouter, Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Dashboard from "./pages/Dashboard";

function Router() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
