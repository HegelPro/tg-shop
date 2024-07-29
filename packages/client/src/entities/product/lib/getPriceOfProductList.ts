import { ProductWithCounter } from "../model/Product";

export const getPriceOfProductList =
  (productWithCounterList: ProductWithCounter[]) => productWithCounterList.reduce((sum, { data, counter }) => sum + data.price * counter, 0)