import { filter } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState();
  const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const singleUser = filter(user, (element) => element.id === id);
      setUpdatedData(singleUser[0]);
    }
  }, []);

  const editedData = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updatedData));
    navigate("/read");
  };
  
  return (
    <div className="container-fluid w-50">
      <h2 className="my-2">Edit/Update your details</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updatedData && updatedData.name}
            onChange={editedData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updatedData && updatedData.email}
            onChange={editedData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"> Age </label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={updatedData && updatedData.age}
            onChange={editedData}
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updatedData && updatedData.gender === "Male"}
            onChange={editedData}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={updatedData && updatedData.gender === "Female"}
            onChange={editedData}
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

export default Update;
