export const convertToDollarUnit = (amount: number): number => {
  return amount; // no conversion needed
};


export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}
