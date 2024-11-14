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
  message?: Maybe<Scalars['String']>;
};

export type InvoiceUrlResult = {
  __typename?: 'InvoiceUrlResult';
  invoiceUrl: Scalars['String'];
  orderId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvoiceLink: InvoiceUrlResult;
};


export type MutationCreateInvoiceLinkArgs = {
  orderItemList: Array<OrderItem>;
  telegramUserId: Scalars['Int'];
};

export type OrderItem = {
  counter: Scalars['Int'];
  productId: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  descrition?: Maybe<Scalars['String']>;
  discountPrice?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  productCategory: ProductCategory;
  shortDescrition?: Maybe<Scalars['String']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  id: Scalars['Int'];
  pluralName: Scalars['String'];
  singleName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  product: Product;
  productCategoryList: Array<ProductCategory>;
  productList: Array<Product>;
  productListWithCategoryFilter: Array<Product>;
};


export type QueryProductArgs = {
  productId: Scalars['Int'];
};


export type QueryProductListWithCategoryFilterArgs = {
  productCategoryId?: InputMaybe<Scalars['Int']>;
};

export type ProductQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename: 'Product', descrition?: string | null, discountPrice?: number | null, id: number, image?: string | null, name: string, price: number, productCategory: { __typename?: 'ProductCategory', singleName: string } } };

export type ProductCategoryListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoryListQuery = { __typename?: 'Query', productCategoryList: Array<{ __typename?: 'ProductCategory', id: number, pluralName: string, singleName: string }> };

export type ProductListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductListQuery = { __typename?: 'Query', productList: Array<{ __typename?: 'Product', name: string, descrition?: string | null, id: number, image?: string | null, price: number, discountPrice?: number | null }> };

export type ProductListWithCategoryFilterQueryVariables = Exact<{
  productCategoryId?: InputMaybe<Scalars['Int']>;
}>;


export type ProductListWithCategoryFilterQuery = { __typename?: 'Query', productListWithCategoryFilter: Array<{ __typename?: 'Product', name: string, descrition?: string | null, id: number, image?: string | null, price: number, discountPrice?: number | null }> };

export type CreateInvoiceLinkMutationVariables = Exact<{
  telegramUserId: Scalars['Int'];
  orderItemList: Array<OrderItem> | OrderItem;
}>;


export type CreateInvoiceLinkMutation = { __typename?: 'Mutation', createInvoiceLink: { __typename?: 'InvoiceUrlResult', invoiceUrl: string, orderId: number } };


export const ProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Product"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"descrition"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"singleName"}}]}}]}}]}}]} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const ProductCategoryListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductCategoryList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCategoryList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pluralName"}},{"kind":"Field","name":{"kind":"Name","value":"singleName"}}]}}]}}]} as unknown as DocumentNode<ProductCategoryListQuery, ProductCategoryListQueryVariables>;
export const ProductListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"descrition"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}}]}}]}}]} as unknown as DocumentNode<ProductListQuery, ProductListQueryVariables>;
export const ProductListWithCategoryFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductListWithCategoryFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productListWithCategoryFilter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"descrition"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountPrice"}}]}}]}}]} as unknown as DocumentNode<ProductListWithCategoryFilterQuery, ProductListWithCategoryFilterQueryVariables>;
export const CreateInvoiceLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInvoiceLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"telegramUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderItemList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderItem"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInvoiceLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"telegramUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"telegramUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderItemList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderItemList"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]} as unknown as DocumentNode<CreateInvoiceLinkMutation, CreateInvoiceLinkMutationVariables>;