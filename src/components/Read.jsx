import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import { Link } from "react-router-dom";
import CustomModal from "./CustomModal";
import { filter, isEmpty, isEqual, map, orderBy } from "lodash";
import Loader from "./Loader";

const Read = () => {
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const { user, loading, searchData } = useSelector((state) => state.app);
  const [checkboxState, setCheckboxState] = useState("");

  useEffect(() => {
    dispatch(showUser());
  }, [searchData, checkboxState]);

  const filterBySearch = filter(user, (element) => {
    if (isEqual(searchData.length, 0)) {
      return element;
    } else {
      return (
        element.name.toLowerCase().includes(searchData.toLowerCase()) ||
        element.email.toLowerCase().includes(searchData.toLowerCase())
      );
    }
  });

  const filterByGender = filter(filterBySearch, (element) => {
    if (checkboxState === "Male") {
      return element.gender === "Male";
    } else if (checkboxState === "Female") {
      return element.gender === "Female";
    } else {
      return element;
    }
  });

  const sortedFilterByGender = orderBy(filterByGender, ["id"], ["desc"]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All data</h2>
      <div
        className="container d-flex my-4"
        style={{ width: "13rem", gap: "15px" }}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            type="radio"
            checked={isEmpty(checkboxState) || isEqual(checkboxState, "All")}
            onChange={(e) => setCheckboxState(e.target.value)}
          />
          <label className="form-check-label">All</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={isEqual(checkboxState, "Male")}
            onChange={(e) => setCheckboxState(e.target.value)}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={isEqual(checkboxState, "Female")}
            onChange={(e) => setCheckboxState(e.target.value)}
          />
          <label className="form-check-label">Female</label>
        </div>
      </div>

      {isEmpty(sortedFilterByGender) ? (
        <h3>No user founnd based on selection</h3>
      ) : (
        map(sortedFilterByGender, (element) => (
          <div>
            <div
              key={element.id}
              className="card mx-auto my-2"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {element.email}
                </h6>
                <p className="card-text">{element.gender}</p>
                <button
                  className="card-link"
                  onClick={() => [setId(element.id), setShowPopup(true)]}
                >
                  View
                </button>
                <Link to={`/edit/${element.id}`} className="card-link">
                  Edit
                </Link>
                <Link
                  onClick={() => dispatch(deleteUser(element.id))}
                  className="card-link"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Read;
