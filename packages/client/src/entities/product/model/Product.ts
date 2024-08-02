import * as Eq from "fp-ts/Eq";
import { ProductListQuery } from "../../../shared/api/gql/graphql";
import { decrementCounter, incrementCounter, Counter } from "../../../shared/lib/counter";

export type ProductQueryType = ProductListQuery['productList'][0]
export type ProductCounter = Counter<ProductQueryType>
export const eqProduct: Eq.Eq<ProductQueryType> = {
    equals: (one, two) => one.id === two.id
}
export const eqProductCounter = Eq.struct<ProductCounter>({
    counter: {
        equals: (one, two) => one === two
    },
    data: eqProduct
})
export const changeProductCounterListItem =
    (
        productCounterOne: ProductCounter,
        mapper: (productCounter: ProductCounter) => ProductCounter
    ) => (productCounterList: ProductCounter[]): ProductCounter[] =>
            productCounterList.map(productCounterTwo => eqProductCounter.equals(productCounterOne, productCounterTwo)
                ? mapper(productCounterTwo)
                : productCounterTwo
            )

export const increamentProductCounter = (productCounter: ProductCounter) => changeProductCounterListItem(
    productCounter,
    incrementCounter
)

export const decreamentProductCounter = (productCounter: ProductCounter) => changeProductCounterListItem(
    productCounter,
    decrementCounter
)
