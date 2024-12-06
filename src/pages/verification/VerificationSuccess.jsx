import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../modals/ModalContext";

export default function VerificationSuccess() {
  const { setActiveModal } = useModal();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
    setActiveModal("login");
  };

  return (
    <div>
      <h1>Email Verified</h1>
      <p>Your email has been successfully verified.</p>
      <button onClick={goToLogin}>Go to Login</button>
    </div>
  );
}
