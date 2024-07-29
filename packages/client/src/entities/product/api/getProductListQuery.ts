import { graphql } from "../../../shared/api/gql";
import { wrapWithCounter } from "../../../shared/lib/withCounter";
import { getTelegramObject } from "../../telegram";
import { graphQLClient } from "../../../shared/api/graphQLClient";

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
    .then(data => data.productList.map(wrapWithCounter))
    .catch(e => {
      console.error(e);
      getTelegramObject().WebApp.showPopup({ message: 'Server error' })
      return [];
    });