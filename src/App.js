import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [ID, setID] = useState(0);
  const [Name, setName] = useState("");
  const [District, setDistrict] = useState("");
  const [CountryCode, setCountryCode] = useState("");

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const clearEmployee = () => {
    setData([]);
    setLoading(true);
  };
  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        Name: Name,
        CountryCode: CountryCode,
        District: District,
      })
      .then(getEmployee());
  };

  const getEmployee = () => {
    const url = "http://localhost:3001/read";

    console.log("Fetching data...");
    axios
      .get(url)
      .then((response) => {
        console.log("Data fetched successfully:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setData(
        data.filter((val) => {
          return val.ID != id;
        })
      );
    });
  };
  const updateEmployee = (id) => {
    alert(id);
    setID(id);
  };
  const confirmupdate = (id) => {
    alert(id);
  };
  // useEffect(() => {
  //   getEmployee();
  // });

  return (
    <div className="bodyht">
      <h1>MYAPP</h1>
      <div className="commantbox">
        <div>
          <label htmlFor="country">Name:</label>
          <input
            type="text"
            className="form-control"
            id="textNe"
            placeholder="Enter Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label htmlFor="country">CountryCode:</label>
          <input
            type="text"
            className="form-control"
            id="textCC"
            maxLength={3}
            placeholder="Enter CountryCode"
            onChange={(event) => {
              setCountryCode(event.target.value);
            }}
          />
          <label htmlFor="country">District:</label>
          <input
            type="text"
            className="form-control"
            id="textDt"
            placeholder="Enter District"
            onChange={(event) => {
              setDistrict(event.target.value);
            }}
          />
        </div>
        <div className="commantbox2">
          <button
            className="btn btn-warning"
            style={{ width: "100%" }}
            onClick={() => {
              getEmployee();
            }}
          >
            getEmployee
          </button>
          <button
            className="btn btn-danger"
            style={{ width: "100%" }}
            onClick={() => {
              clearEmployee();
            }}
          >
            clearEmployee
          </button>
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => {
              addEmployee();
            }}
          >
            AddEmployee
          </button>
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => {
              confirmupdate(ID);
            }}
          >
            confirmupdate
          </button>
        </div>
      </div>

      <table
        class="table table-dark table-striped"
        style={{
          width: "75%",
          border: "solid 3px black",
          alignItems: "center",
          margin: "auto",
          // position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>

        {loading ? (
          <div>
            <p>Loading...</p>
            <div className="loader"></div>
          </div>
        ) : (
          <tbody>
            {data.map((item) => (
              <tr>
                <th scope="row">
                  <p>{item.ID}</p>
                </th>
                <td>
                  <p>{item.Name}</p>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    id={item.ID}
                    style={{ width: "auto" }}
                    onClick={() => deleteEmployee(item.ID)}
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    style={{ width: "auto" }}
                    onClick={() => updateEmployee(item.ID)}
                  >
                    Updateinfo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default App;
