import { graphql } from "shared/api/gql";
import { ProductListQuery } from "shared/api/gql/graphql";
import { graphQLClient } from "shared/api/graphQLClient";
import { serverErrorHandler } from "shared/api/serverErrorHandler";

const getProductListQuery = graphql(/* GraphQL */ `
  query ProductList {
    productList {
      name
      descrition
      id
      image
      price
      discountPrice
    }
  }
`);

export const getProductList = () =>
  graphQLClient
    .request(getProductListQuery)
    .then((data) => data.productList)
    .catch((e) => {
      serverErrorHandler(e);
      return [] as ProductListQuery['productList'];
    });
