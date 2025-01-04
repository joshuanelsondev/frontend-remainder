import React, { useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";
import capitalizeStr from "../../utils/capitalizeStr";

const selectOptions = [
  "freelance",
  "salary",
  "business",
  "gifts",
  "rental",
  "investment",
  "other",
];
export default function IncomeModal({ setActiveModal }) {
  const formRef = useRef(null);

  useClickOutside(formRef, () => setActiveModal(null));

  return (
    <div className="income-form">
      <div className="income-form__overlay"></div>
      <form className="income-form__form" ref={formRef}>
        <h1 className="income-form__header">Add Income</h1>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="source">Source of Income:</label>
          <select name="source" id="source">
            <option>Source</option>
            {selectOptions.map((option, index) => (
              <option key={index} value={option}>
                {capitalizeStr(option)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" />
        </div>
        <button>Add Income</button>
      </form>
    </div>
  );
}

IncomeModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
