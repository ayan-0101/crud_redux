import React from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";
import { filter } from "lodash";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const allUser = useSelector((state) => state.app.user);
  const singleUser = filter(allUser, (element) => element.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="mb-5" onClick={() => setShowPopup(false)}>
          close
        </button>
        <h2>{singleUser[0].name}</h2>
        <h3>{singleUser[0].age}</h3>
        <h3>{singleUser[0].email}</h3>
        <h3>{singleUser[0].gender}</h3>
      </div>
    </div>
  );
};

export default CustomModal;
