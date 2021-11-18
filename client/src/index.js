import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Footer,
  Home,
  Employee,
  Employees,
  Carmodels,
  Sales,
} from "./components";

ReactDOM.render(
  <Router>
    {/* <Navigation /> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/admin" element={<Employees />} />
      <Route path="/admin/employees" element={<Employees />} />
      <Route path="/admin/carmodels" element={<Carmodels />} />
      <Route path="/admin/sales" element={<Sales />} />
    </Routes>
    {/* <Footer /> */}
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
