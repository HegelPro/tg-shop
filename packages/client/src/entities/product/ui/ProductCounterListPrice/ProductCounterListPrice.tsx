import { List, ListItem, ListItemText } from "@mui/material";
import { getPriceOfProductList } from "../../model/productCounterList";
import { useMemo } from "react";
import { formatPrice } from "shared/format/formatPrice";
import { ProductCounter } from "../../model/productCounter";

interface ProductCounterListPriceProps {
  productCounterList: ProductCounter[];
}
export const ProductCounterListPrice = ({
  productCounterList,
}: ProductCounterListPriceProps) => {
  const priceOfProductList = useMemo(
    () => getPriceOfProductList(productCounterList),
    [productCounterList]
  );

  return (
    <List>
      <ListItem>
        <ListItemText>{formatPrice(priceOfProductList, {})}</ListItemText>
      </ListItem>
    </List>
  );
};
