import React from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import "./ResetPasswordModal.scss";
import useClickOutside from "../../hooks/useClickOutside";

export default function ResetPasswordModal({ setActiveModal }) {
  const formRef = useRef(null);
  useClickOutside(formRef, () => setActiveModal(null));

  return (
    <div className="reset-pwd">
      <div className="reset-pwd__overlay"></div>
      <form ref={formRef} className="rp-form">
        <h1 className="rp-form__header">Reset Password</h1>
        <div className="rp-form__email">
          <input id="email" type="email" placeholder="" required />
          <label htmlFor="email">Email</label>
        </div>
        <button className="rp-form__reset">Send Reset Link</button>
        <button
          type="button"
          onClick={() => setActiveModal("login")}
          className="rp-form__login"
        >
          Back to login
        </button>
      </form>
    </div>
  );
}

ResetPasswordModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
