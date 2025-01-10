export const formatToIso = (date) => {
  if (!(date instanceof Date)) date = new Date(date);

  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );

  const year = adjustedDate.getUTCFullYear();
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format as yyyy-MM-dd
};

export const formatToShort = (date) => {
  if (!(date instanceof Date)) date = new Date(date);

  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );

  const year = adjustedDate.getUTCFullYear();
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getUTCDate()).padStart(2, "0");

  return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
};

export const formatToLong = (date) => {
  if (!(date instanceof Date)) date = new Date(date);

  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );

  return adjustedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // e.g., Friday, January 10, 2025
};
