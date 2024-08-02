import * as Eq from "fp-ts/Eq";
import { ProductListQuery } from "shared/api/gql/graphql";

export type ProductQueryType = ProductListQuery["productList"][0];
export const eqProduct: Eq.Eq<ProductQueryType> = {
  equals: (one, two) => one.id === two.id,
};
