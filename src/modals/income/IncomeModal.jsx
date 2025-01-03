import React, { useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";

export default function IncomeModal({ setActiveModal }) {
  const formRef = useRef(null);

  useClickOutside(formRef, () => setActiveModal(null));

  return (
    <div className="income-form">
      <div className="income-form__overlay"></div>
      <form ref={formRef}>
        <h1>Income Modal</h1>
      </form>
    </div>
  );
}

IncomeModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
