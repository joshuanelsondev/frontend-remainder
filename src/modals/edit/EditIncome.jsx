import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";
import capitalizeStr from "../../utils/capitalizeStr";
import { formatToIso } from "../../utils/formatDate";
import { useUserData } from "../../context/UserDataContext";
import { updateIncome } from "../../api/incomeApi";
import "./EditModals.scss";

const selectOptions = [
  "freelance",
  "salary",
  "business",
  "gifts",
  "rental",
  "investment",
  "other",
];

export default function EditIncome({ setActiveModal, income }) {
  const [form, setForm] = useState({
    amount: "",
    source: "",
    date: "",
    recurring: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const formRef = useRef(null);
  const { getUserData } = useUserData();

  useClickOutside(formRef, () => setActiveModal(null));

  useEffect(() => {
    if (income) {
      setForm({ ...income, date: formatToIso(income.date) });
    }
  }, []);
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
      await updateIncome(income.id, form);
      setSuccess("Income updated successfully!");
      setTimeout(() => {
        setActiveModal(null);
        getUserData();
      }, 2000);
    } catch (error) {
      console.error("Error updating income:", error);
      setError("Failed to update income. Please try again.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = form.amount && form.source && form.date;

  return (
    <div className="edit-income">
      <div className="edit-income__overlay"></div>
      <form onSubmit={submitForm} className="edit-income-form" ref={formRef}>
        <h1 className="edit-income-form__header">Edit Income</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="edit-income-form__amount">
          <span>$</span>
          <input
            value={form.amount}
            id="amount"
            className="edit-income-form__amount-input"
            name="amount"
            onChange={handleFormInput}
            placeholder=""
            type="text"
            inputMode="numeric"
            pattern="^(0|[1-9]\d{0,8})(\.\d{1,2})?$"
            title="Enter a valid amount (up to 2 decimal places)"
            required
          />
          <label className="edit-income-form__amount-label" htmlFor="amount">
            Amount
          </label>
        </div>
        <div className="edit-income-form__bottom-inputs">
          <div className="edit-income-form__source">
            <label htmlFor="source">Source of Income:</label>
            <select
              className="edit-income-form__source-select"
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
          <div className="edit-income-form__date">
            <label htmlFor="date">Date:</label>
            <input
              className="edit-income-form__date-input"
              value={form.date}
              id="date"
              name="date"
              onChange={handleFormInput}
              type="date"
              title="Select a date"
              required
            />
          </div>
        </div>
        <div className="edit-income-form__checkbox">
          <input
            type="checkbox"
            id="recurring"
            name="recurring"
            checked={form.recurring}
            onChange={(e) => setForm({ ...form, recurring: e.target.checked })}
          />
          <label htmlFor="recurring">Recurring Income</label>
        </div>
        <button
          type="submit"
          className="edit-income-form__add-btn"
          disabled={!isFormComplete || loading}
        >
          {loading ? "Updating Income..." : "Update Income"}
        </button>
      </form>
    </div>
  );
}

EditIncome.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
