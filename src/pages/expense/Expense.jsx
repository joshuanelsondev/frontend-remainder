import React, { useState, useEffect } from "react";
import Checkbox from "../../components/checkbox/Checkbox";
import { useModal } from "../../context/ModalContext";
import { useUserData } from "../../context/UserDataContext";
import {
  FaRegSquare,
  FaSquare,
  FaPen,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import capitalizeStr from "../../utils/capitalizeStr";
import { formatToShort } from "../../utils/formatDate";
import { formatAmount } from "../../utils/formatAmount";
import { getAllExpenses, deleteExpense } from "../../api/expenseApi";
import "./Expense.scss";

export default function Expense() {
  const [selectAll, setSelectAll] = useState(false);
  const { setActiveModal, setModalData } = useModal();
  const { userData, getUserData } = useUserData();
  const { totalExpenses } = userData.budget;
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfExpenses, setNumOfExpenses] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const itemsPerPage = 10;

  console.log(userData);
  useEffect(() => {
    getExpenses();
  }, [currentPage, userData]);

  // Retrieve expenses with pagination
  const getExpenses = async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    try {
      const { expenses: retrievedExpenses, total } = await getAllExpenses(
        offset,
        itemsPerPage
      );
      setExpenses(retrievedExpenses);
      setNumOfExpenses(total);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  const handleExpenseDelete = async (id) => {
    try {
      await deleteExpense(id);
      alert("Expense deleted");
      getExpenses();
      getUserData();
      setSelectedExpense(null);
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  // Total pages for pagination
  const totalPages = Math.ceil(numOfExpenses / itemsPerPage);

  return (
    <div className="expense-page">
      <div className="expense-page__heading">
        <div className="expense-page__heading-left">
          <p className="heading-left-amount">
            ${formatAmount(totalExpenses).dollars}.
            <span className="cents">{formatAmount(totalExpenses).cents}</span>
          </p>
          <p>Current Expense</p>
        </div>
        <button
          onClick={() => setActiveModal("expense")}
          className="expense-page__add-expense"
        >
          Add Expense
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="table-checkbox">
              {selectAll ? (
                <FaSquare onClick={() => setSelectAll(false)} />
              ) : (
                <FaRegSquare onClick={() => setSelectAll(true)} />
              )}
            </th>
            <th>Expense Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th className="table-edit">Edit</th>
            <th className="table-trash">Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((expense) => {
              return (
                <tr key={expense.id}>
                  <td className="table-checkbox">
                    <Checkbox selectAll={selectAll} />
                  </td>
                  <td>{capitalizeStr(expense.category)}</td>
                  <td>${formatAmount(expense.amount).fullAmount}</td>
                  <td>{formatToShort(expense.date)}</td>
                  <td className="table-edit">
                    <FaPen
                      onClick={() => {
                        setModalData(expense);
                        setActiveModal("editExpense");
                      }}
                    />
                  </td>
                  <td className="table-trash">
                    <FaTrash
                      onClick={() => {
                        setSelectedExpense(expense);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        {/* Left: Displaying page numbers */}
        <p className="pagination__info">
          Displaying pages <b>{currentPage}</b> out of <b>{totalPages}</b>
        </p>

        {/* Right: Items range and navigation */}
        <div className="pagination__controls">
          <p>
            <span>Items</span> {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, numOfExpenses)}{" "}
            <span>of</span> {numOfExpenses}
          </p>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {selectedExpense && (
        <div className="delete-container">
          <div className="delete-overlay"></div>
          <div className="delete-modal">
            <p className="delete-modal__text">
              Are sure you want to delete this expense?
            </p>
            <div className="delete-modal__expense-info">
              <p>{capitalizeStr(selectedExpense.category)}</p>
              <p>${formatAmount(selectedExpense.amount).fullAmount}</p>
              <p>{formatToShort(selectedExpense.date)}</p>
              <p>{deleteExpense.recurring ? "Recurring" : "One-Time"}</p>
            </div>
            <div className="delete-modal__confirm">
              <p
                className="delete-modal__delete"
                onClick={() => handleExpenseDelete(selectedExpense.id)}
              >
                Delete
              </p>
              <p
                className="delete-modal__cancel"
                onClick={() => setSelectedExpense(null)}
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
