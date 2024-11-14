import {
  decrementCounter,
  incrementCounter,
  wrapCounter,
} from "shared/lib/counter";
import { ProductCounter } from "./productCounter";
import { Product } from "./product";
import { pipe } from "fp-ts/lib/function";

export const changeProductCounterListItem =
  (
    product: Product,
    mapper: (productCounter: ProductCounter) => ProductCounter
  ) =>
  (productIdCounterList: ProductCounter[]): ProductCounter[] =>
    productIdCounterList.map((productIdCounter) =>
      product.id === productIdCounter.data.id
        ? mapper(productIdCounter)
        : productIdCounter
    );

export const addProduct =
  (product: Product) =>
  (productCounterList: ProductCounter[]): ProductCounter[] =>
    productCounterList.find(
      (productCounter) => productCounter.data.id === product.id
    )
      ? pipe(
          productCounterList,
          changeProductCounterListItem(product, incrementCounter)
        )
      : [...productCounterList, pipe(product, wrapCounter, incrementCounter)];

export const removeProduct =
  (product: Product) =>
  (productIdCounterList: ProductCounter[]): ProductCounter[] => {
    const foundProductCounter = productIdCounterList.find(
      (productIdCounter) => productIdCounter.data.id === product.id
    );
    return !foundProductCounter
      ? productIdCounterList
      : foundProductCounter.counter === 0
      ? productIdCounterList.filter(
          (productIdCounter) => productIdCounter.data.id !== product.id
        )
      : pipe(
          productIdCounterList,
          changeProductCounterListItem(product, decrementCounter)
        );
  };

export const getPriceOfProductList = (productCounterList: ProductCounter[]) =>
  productCounterList.reduce(
    (sum, { data, counter }) => sum + data.price * counter,
    0
  );
