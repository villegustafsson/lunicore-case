//import React from "react";
import { useState } from "react";
import { AdminNavbar } from "../";
import { Navbar } from "../";
//import getEmployees from "../../App.js";
import Axios from "axios";

function Employees() {
  // States
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };
  //getEmployees();

  return (
    <>
      <Navbar />
      <AdminNavbar />
      <div>
        <div class="container">
          <div class="row align-items-center my-5">
            <div>
              <h1>Employees</h1>
              <div>
                <button onClick={getEmployees}>Show employees</button>
                {employeeList.map((val, key) => {
                  return (
                    <div>
                      id: {val.id}, Name: {val.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employees;
