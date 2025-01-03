import React from "react";
import { useModal } from "../context/ModalContext";
import LoginModal from "../modals/login/LoginModal";
import SignupModal from "../modals/signup/SignupModal";
import ResetPasswordModal from "../modals/resetPassword/ResetPasswordModal";
import IncomeModal from "../modals/income/IncomeModal";
import ExpenseModal from "../modals/expense/ExpenseModal";

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
      {activeModal === "income" && (
        <IncomeModal setActiveModal={setActiveModal} />
      )}
      {activeModal === "expense" && (
        <ExpenseModal setActiveModal={setActiveModal} />
      )}
    </>
  );
};

export default ModalRenderer;
