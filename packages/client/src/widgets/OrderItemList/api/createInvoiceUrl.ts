import { ProductCounter } from "entities/product";
import { graphql } from "shared/api/gql";
import { graphQLClient } from "shared/api/graphQLClient";
import { serverErrorHandler } from "shared/api/serverErrorHandler";

const createInvoiceUrlMutation = graphql(/* GraphQL */ `
  mutation CreateInvoiceLink($orderItemList: [OrderItem!]!) {
    createInvoiceLink(orderItemList: $orderItemList) {
      invoiceUrl
      orderId
    }
  }
`);

export const createInvoiceUrl = (
  notEmpryProductCounterList: ProductCounter[]
) =>
  graphQLClient
    .request(createInvoiceUrlMutation, {
      orderItemList: notEmpryProductCounterList.map((productCounter) => ({
        counter: productCounter.counter,
        productId: productCounter.data.id,
      })),
    })
    .catch((e) => {
      serverErrorHandler(e);
    });
