import { graphql } from "../../../shared/api/gql";
import { graphQLClient } from "../../../shared/api/graphQLClient";
import { ProductQueryType } from "../model/Product";
import { serverErrorHandler } from "../../../shared/api/serverErrorHandler";

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
  graphQLClient.request(getProductListQuery)
    .then(data => data.productList)
    .catch(e => {
      serverErrorHandler(e);
      return [] as ProductQueryType[];
    });