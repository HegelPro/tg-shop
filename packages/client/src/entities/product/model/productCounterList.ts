import { decrementCounter, incrementCounter } from "shared/lib/counter";
import { eqProductCounter, ProductCounter } from "./productCounter";

export const changeProductCounterListItem =
  (
    productCounterOne: ProductCounter,
    mapper: (productCounter: ProductCounter) => ProductCounter
  ) =>
  (productCounterList: ProductCounter[]): ProductCounter[] =>
    productCounterList.map((productCounterTwo) =>
      eqProductCounter.equals(productCounterOne, productCounterTwo)
        ? mapper(productCounterTwo)
        : productCounterTwo
    );

export const increamentProductCounter = (productCounter: ProductCounter) =>
  changeProductCounterListItem(productCounter, incrementCounter);

export const decreamentProductCounter = (productCounter: ProductCounter) =>
  changeProductCounterListItem(productCounter, decrementCounter);
export const getNotEmptyProductCounterList = (
  productCounterList: ProductCounter[]
) => productCounterList.filter((productCounter) => productCounter.counter > 0);

export const getPriceOfProductList = (productCounterList: ProductCounter[]) =>
  productCounterList.reduce(
    (sum, { data, counter }) => sum + data.price * counter,
    0
  );
