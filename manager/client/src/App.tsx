import { BrowserRouter, Routes, Route } from "react-router-dom";
import Devices from "./pages/Devices/Devices";
import Scenarios from "./pages/Scenarios/Scenarios";
import Functions from "./pages/Functions/Functions";
import Navbar from './pages/Navbar/Navbar';
import NoPage from './pages/NoPage';
function App() {
  return (
    <div className="bg-gray-100 shadow-md min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Devices />} />
            <Route path="device/:name" element={<Functions />} />
            <Route path="scenarios" element={<Scenarios />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}
export default App;
