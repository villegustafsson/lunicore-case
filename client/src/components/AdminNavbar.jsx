import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

function AdminNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/employees">
                  Employees
                  {/* <span className="sr-only">(current)</span> */}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/carmodels">
                  Carmodels
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/sales">
                  Sales
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
