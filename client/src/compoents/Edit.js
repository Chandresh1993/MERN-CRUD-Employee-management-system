import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  // Navigate hook
  const navigate = useNavigate();

  // Parms Hook
  const { id } = useParams();

  // Storing all input field into one useState.
  console.log(id);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // State to store error meassages if any
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:7000/${id}`, formData)
      .then((response) => {
        console.log("Data successfully Edit to API", response.data);
        navigate("/Read");
      })
      .then()
      .catch((error) => {
        console.log("Error posting data to API", error);
      });
  };

  // Get Data from Api
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:7000/${id}`);
    setFormData(result.data);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="mt-2">
          <form
            className="p-3 mb-2 bg-success text-white"
            onSubmit={handleSubmit}
          >
            <h1 className="text-dark">Edit Book Store Data</h1>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Book Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Price</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
