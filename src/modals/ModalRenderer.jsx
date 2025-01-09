import React from "react";
import { useModal } from "../context/ModalContext";
import LoginModal from "../modals/login/LoginModal";
import SignupModal from "../modals/signup/SignupModal";
import ResetPasswordModal from "../modals/resetPassword/ResetPasswordModal";
import IncomeModal from "../modals/income/IncomeModal";
import ExpenseModal from "../modals/expense/ExpenseModal";
import EditIncome from "./edit/EditIncome";
import EditExpense from "./edit/EditExpense";

const ModalRenderer = () => {
  const { activeModal, setActiveModal, modalData } = useModal();

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
      {activeModal === "editIncome" && (
        <EditIncome setActiveModal={setActiveModal} income={modalData} />
      )}
      {activeModal === "editExpense" && (
        <EditExpense setActiveModal={setActiveModal} expense={modalData} />
      )}
    </>
  );
};

export default ModalRenderer;
