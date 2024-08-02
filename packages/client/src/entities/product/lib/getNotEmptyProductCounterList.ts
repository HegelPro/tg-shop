import { ProductCounter } from "../model/Product";

export const getNotEmptyProductCounterList = 
  (productCounterList: ProductCounter[]) => productCounterList.filter(productCounter => productCounter.counter > 0)