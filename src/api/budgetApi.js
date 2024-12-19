import axios from "./axios";

export const getBudget = async () => {
  const response = await axios.get("/budget");
  return response.data;
};
