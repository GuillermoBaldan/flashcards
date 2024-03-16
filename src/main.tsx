import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.scss";
import Layout from "./shared/layout/Layout";
import Home from "./pages/Home/Home";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
