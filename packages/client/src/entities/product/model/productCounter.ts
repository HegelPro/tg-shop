import * as Eq from "fp-ts/Eq";
import { Counter } from "shared/lib/counter";
import { eqProduct, ProductQueryType } from "./product";

export type ProductCounter = Counter<ProductQueryType>;
export const eqProductCounter = Eq.struct<ProductCounter>({
  counter: {
    equals: (one, two) => one === two,
  },
  data: eqProduct,
});
