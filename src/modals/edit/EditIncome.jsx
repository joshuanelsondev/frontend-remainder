import React from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../hooks/useClickOutside";
import capitalizeStr from "../../utils/capitalizeStr";
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

export default function EditIncome({ setActiveModal }) {
  const [form, setForm] = useState({
    amount: "",
    source: "",
    date: "",
    recurring: "",
  });

  useClickOutside(formRef, () => setActiveModal(null));

  return (
    <div>
      <h1>Edit Income</h1>
    </div>
  );
}

EditIncome.propTypes = {
  setActiveModal: PropTypes.func.isRequired,
};
