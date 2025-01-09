export const formatAmount = (amount) => {
  if (amount == null || isNaN(amount)) {
    return { dollars: "0", cents: "00" };
  }

  // Ensure amount is a number and fixed to 2 decimal places
  const formattedAmount = parseFloat(amount).toFixed(2);

  // Split into dollars and cents
  const [dollars, cents] = formattedAmount.split(".");

  // Add commas to the dollars part
  const dollarsWithCommas = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Full Amount
  const fullAmount = `${dollarsWithCommas}.${cents}`;

  return { fullAmount, dollars: dollarsWithCommas, cents };
};
