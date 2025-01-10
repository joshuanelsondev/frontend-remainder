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
import { getAllIncomes, deleteIncome } from "../../api/incomeApi";
import "./Income.scss";

export default function Income() {
  const [selectAll, setSelectAll] = useState(false);
  const { setActiveModal, setModalData } = useModal();
  const { userData, getUserData } = useUserData();
  const { totalIncome } = userData.budget;
  const [incomes, setIncomes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfIncomes, setNumOfIncomes] = useState(0);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    getIncomes();
  }, [currentPage, userData]);

  // Retrieve incomes with pagination
  const getIncomes = async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    try {
      const { incomes: retrievedIncomes, total } = await getAllIncomes(
        offset,
        itemsPerPage
      );
      setIncomes(retrievedIncomes);
      setNumOfIncomes(total);
    } catch (error) {
      console.error("Failed to fetch incomes:", error);
    }
  };

  const handleIncomeDelete = async (id) => {
    try {
      await deleteIncome(id);
      alert("Income deleted");
      getIncomes();
      getUserData();
      setSelectedIncome(null);
    } catch (error) {
      console.error("Error deleting income", error);
    }
  };

  // Total pages for pagination
  const totalPages = Math.ceil(numOfIncomes / itemsPerPage);

  return (
    <div className="income-page">
      <div className="income-page__heading">
        <div className="income-page__heading-left">
          <p className="heading-left-amount">
            ${formatAmount(totalIncome).dollars}.
            <span className="cents">{formatAmount(totalIncome).cents}</span>
          </p>
          <p>Current Income</p>
        </div>
        <button
          onClick={() => setActiveModal("income")}
          className="income-page__add-income"
        >
          Add Income
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="table-checkbox">
              {/* {selectAll ? (
                <FaSquare onClick={() => setSelectAll(false)} />
              ) : (
                <FaRegSquare onClick={() => setSelectAll(true)} />
              )} */}
              <FaRegSquare />
            </th>
            <th>Source of Income</th>
            <th>Amount</th>
            <th>Date</th>
            <th className="table-edit">Edit</th>
            <th className="table-trash">Delete</th>
          </tr>
        </thead>
        <tbody>
          {incomes &&
            incomes.map((income) => {
              return (
                <tr key={income.id}>
                  <td className="table-checkbox">
                    {/* <Checkbox selectAll={selectAll} /> */}
                    <FaRegSquare />
                  </td>
                  <td>{capitalizeStr(income.source)}</td>
                  <td>${formatAmount(income.amount).fullAmount}</td>
                  <td>{formatToShort(income.date)}</td>
                  <td className="table-edit">
                    <FaPen
                      onClick={() => {
                        setModalData(income);
                        setActiveModal("editIncome");
                      }}
                    />
                  </td>
                  <td className="table-trash">
                    <FaTrash
                      onClick={() => {
                        setSelectedIncome(income);
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
            {Math.min(currentPage * itemsPerPage, numOfIncomes)} <span>of</span>{" "}
            {numOfIncomes}
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

      {selectedIncome && (
        <div className="delete-container">
          <div className="delete-overlay"></div>
          <div className="delete-modal">
            <p className="delete-modal__text">
              Are sure you want to delete this income?
            </p>
            <div className="delete-modal__income-info">
              <p>{capitalizeStr(selectedIncome.source)}</p>
              <p>${formatAmount(selectedIncome.amount).fullAmount}</p>
              <p>{formatToShort(selectedIncome.date)}</p>
              <p>{deleteIncome.recurring ? "Recurring" : "One-Time"}</p>
            </div>
            <div className="delete-modal__confirm">
              <p
                className="delete-modal__delete"
                onClick={() => handleIncomeDelete(selectedIncome.id)}
              >
                Delete
              </p>
              <p
                className="delete-modal__cancel"
                onClick={() => setSelectedIncome(null)}
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
