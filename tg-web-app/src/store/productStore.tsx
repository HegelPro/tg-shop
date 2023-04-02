import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { graphql } from "../gql";
import { ProductListQuery } from "../gql/graphql";
import { graphQLClient } from "../util/graphQLClient";
import { emptyFunction } from "../util/placeholders";
import { showPopup } from "../util/tg";
import { WithCounter } from "../util/types";

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

export const getProductList = (onLoad: (productWithCounterList: ProductWithCounter[]) => void) => {
  graphQLClient.request(getProductListQuery)
    .then(data => {
      onLoad(data.productList.map(data => ({
        data,
        counter: 0,
      })))
    })
    .catch(e => {
      console.error(e);
      showPopup({message: 'Server error'})
    });
}

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
type ProductStoreProviderProps = PropsWithChildren
export const ProductStoreProvider = ({children}: ProductStoreProviderProps) => {
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

  const refetchProductWithCounterList = useCallback(() => getProductList(setProductWithCounterList), [])

  useEffect(() => {refetchProductWithCounterList()}, [refetchProductWithCounterList]);

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
