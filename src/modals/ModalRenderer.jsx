import React from "react";
import { useModal } from "./ModalContext";
import LoginModal from "../modals/login/LoginModal";
import SignupModal from "../modals/signup/SignupModal";
import ResetPasswordModal from "../modals/resetPassword/ResetPasswordModal";

const ModalRenderer = () => {
  const { activeModal, setActiveModal } = useModal();

  return (
    <>
      {activeModal === "login" && (
        <LoginModal setActiveModal={setActiveModal} />
      )}
      {activeModal === "signup" && (
        <SignupModal setActiveModal={setActiveModal} />
      )}
      {activeModal === "resetPassword" && (
        <ResetPasswordModal setActiveModal={setActiveModal} />
      )}
    </>
  );
};

export default ModalRenderer;
