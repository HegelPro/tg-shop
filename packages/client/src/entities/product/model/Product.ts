import { ProductListQuery } from "../../../shared/api/gql/graphql";
import { WithCounter } from "../../../shared/lib/withCounter";

type ProductQueryType = ProductListQuery['productList'][0]
export type ProductWithCounter = WithCounter<ProductQueryType>