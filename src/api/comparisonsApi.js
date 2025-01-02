import axios from "./axios";

export const getComparisons = async (startDate, endDate) => {
  const { data: comparisonsData } = await axios.get("/comparisons", {
    params: { startDate, endDate },
  });
  return comparisonsData;
};

// Get available years for comparisons data
export const getComparisonsYears = async () => {
  const { data } = await axios.get("/comparisons/years");
  return data.years;
};
