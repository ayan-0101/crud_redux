import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [userState, setUserState] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(userState));
    navigate("/read");
  };

  return (
    <div className="container-fluid w-50">
      <h2 className="my-2">Fill the required details</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name* </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={getUserData}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email* </label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={getUserData}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"> Age </label>
          <input
            type="number"
            name="age"
            className="form-control"
            onChange={getUserData}
            required={true}
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            onChange={getUserData}
            required={true}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            onChange={getUserData}
            required={true}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
