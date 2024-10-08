import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "../pages/Home";
import List from "../pages/List";
import Loan from "../pages/Loan";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/loan" element={<Loan />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
