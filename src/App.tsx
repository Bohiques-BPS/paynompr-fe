import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Activation from "./pages/Activation";
import Register from "./pages/Register";

import OutLayout from "./layouts/OutLayout";
import InLayout from "./layouts/InLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OutLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          <Route path="/activacion" element={<Activation />} />
        </Route>
        <Route path="/" element={<InLayout />}>
          <Route path="/in" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
