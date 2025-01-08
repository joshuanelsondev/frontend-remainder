export const formatToIso = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // YYYY-MM-DD format
};

export const formatToShort = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); // MM/DD/YYYY
};

export const formatToLong = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // e.g., Wednesday, January 8, 2025
};
