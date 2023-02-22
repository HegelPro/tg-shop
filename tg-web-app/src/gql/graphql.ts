/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type InvoiceUrlResult = {
  __typename?: 'InvoiceUrlResult';
  invoiceUrl: Scalars['String'];
  orderId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvoiceLink: InvoiceUrlResult;
  setInvoiceStatus: Scalars['String'];
};


export type MutationCreateInvoiceLinkArgs = {
  orderItemList: Array<OrderItem>;
};


export type MutationSetInvoiceStatusArgs = {
  invoiceStatus: Scalars['String'];
  orderId: Scalars['Int'];
};

export type OrderItem = {
  counter: Scalars['Int'];
  productId: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  currency: Scalars['String'];
  descrition?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  numberOfproduct: Scalars['Float'];
  price: Scalars['Float'];
  productCategory: ProductCategory;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  productList: Array<Product>;
};

export type CreateInvoiceLinkMutationVariables = Exact<{
  orderItemList: Array<OrderItem> | OrderItem;
}>;


export type CreateInvoiceLinkMutation = { __typename?: 'Mutation', createInvoiceLink: { __typename?: 'InvoiceUrlResult', invoiceUrl: string, orderId: number } };

export type SetInvoiceStatusMutationVariables = Exact<{
  orderId: Scalars['Int'];
  invoiceStatus: Scalars['String'];
}>;


export type SetInvoiceStatusMutation = { __typename?: 'Mutation', setInvoiceStatus: string };

export type ProductListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductListQuery = { __typename?: 'Query', productList: Array<{ __typename?: 'Product', name: string, descrition?: string | null, id: number, image: string, price: number, currency: string, numberOfproduct: number }> };


export const CreateInvoiceLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInvoiceLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderItemList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderItem"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvoiceLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderItemList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderItemList"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]} as unknown as DocumentNode<CreateInvoiceLinkMutation, CreateInvoiceLinkMutationVariables>;
export const SetInvoiceStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetInvoiceStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invoiceStatus"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setInvoiceStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"invoiceStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invoiceStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}]}]}}]} as unknown as DocumentNode<SetInvoiceStatusMutation, SetInvoiceStatusMutationVariables>;
export const ProductListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"descrition"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfproduct"}}]}}]}}]} as unknown as DocumentNode<ProductListQuery, ProductListQueryVariables>;