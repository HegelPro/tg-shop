import { ProductWithCounter } from "../../../entities/product";
import { graphql } from "../../../shared/api/gql";
import { graphQLClient } from "../../../shared/api/graphQLClient";
import { getTelegramObject } from "../../../entities/telegram";

const createInvoiceUrlMutation = graphql(/* GraphQL */ `
  mutation CreateInvoiceLink($orderItemList: [OrderItem!]!) {
    createInvoiceLink(orderItemList: $orderItemList) {
      invoiceUrl
      orderId
    }
  }
`);

export const createInvoiceUrl = (notEmpryProductWithCounterList: ProductWithCounter[]) => graphQLClient.request(
  createInvoiceUrlMutation,
  {
    orderItemList: notEmpryProductWithCounterList
      .map(productWithCounter => ({
        counter: productWithCounter.counter,
        productId: productWithCounter.data.id
      }))
  }
)
  .catch(e => {
    console.error(e);
    getTelegramObject().WebApp.showPopup({ message: 'Server error' });
  });