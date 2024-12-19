import axios from "./axios";

export const getAllExpenses = async (offset = 0, limit = 10) => {
  const response = await axios.get(`/expenses?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await axios.get(`/expenses/${id}`);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await axios.post("/expenses", expenseData);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await axios.put(`/expenses/${id}`, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`/expenses/${id}`);
};
