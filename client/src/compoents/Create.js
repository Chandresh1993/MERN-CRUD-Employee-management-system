import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    phone: "",
    address: "",
    department: "",
  });

  // State to store error meassage.
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

    // Make sure all Fields are filled

    if (
      !formData.name ||
      !formData.id ||
      !formData.phone ||
      !formData.address ||
      !formData.department
    ) {
      setErrors({
        name: !formData.name ? "Employee NAme is reuired" : "",
        id: !formData.id ? "Employee id is reuired" : "",
        phone: !formData.phone ? "Employee Phone is reuired" : "",
        address: !formData.address ? "Employee Address is reuired" : "",
        department: !formData.department ? "Employee departement is reuired" : "",
      });
    }
    await axios
      .post("http://localhost:8000/", formData)
      .then((response) => {
        console.log("Data successfully posted to API", response.data);
        navigate("/read");
      })
      .then()
      .catch((error) => {
        console.log("Error posting data to API", error);
        // handle The error response from the server
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors);
        }
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="mt-2">
          <h1 className="text-dark">Employee Managment</h1>
          <form className="p-3 mb-2 bg-dark text-white" onSubmit={handleSubmit}>
            <h1 className="text-dark">Employee Managment</h1>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Employee Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span>{errors.name}</span>}
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Employee id</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                />
                {errors.id && <span>{errors.id}</span>}
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Phone Number</label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span>{errors.phone}</span>}
              </div>
              <div className="row mb-3"></div>
              <label className="col-sm-2 col-form-label">
                Employee Address
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span>{errors.address}</span>}
              </div>
              <div className="row mb-3"></div>
              <label className="col-sm-2 col-form-label">Depatment</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
                {errors.department && <span>{errors.department}</span>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
