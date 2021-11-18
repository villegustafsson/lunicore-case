import React from "react";
import { Navbar } from ".";
import { id } from "./Home";

function Employee() {
  console.log(id);
  if (id !== -1) {
    return (
      <>
        <Navbar />
        <div>
          <div class="container">
            <div>
              <div>
                <h1>Employee {id}</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div>
          <div class="container">
            <div>
              <div>
                <h1>Employee</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Employee;
