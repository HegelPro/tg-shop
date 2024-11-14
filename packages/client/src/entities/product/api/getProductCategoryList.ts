import { graphql } from "shared/api/gql";
import { ProductCategoryListQuery } from "shared/api/gql/graphql";
import { graphQLClient } from "shared/api/graphQLClient";
import { serverErrorHandler } from "shared/api/serverErrorHandler";

const productCategoryListQuery = graphql(/* GraphQL */ `
  query ProductCategoryList {
    productCategoryList {
      id
      pluralName
      singleName
    }
  }
`);

export const getProductCategoryList = () =>
  graphQLClient
    .request(productCategoryListQuery)
    .then((data) => data.productCategoryList)
    .catch((e) => {
      serverErrorHandler(e);
      return [] as ProductCategoryListQuery['productCategoryList'];
    });
