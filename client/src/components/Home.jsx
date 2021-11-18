import React from "react";
import { NavLink } from "react-router-dom";
import history from "../history";
import Axios from "axios";

var id = -1;

function Home() {
  const checkAndSendUserOn = () => {
    // if username matches user, then give that page the info of that user
    // if user == admin, send to admin page
    id = -1;
    var userName = document.getElementById("user").value;
    if (userName === "admin") {
      history.push("/admin");
    } else {
      var employeeList = [];
      Axios.get("http://localhost:3001/employees").then((response) => {
        employeeList = response.data;
        userName = parseInt(userName);
        for (var i = 0; i < employeeList.length; i++) {
          if (userName === employeeList[i].id) {
            id = userName;
            console.log(id);
            history.push("/employee");
          }
        }
      });
    }
  };

  return (
    <>
      <div>
        <div class="container">
          <div>
            <div>
              <h1>Carshop</h1>
              <p>Welcome to Carshop.</p>
            </div>
            <div>
              <label>User name:</label>
              <input type="text" id="user"></input>
            </div>
            <div>
              <label>Password:</label>
              <input type="text"></input>
            </div>
            <div>
              <NavLink to="/admin">Log in admin</NavLink>
            </div>
            <div>
              <NavLink to="/employee">Log in employee</NavLink>
            </div>
            <button onClick={checkAndSendUserOn}>Log in</button>
          </div>
        </div>
      </div>
    </>
  );
}

export { id };
export default Home;
