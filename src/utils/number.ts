export const formatNumberCurrency = (input: string) => {
  const numericValue = input.replace(/\D/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
