import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { ProductCounter } from "entities/product/model/productCounter";
import { formatPrice } from "shared/format/formatPrice";

interface ProductLineProps {
  productCounter: ProductCounter;
}
export const ProductLine = ({ productCounter }: ProductLineProps) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar
        alt={productCounter.data.name}
        src={productCounter.data.image || undefined}
      />
    </ListItemAvatar>
    <ListItemText
      primary={productCounter.data.name}
      secondary={formatPrice(productCounter.data.price, {
        amount: productCounter.counter,
      })}
    />
  </ListItem>
);
