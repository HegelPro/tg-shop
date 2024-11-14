import { graphql } from "shared/api/gql";
import { graphQLClient } from "shared/api/graphQLClient";
import { serverErrorHandler } from "shared/api/serverErrorHandler";

// const setInvoiceStatusMutation = graphql(/* GraphQL */ `
//   mutation SetInvoiceStatus($orderId: Int!, $invoiceStatus: String!) {
//     setInvoiceStatus(invoiceStatus: $invoiceStatus, orderId: $orderId)
//   }
// `);

// export const setInvoiceStatus = ({
//   invoiceStatus,
//   orderId,
// }: {
//   invoiceStatus: string;
//   orderId: number;
// }) =>
//   graphQLClient
//     .request(setInvoiceStatusMutation, {
//       invoiceStatus,
//       orderId,
//     })
//     .catch((e) => {
//       serverErrorHandler(e);
//     });
