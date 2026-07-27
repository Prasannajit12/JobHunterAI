import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import CoverLetter from "./pages/CoverLetter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;