import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams for navigation and params
import axios from "axios";
import "./create.css";

const EditEmployee = () => {
  const { id } = useParams(); // Get the 'id' from the route params
  const navigate = useNavigate(); // Initialize navigate function

  const [employeeData, setEmployeeData] = useState({
    ID: 0,
    name: "",
    email: "",
    gender: "",
    phone: 0,
    leave: "No",
  });

  useEffect(() => {
    getEmployeeById();
  }, [id]);

  // Fetch employee based on ID
  const getEmployeeById = () => {
    axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then((response) => {
        setEmployeeData({
          name: response.data.name,
          ID: response.data.ID,
          email: response.data.email,
          phone: response.data.phone,
          leave: response.data.leave,
          gender: response.data.gender,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setEmployeeData({ ...employeeData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, ID, leave, gender, email, phone } = employeeData;

    axios
      .post(`http://localhost:4000/api/users/${id}`, {
        name,
        email,
        phone,
        gender,
        ID,
        leave,
      })
      .then((response) => {
        console.log(response);
        navigate("/list"); // Redirect to '/list' after saving changes
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main id="site-main">
      <div className="container">
        <div className="box-nav d-flex justify-between">
          <div className="filter">
            <a href="/" className="dashboardStyle">
              <i className="fas fa-angle-double-left"></i>
              Dashboard
            </a>
          </div>
        </div>

        <div className="form-title text-center">
          <h2 className="text-dark">Edit Employee</h2>
        </div>

        <form id="update_user" autoComplete="off" onSubmit={handleSubmit} className="p-5">
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="Email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="text"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-2 col-form-label">
              <label htmlFor="gender" className="radio-label">Gender</label>
            </div>
            <div className="col-sm-10">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={employeeData.gender === "Male"}
                onChange={handleChange}
              />
              <label htmlFor="gender-m" className="radio-label">Male</label>
              &nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={employeeData.gender === "Female"}
                onChange={handleChange}
              />
              <label htmlFor="gender-f" className="radio-label">Female</label>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-2 col-form-label">Ph. No.</label>
            <div className="col-sm-10">
              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                value={employeeData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="ID" className="col-sm-2 col-form-label">ID</label>
            <div className="col-sm-10">
              <input
                type="number"
                name="ID"
                value={employeeData.ID}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />

          <div className="form-group row">
            <button type="submit" className="btn btn-primary text-light"><b>Save</b></button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditEmployee;
