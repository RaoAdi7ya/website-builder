import React from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage.jsx";
import { BuilderPage } from "./pages/BuilderPage.jsx";
import { Layout } from "./pages/Layout.jsx";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder/:id" element={<BuilderPage />} />
      </Route>
    </Routes>
  );
};

export default App;
