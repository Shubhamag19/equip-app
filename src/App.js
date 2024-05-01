import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import OpenPositions from "./pages/OpenPositions";
import CreatePositions from "./pages/CreatePositions";
import ApplicationStatus from "./pages/ApplicationStatus";
import ApplyPosition from "./pages/ApplyPosition";

import "./styles/index.scss";

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/open-positions" element={<OpenPositions />} />
      <Route path="/create-position" element={<CreatePositions />} />
      <Route path="/:position/application-status" element={<ApplicationStatus />} />
      <Route path="/:position/apply" element={<ApplyPosition />} />
    </Routes>
  </>
}

export default App;
