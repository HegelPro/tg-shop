import { graphql } from "../../../shared/api/gql";
import { graphQLClient } from "../../../shared/api/graphQLClient";
import { getTelegramObject } from "../../../entities/telegram";

const setInvoiceStatusMutation = graphql(/* GraphQL */ `
  mutation SetInvoiceStatus($orderId: Int!, $invoiceStatus: String!) { 
    setInvoiceStatus(invoiceStatus: $invoiceStatus, orderId: $orderId)
  }
`);

export const setInvoiceStatus = ({
  invoiceStatus,
  orderId,
}: {
  invoiceStatus: string,
  orderId: number,
}) => graphQLClient.request(
  setInvoiceStatusMutation,
  {
    invoiceStatus,
    orderId
  }
)
  .catch(e => {
    console.error(e);
    getTelegramObject().WebApp.showPopup({ message: 'Server error' });
  })