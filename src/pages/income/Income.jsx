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
import { formatToShort } from "../../utils/formatDate";
import { formatAmount } from "../../utils/formatAmount";
import { getAllIncomes, deleteIncome } from "../../api/incomeApi";

export default function Income() {
  const [selectAll, setSelectAll] = useState(false);
  const { setActiveModal, setModalData } = useModal();
  const { userData } = useUserData();
  const { totalIncome } = userData.budget;
  const [incomes, setIncomes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfIncomes, setNumOfIncomes] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
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

  const handleIncomeDelete = async () => {
    try {
      await deleteIncome(deleteId);
      alert("Income deleted");
      getIncomes();
      setDeleteModal(null);
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
          <p>${formatAmount(totalIncome).fullAmount}</p>
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
            <th>
              {selectAll ? (
                <FaSquare onClick={() => setSelectAll(false)} />
              ) : (
                <FaRegSquare onClick={() => setSelectAll(true)} />
              )}
            </th>
            <th>Source of Income</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Recurring</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {incomes &&
            incomes.map((income) => {
              return (
                <tr key={income.id}>
                  <td>
                    <Checkbox selectAll={selectAll} />
                  </td>
                  <td>{income.source}</td>
                  <td>${formatAmount(income.amount).fullAmount}</td>
                  <td>{formatToShort(income.date)}</td>
                  <td>{income.recurring ? "• Recurring" : "• One-Time"}</td>
                  <td>
                    <FaPen
                      onClick={() => {
                        setModalData(income);
                        setActiveModal("editIncome");
                      }}
                    />
                  </td>
                  <td>
                    <FaTrash
                      onClick={() => {
                        setDeleteId(income.id);
                        setDeleteModal(true);
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
        <div className="pagination__info">
          <p>
            Displaying {currentPage} out of {totalPages}
          </p>
        </div>

        {/* Right: Items range and navigation */}
        <div className="pagination__controls">
          <p>
            Items {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, numOfIncomes)} of{" "}
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
      {deleteModal && (
        <div className="delete-modal">
          <p className="delete-modal__text">
            Are sure you want to delete this income?
          </p>
          <div className="delete-modal__confirm">
            <p onClick={handleIncomeDelete}>Delete</p>
            <p onClick={() => setDeleteModal(false)}>Cancel</p>
          </div>
        </div>
      )}
    </div>
  );
}
