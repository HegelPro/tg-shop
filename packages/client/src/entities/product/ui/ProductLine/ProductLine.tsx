import { ProductCounter } from "../../model/productCounter";

import "./ProductLine.css";

interface ProductLineProps {
  productCounter: ProductCounter;
}
export const ProductLine = ({ productCounter }: ProductLineProps) => (
  <div className="orderItem">
    <img className="orderItem__image" src={productCounter.data.image} />
    <p className="ml">{productCounter.data.name}</p>
    <div className="ml">
      <p>
        {productCounter.counter} x {productCounter.data.price}{" "}
        {productCounter.data.currency}
      </p>
    </div>
  </div>
);
