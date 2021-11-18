import { useState } from "react";
import { AdminNavbar } from "../";
import { Navbar } from "../";
import Axios from "axios";

function Sales() {
  // States
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [sales, setSales] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployeeList = () => {
    Axios.get("http://localhost:3001/total_sales").then((response) => {
      setEmployeeList(response.data);
    });
  };

  return (
    <>
      <Navbar />
      <AdminNavbar />
      <div>
        <div class="container">
          <div>
            <div>
              <h1>Sales</h1>
              <div>
                <button onClick={getEmployeeList}>Show total sales</button>
                {employeeList.map((val, key) => {
                  return (
                    <div>
                      id: {val.id}, name: {val.name}, sales: {val.sales}
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

export default Sales;
