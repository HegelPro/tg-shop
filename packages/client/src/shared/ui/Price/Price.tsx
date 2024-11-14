import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Стиль для строки со скидкой
const DiscountedPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
}));

// Стиль для обычной цены
const CurrentPrice = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));

interface PriceProps {
  price: number;
  discount?: number;
  amount?: number;
  currency?: string;
}
export const Price = ({
  price,
  discount,
  currency = "₽",
}: PriceProps) => (
  <Box display="flex" alignItems="center">
    {discount ? (
      <>
        <DiscountedPrice variant="body2">
          {`${price.toFixed(2)} ${currency}`}
        </DiscountedPrice>
        <CurrentPrice variant="body1">
          {`${discount.toFixed(2)} ${currency}`}
        </CurrentPrice>
      </>
    ) : (
      <CurrentPrice variant="body1">
        {`${price.toFixed(2)} ${currency}`}
      </CurrentPrice>
    )}
  </Box>
);
