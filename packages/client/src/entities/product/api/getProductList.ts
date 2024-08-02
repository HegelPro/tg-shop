import { graphql } from "shared/api/gql";
import { graphQLClient } from "shared/api/graphQLClient";
import { serverErrorHandler } from "shared/api/serverErrorHandler";
import { ProductQueryType } from "../model/product";

const getProductListQuery = graphql(/* GraphQL */ `
  query ProductList {
    productList {
      name
      descrition
      id
      image
      price
      currency
      numberOfproduct
    }
  }
`);

export const getProductList = () =>
  graphQLClient
    .request(getProductListQuery)
    .then((data) => data.productList)
    .catch((e) => {
      serverErrorHandler(e);
      return [] as ProductQueryType[];
    });
