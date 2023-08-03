import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete Api
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8000/${id}`)
      .then((response) => {
        console.log("Row Deleted succesfullt", response.data);
        fetchData();
      })
      .catch((error) => {
        console.log("Error Deleting row", error);
      });
  };

  // Read Api

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error Fetching data:", error);
      setLoading(false);
    }
  };
  // useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="mt-2">
        <h1 className="text-dark  text-center">Employee Managment</h1>
        <table className="table table-hover table-bordered border-dark  ">
          <thead>
            <tr className="table-dark">
              <th scope="col">S.No</th>
              <th scope="col">NAME</th>
              <th scope="col">ID</th>
              <th scope="col">PHONE</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">DEPARTMENT</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.department}</td>
                  <td>
                    <Link
                      to={`/edit/${item._id}`}
                      className="btn btn-success m-2 "
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    <Link to="/" className="btn btn-primary m-2 ">
                      Create
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Read;
