/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query Product($productId: Int!) {\n    product(productId: $productId) {\n      __typename\n      descrition\n      discountPrice\n      id\n      image\n      name\n      price\n      productCategory {\n        singleName\n      }\n    }\n  }\n": types.ProductDocument,
    "\n  query ProductCategoryList {\n    productCategoryList {\n      id\n      pluralName\n      singleName\n    }\n  }\n": types.ProductCategoryListDocument,
    "\n  query ProductList {\n    productList {\n      name\n      descrition\n      id\n      image\n      price\n      discountPrice\n    }\n  }\n": types.ProductListDocument,
    "\n  query ProductListWithCategoryFilter($productCategoryId: Int) {\n    productListWithCategoryFilter(productCategoryId: $productCategoryId) {\n      name\n      descrition\n      id\n      image\n      price\n      discountPrice\n    }\n  }\n": types.ProductListWithCategoryFilterDocument,
    "\n  mutation CreateInvoiceLink(\n    $telegramUserId: Int!\n    $orderItemList: [OrderItem!]!\n  ) {\n    createInvoiceLink(\n      telegramUserId: $telegramUserId\n      orderItemList: $orderItemList\n    ) {\n      invoiceUrl\n      orderId\n    }\n  }\n": types.CreateInvoiceLinkDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($productId: Int!) {\n    product(productId: $productId) {\n      __typename\n      descrition\n      discountPrice\n      id\n      image\n      name\n      price\n      productCategory {\n        singleName\n      }\n    }\n  }\n"): (typeof documents)["\n  query Product($productId: Int!) {\n    product(productId: $productId) {\n      __typename\n      descrition\n      discountPrice\n      id\n      image\n      name\n      price\n      productCategory {\n        singleName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductCategoryList {\n    productCategoryList {\n      id\n      pluralName\n      singleName\n    }\n  }\n"): (typeof documents)["\n  query ProductCategoryList {\n    productCategoryList {\n      id\n      pluralName\n      singleName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductList {\n    productList {\n      name\n      descrition\n      id\n      image\n      price\n      discountPrice\n    }\n  }\n"): (typeof documents)["\n  query ProductList {\n    productList {\n      name\n      descrition\n      id\n      image\n      price\n      discountPrice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductListWithCategoryFilter($productCategoryId: Int) {\n    productListWithCategoryFilter(productCategoryId: $productCategoryId) {\n      name\n      descrition\n      id\n      image\n      price\n      discountPrice\n    }\n  }\n"): (typeof documents)["\n  query ProductListWithCategoryFilter($productCategoryId: Int) {\n    productListWithCategoryFilter(productCategoryId: $productCategoryId) {\n      name\n      descrition\n      id\n      image\n      price\n      discountPrice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInvoiceLink(\n    $telegramUserId: Int!\n    $orderItemList: [OrderItem!]!\n  ) {\n    createInvoiceLink(\n      telegramUserId: $telegramUserId\n      orderItemList: $orderItemList\n    ) {\n      invoiceUrl\n      orderId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateInvoiceLink(\n    $telegramUserId: Int!\n    $orderItemList: [OrderItem!]!\n  ) {\n    createInvoiceLink(\n      telegramUserId: $telegramUserId\n      orderItemList: $orderItemList\n    ) {\n      invoiceUrl\n      orderId\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;