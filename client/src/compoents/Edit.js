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
    id: "",
    phone: "",
    address: "",
    department: "",
  });

 

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
      .put(`http://localhost:8000/${id}`, formData)
      .then((response) => {
        console.log("Data successfully Edit to API", response.data);
        navigate("/read");
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
    const result = await axios.get(`http://localhost:8000/${id}`);
    setFormData(result.data);
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
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Edit Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
