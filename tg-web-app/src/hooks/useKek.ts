import { graphql } from "../gql";

const createInvoiceUrlMutation = graphql(/* GraphQL */ `
  mutation CreateInvoiceLink($orderItemList: [OrderItem!]!) {
    createInvoiceLink(orderItemList: $orderItemList) {
      invoiceUrl
      orderId
    }
  }
`);

const setInvoiceStatusMutation = graphql(/* GraphQL */ `
  mutation SetInvoiceStatus($orderId: Int!, $invoiceStatus: String!) { 
    setInvoiceStatus(invoiceStatus: $invoiceStatus, orderId: $orderId)
  }
`);