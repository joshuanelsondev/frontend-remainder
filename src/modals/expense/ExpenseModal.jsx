import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";
import capitalizeStr from "../../utils/capitalizeStr";
import { useUserData } from "../../context/UserDataContext";
import { createExpense } from "../../api/expenseApi";
import "./ExpenseModal.scss";

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
  const [form, setForm] = useState({
    amount: "",
    source: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { getUserData } = useUserData();
  const formRef = useRef(null);

  useClickOutside(formRef, () => setActiveModal(null));

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createExpense(form);
      setSuccess("Expense added successfully!");
      setTimeout(() => {
        setActiveModal(null);
        getUserData();
      }, 2000);
    } catch (error) {
      console.error("Error creating expense:", error);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form">
      <div className="expense-form__overlay"></div>
      <form onSubmit={submitForm} className="expense-form__form" ref={formRef}>
        <h1 className="expense-form__header">Add Expense</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="amount">
          <label htmlFor="amount">Amount: $</label>
          <input
            value={form.amount}
            name="amount"
            onChange={handleFormInput}
            placeholder="Enter Amount"
            type="type"
            inputMode="numeric"
            pattern="^\d{1,9}(\.\d{1,2})?$"
            title="Enter a valid amount (up to 2 decimal places)"
            required
          />
        </div>
        <div className="category">
          <label htmlFor="category">Category:</label>
          <select
            onChange={handleFormInput}
            name="category"
            id="category"
            value={form.category}
            title="Select a category for your expense"
            required
          >
            <option value="">Category</option>
            {selectOptions.map((option, index) => (
              <option key={index} value={option}>
                {capitalizeStr(option)}
              </option>
            ))}
          </select>
        </div>
        <div className="date">
          <label htmlFor="date">Date:</label>
          <input
            value={form.date}
            name="date"
            onChange={handleFormInput}
            type="date"
            title="Select a date"
            required
          />
        </div>
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding Expense..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

ExpenseModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
