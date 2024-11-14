export const formatPrice = (
  price: number,
  {
    amount,
    currency = "Руболь",
  }: {
    amount?: number;
    currency?: string;
    discount?: string;
  } = {
    currency: "Руболь",
  }
) => (amount ? `${amount} x ${price} ${currency}` : `${price} ${currency}`);
