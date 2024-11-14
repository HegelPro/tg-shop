import { Counter } from "shared/lib/counter";
import { Product } from "./product";

export type ProductCounter = Counter<Product>;
// export const eqProductCounter = Eq.struct<ProductCounter>({
//   counter: N.Eq,
//   data: {
//     equals: (productCounter) =>
//   },
// });
