import * as Eq from "fp-ts/Eq";
import { ProductListWithCategoryFilterQuery, ProductQuery } from "shared/api/gql/graphql";

export type Product = ProductListWithCategoryFilterQuery['productListWithCategoryFilter'][0] | ProductQuery['product'];
export const eqProduct: Eq.Eq<Product> = {
  equals: (one, two) => one.id === two.id,
};
