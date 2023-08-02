import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete Api
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:7000/${id}`)
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
      const response = await axios.get("http://localhost:7000/");
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
        <table className="table table-hover table-bordered border-dark  ">
          <thead>
            <tr className="table-dark">
              <th scope="col">S.No</th>
              <th scope="col">Book Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
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
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link
                      to={`/Edit/${item._id}`}
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
