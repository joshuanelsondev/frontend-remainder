import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";
import capitalizeStr from "../../utils/capitalizeStr";
import { useUserData } from "../../context/UserDataContext";
import { createIncome } from "../../api/incomeApi";
import "./IncomeModal.scss";

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
  const [form, setForm] = useState({
    amount: "",
    source: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const formRef = useRef(null);
  const { getUserData } = useUserData();

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
      await createIncome(form);
      setSuccess("Income added successfully!");
      setTimeout(() => {
        setActiveModal(null);
        getUserData();
      }, 2000);
    } catch (error) {
      console.error("Error creating income:", error);
      setError("Failed to add income. Please try again.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = form.amount && form.source && form.date;

  return (
    <div className="income-form">
      <div className="income-form__overlay"></div>
      <form onSubmit={submitForm} className="income-form__form" ref={formRef}>
        <h1 className="income-form__header">Add Income</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="income-form__amount">
          <span>$</span>
          <input
            value={form.amount}
            id="amount"
            className="income-form__amount-input"
            name="amount"
            onChange={handleFormInput}
            placeholder=""
            type="text"
            inputMode="numeric"
            pattern="^(0|[1-9]\d{0,8})(\.\d{1,2})?$"
            title="Enter a valid amount (up to 2 decimal places)"
            required
          />
          <label className="income-form__amount-label" htmlFor="amount">
            Amount
          </label>
        </div>
        <div className="income-form__source">
          <label htmlFor="income-form__source-label">Source of Income:</label>
          <select
            className="income-form__source-select"
            onChange={handleFormInput}
            name="source"
            id="source"
            value={form.source}
            title="Select a source of income"
            required
          >
            <option value="">Choose a source</option>

            {selectOptions.map((option, index) => (
              <option key={index} value={option}>
                {capitalizeStr(option)}
              </option>
            ))}
          </select>
          <span className="source-caret">▾</span>
        </div>
        <div className="income-form__date">
          <label htmlFor="income-form__date-label">Date:</label>
          <input
            className="income-form__date-input"
            value={form.date}
            name="date"
            onChange={handleFormInput}
            type="date"
            title="Select a date"
            required
          />
        </div>
        <button
          type="submit"
          className="income-form__add-btn"
          disabled={!isFormComplete || loading}
        >
          {loading ? "Adding Income..." : "Add Income"}
        </button>
      </form>
    </div>
  );
}

IncomeModal.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
