import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./create.css"; // Ensure this imports your CSS file for styles

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    ID: 0,
    name: "",
    email: "",
    gender: "",
    phone: "",
    leave: "No",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);x
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { ID, name, email, gender, phone, leave } = employeeData;

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (phone.length !== 10) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    axios
      .post("http://localhost:4000/api/users", { ID, name, email, gender, phone, leave })
      .then(() => {
        console.log("Employee successfully created");
        navigate("/list");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to create employee. Please try again.");
      });

    // Reset form
    setEmployeeData({
      ID: 0,
      name: "",
      email: "",
      gender: "",
      phone: "",
      leave: "No",
    });
    setErrorMessage("");
  };

  return (
    <main id="site-main">
      <div className="container">
        <div className="box-nav d-flex justify-between">
          <a href="/" className="dashboardStyle">
            <i className="fas fa-angle-double-left"></i>
            Dashboard
          </a>
          <a href="/list" className="dashboardStyle">
            <i className="fas fa-angle-double-left"></i>
            View Employees
          </a>
        </div>

        <div className="form-title text-center">
          <h2 className="text-dark">New User</h2>
          <span className="text-dark">Create Account</span>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form
          id="add_user"
          autoComplete="off"
          onSubmit={handleSubmit}
          className="p-5"
        >
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-2 col-form-label">
              <label htmlFor="gender" className="radio-label">
                Gender
              </label>
            </div>
            <div className="col-sm-10">
              <input
                type="radio"
                name="gender"
                id="gender-m"
                onChange={handleChange}
                value="Male"
                required
              />
              <label htmlFor="gender-m" className="radio-label">Male</label>
              <input
                type="radio"
                name="gender"
                id="gender-f"
                onChange={handleChange}
                value="Female"
                required
              />
              <label htmlFor="gender-f" className="radio-label">Female</label>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-2 col-form-label">
              Ph. No.
            </label>
            <div className="col-sm-10">
              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                onChange={handleChange}
                value={employeeData.phone}
                placeholder="Enter Phone Number"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="ID" className="col-sm-2 col-form-label">
              ID
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                name="ID"
                onChange={handleChange}
                value={employeeData.ID}
                placeholder="Enter ID"
                className="form-control"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary text-light">
            <b>Create</b>
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateEmployee;
