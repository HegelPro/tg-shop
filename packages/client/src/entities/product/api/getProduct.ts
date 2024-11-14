import { graphql } from "shared/api/gql";
import { graphQLClient } from "shared/api/graphQLClient";

export const getProductQuery = graphql(/* GraphQL */ `
  query Product($productId: Int!) {
    product(productId: $productId) {
      __typename
      descrition
      discountPrice
      id
      image
      name
      price
      productCategory {
        singleName
      }
    }
  }
`);

export const getProduct = (productId: number) =>
  graphQLClient
    .request(getProductQuery, {
      productId,
    })
    .then(data => data.product);
