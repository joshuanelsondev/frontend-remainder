import axios from "./axios";

export const getAllIncomes = async (offset = 0, limit = 10) => {
  const response = await axios.get(`/incomes?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getIncomeById = async (id) => {
  const response = await axios.get(`/incomes/${id}`);
  return response.data;
};

export const createIncome = async (incomeData) => {
  const response = await axios.post("/incomes", incomeData);
  return response.data;
};

export const updateIncome = async (id, incomeData) => {
  const response = await axios.put(`/incomes/${id}`, incomeData);
  return response.data;
};

export const deleteIncome = async (id) => {
  await axios.delete(`/incomes/${id}`);
};
