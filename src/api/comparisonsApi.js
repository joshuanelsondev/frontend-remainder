import axios from "./axios";

export const getComparisons = async (startDate, endDate) => {
  const { data: comparisonsData } = await axios.get("/comparisons", {
    params: { startDate, endDate },
  });
  console.log(comparisonsData);
  return comparisonsData;
};
