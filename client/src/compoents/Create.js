import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

import axios from "axios";

function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
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

    if (!formData.name || !formData.description || !formData.price) {
      setErrors({
        name: !formData.name ? "book NAme is reuired" : "",
        description: !formData.description ? "Description is reuired" : "",
        price: !formData.price ? "Price is reuired" : "",
      });
    }
   await axios
      .post("http://localhost:7000/", formData)
      .then((response) => {
        console.log("Data successfully posted to API", response.data);
        navigate('/Read')
        
      }).then()
      .catch((error) => {
        console.log("Error posting data to API", error);
        // handle The error response from the server
        if(error.response && error.response.data && error.response.data.errors ){
          setErrors(error.response.data.errors)
        }
      });
      
  };

  return (
    <div className="App">
      <div className="container">
        <div className="mt-2">
          <form
            className="p-3 mb-2 bg-success text-white"
            onSubmit={handleSubmit}
          >
            <h1 className="text-dark">Book store</h1>
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
                {errors.name && <span>{errors.name}</span>}
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
                {errors.description && <span>{errors.description}</span>}
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
                {errors.price && <span>{errors.price}</span>}
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

export default Create;
