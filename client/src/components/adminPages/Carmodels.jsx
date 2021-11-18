import { useState } from "react";
import { AdminNavbar } from "../";
import { Navbar } from "../";
import Axios from "axios";
import { id } from "../Home";

function Carmodels() {
  // States
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(0);
  const [carmodelList, setCarmodelList] = useState([]);

  const getCarmodels = () => {
    Axios.get("http://localhost:3001/carmodels").then((response) => {
      setCarmodelList(response.data);
    });
  };

  const newCarmodel = () => {
    console.log("HEJ");

    Axios({
      method: "post",
      url: "http://localhost:3001/carmodels",
      headers: {},
      data: {
        brand: brand,
        model: model,
        price: price,
      },
    }).then((response) => {
      console.log("Infört: Brand: " + brand);
    });
  };

  /*
  Det beter sig extremt konstigt om detta ej är utkommenterat, men detta är skalet till en remove-metod
  const removeCarmodel = (id) => {
    Axios({
      method: "delete",
      url: "http://localhost:3001/carmodels",
      headers: {},
      data: {
        id: id,
      },
    }).then((response) => {
      console.log("Tagit bort: id: " + id);
      setCarmodelList(
        carmodelList.filter((val) => {
          return val.id == id;
        })
      );
    });
  };
  */

  return (
    <>
      <Navbar />
      <AdminNavbar />
      <div>
        <div class="container">
          <div>
            <h1>Carmodels</h1>
            <div>
              <button onClick={getCarmodels}>Show carmodels</button>
              {carmodelList.map((val, key) => {
                return (
                  <div>
                    id: {val.id}, brand: {val.brand}, model: {val.model}, price:{" "}
                    {val.price}
                    {/* <button onClick={removeCarmodel(val.id)}>-</button> */}
                  </div>
                );
              })}
            </div>
            <div>
              Brand:
              <input
                type="text"
                id="brand"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
              Model:
              <input
                type="text"
                onChange={(event) => {
                  setModel(event.target.value);
                }}
              />
              Price:
              <input
                type="text"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <button onClick={newCarmodel}>New carmodel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carmodels;
