import { ProductCounter } from "entities/product";
import { graphql } from "shared/api/gql";
import { graphQLClient } from "shared/api/graphQLClient";
import { serverErrorHandler } from "shared/api/serverErrorHandler";

const createInvoiceUrlMutation = graphql(/* GraphQL */ `
  mutation CreateInvoiceLink(
    $telegramUserId: Int!
    $orderItemList: [OrderItem!]!
  ) {
    createInvoiceLink(
      telegramUserId: $telegramUserId
      orderItemList: $orderItemList
    ) {
      invoiceUrl
      orderId
    }
  }
`);

export const createInvoiceUrl = (
  telegramUserId: number,
  notEmpryProductCounterList: ProductCounter[]
) =>
  graphQLClient
    .request(createInvoiceUrlMutation, {
      telegramUserId,
      orderItemList: notEmpryProductCounterList.map((productCounter) => ({
        counter: productCounter.counter,
        productId: productCounter.data.id,
      })),
    })
    .catch((e) => {
      serverErrorHandler(e);
    });
