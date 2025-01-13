import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { AuthContext } from "../../context/AuthContext";
import "./LogoutModal.scss";

export default function LogoutModal({ setActiveModal }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setActiveModal(null));

  return (
    <div className="logout-modal">
      <div className="logout-modal__overlay"></div>
      <div className="logout-modal__modal" ref={modalRef}>
        <p className="logout-modal__text">Are you sure you want to logout?</p>
        <div className="logout-modal__btns">
          <button
            className="logout-modal__cancel"
            onClick={() => setActiveModal(null)}
          >
            Cancel
          </button>
          <button
            className="logout-modal__logout"
            onClick={() => logout(navigate)}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
