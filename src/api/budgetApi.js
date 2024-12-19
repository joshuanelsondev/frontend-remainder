import axios from "./axios";

export const getBudget = async () => {
  const response = await axios.get("/disposable-income");
  return response.data;
};
