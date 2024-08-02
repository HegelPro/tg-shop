import { ProductCounter } from "../model/Product";

export const getPriceOfProductList =
  (productCounterList: ProductCounter[]) =>
    productCounterList.reduce((sum, { data, counter }) => sum + data.price * counter, 0)