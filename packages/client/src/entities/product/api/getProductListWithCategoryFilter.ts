import { graphql } from "shared/api/gql";
import { graphQLClient } from "shared/api/graphQLClient";
import { serverErrorHandler } from "shared/api/serverErrorHandler";
import {
  ProductCategory,
  ProductListWithCategoryFilterQuery,
} from "shared/api/gql/graphql";

const getProductListWithCategoryFilterQuery = graphql(/* GraphQL */ `
  query ProductListWithCategoryFilter($productCategoryId: Int) {
    productListWithCategoryFilter(productCategoryId: $productCategoryId) {
      name
      descrition
      id
      image
      price
      discountPrice
    }
  }
`);

export const getProductListWithCategoryFilter = (
  productCategoryId?: ProductCategory['id']
) =>
  graphQLClient
    .request(getProductListWithCategoryFilterQuery, {
      productCategoryId: productCategoryId,
    })
    .then((data) => data.productListWithCategoryFilter)
    .catch((e) => {
      serverErrorHandler(e);
      return [] as ProductListWithCategoryFilterQuery["productListWithCategoryFilter"];
    });
