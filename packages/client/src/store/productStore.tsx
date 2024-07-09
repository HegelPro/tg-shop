import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { ProductListQuery } from "../gql/graphql";
import { emptyFunction } from "../util/placeholders";
import { WithCounter, wrapWithCounter } from "../util/withCounter";
import { graphql } from "../gql";
import { getTelegramObject } from "../util/getTelegramObject";
import { graphQLClient } from "../util/graphQLClient";

const getProductListQuery = graphql(/* GraphQL */ `
  query ProductList {
    productList {
        name
        descrition
        id
        image
        price
        currency
        numberOfproduct
    }
  }
`);

type ProductQueryType = ProductListQuery['productList'][0]
export type ProductWithCounter = WithCounter<ProductQueryType>
interface ProductStore {
  productWithCounterList: ProductWithCounter[]
  changeCounterByProductId: (id: number, value: number) => void
  increamentCounterByProductId: (id: number) => void
  decreamentCounterByProductId: (id: number) => void
  refetchProductWithCounterList: () => void
}

const ProductStoreContext = createContext<ProductStore>({
  productWithCounterList: [],
  refetchProductWithCounterList: emptyFunction,
  changeCounterByProductId: emptyFunction,
  increamentCounterByProductId: emptyFunction,
  decreamentCounterByProductId: emptyFunction
})

export const ProductStoreProvider = ({ children }: PropsWithChildren) => {
  const [productWithCounterList, setProductWithCounterList] = useState<ProductWithCounter[]>([]);
  const changeCounterByProductId = useCallback((id: number, value: number) => {
    setProductWithCounterList(
      productWithCounterList.map(productWithCounter => productWithCounter.data.id === id
        ? { data: productWithCounter.data, counter: productWithCounter.counter + value }
        : productWithCounter
      )
    );
  }, [productWithCounterList])
  const increamentCounterByProductId = useCallback((id: number) => changeCounterByProductId(id, 1), [changeCounterByProductId]);
  const decreamentCounterByProductId = useCallback((id: number) => changeCounterByProductId(id, -1), [changeCounterByProductId]);

  const refetchProductWithCounterList = useCallback(() => {
    graphQLClient.request(getProductListQuery)
      .then(data => data.productList.map(wrapWithCounter))
      .then(productWithCounterList => setProductWithCounterList(productWithCounterList))
      .catch(e => {
        console.error(e);
        getTelegramObject().WebApp.showPopup({ message: 'Server error' })
      });
  }, [])

  useEffect(() => { refetchProductWithCounterList() }, [refetchProductWithCounterList]);

  return (
    <ProductStoreContext.Provider value={{
      productWithCounterList,
      changeCounterByProductId,
      increamentCounterByProductId,
      decreamentCounterByProductId,
      refetchProductWithCounterList
    }}>
      {children}
    </ProductStoreContext.Provider>
  )
}
export const useProductStore = () => useContext(ProductStoreContext)
