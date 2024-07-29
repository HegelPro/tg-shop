import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { emptyFunction } from "../../shared/lib/placeholders";
import { getProductList } from "./api/getProductListQuery";
import { ProductWithCounter } from "./model/Product";
import { getNotEmptyProductWithCounterList } from "./lib/getNotEmptyProductWithCounterList";
import { getPriceOfProductList } from "./lib/getPriceOfProductList";

interface ProductStore {
  productWithCounterList: ProductWithCounter[]
  notEmptyProductWithCounterList: ProductWithCounter[]
  priceOfProductList: number
  changeCounterByProductId: (id: number, value: number) => void
  increamentCounterByProductId: (id: number) => void
  decreamentCounterByProductId: (id: number) => void
  refetchProductWithCounterList: () => void
}

const ProductStoreContext = createContext<ProductStore>({
  productWithCounterList: [],
  notEmptyProductWithCounterList: [],
  priceOfProductList: 0,
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
    getProductList().then(productWithCounterList => {
      setProductWithCounterList(productWithCounterList)
    })
  }, [])

  useEffect(() => { refetchProductWithCounterList() }, [refetchProductWithCounterList]);

  const notEmptyProductWithCounterList = useMemo(
    () => getNotEmptyProductWithCounterList(productWithCounterList),
    [productWithCounterList]
  )

  const priceOfProductList = useMemo(
    () => getPriceOfProductList(notEmptyProductWithCounterList),
    [notEmptyProductWithCounterList]
  )

  return (
    <ProductStoreContext.Provider value={{
      productWithCounterList,
      notEmptyProductWithCounterList,
      priceOfProductList,
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
