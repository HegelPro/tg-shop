import { List } from "@mui/material";
import { ProductCounter } from "entities/product";
import { ProductLine } from "./components/ProductLine/ProductLine";

interface ProductListProps {
  productCounterList: ProductCounter[];
}
export const ProductList = ({ productCounterList }: ProductListProps) => (
  <List>
    {productCounterList.map((productCounter) => (
      <ProductLine
        key={productCounter.data.id}
        productCounter={productCounter}
      />
    ))}
  </List>
);
