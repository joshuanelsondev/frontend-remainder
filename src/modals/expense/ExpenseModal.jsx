import React, { useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";

export default function ExpenseModal({ setActiveModal }) {
  const formRef = useRef(null);

  useClickOutside(formRef, () => setActiveModal(null));
  return (
    <div className="expense-form">
      <div className="expense-form__overlay"></div>
      <form ref={formRef}>
        <h1>Expense Modal</h1>
      </form>
    </div>
  );
}

ExpenseModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
