import { ProductWithCounter } from "../model/Product";

export const getNotEmptyProductWithCounterList = 
  (productWithCounterList: ProductWithCounter[]) => productWithCounterList.filter(productWithCounter => productWithCounter.counter > 0)