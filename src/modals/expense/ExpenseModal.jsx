import React, { useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";
import capitalizeStr from "../../utils/capitalizeStr";

const selectOptions = [
  "rent",
  "utilities",
  "groceries",
  "entertainment",
  "transportation",
  "personal",
  "healthcare",
  "education",
  "savings",
  "family",
  "emergency",
  "vacation",
  "other",
];

export default function ExpenseModal({ setActiveModal }) {
  const formRef = useRef(null);

  useClickOutside(formRef, () => setActiveModal(null));
  return (
    <div className="expense-form">
      <div className="expense-form__overlay"></div>
      <form className="expense-form__form" ref={formRef}>
        <h1 className="expense-form__header">Add Expense</h1>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select name="category" id="category">
            <option>Category</option>
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
        <button>Add Expense</button>
      </form>
    </div>
  );
}

ExpenseModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
