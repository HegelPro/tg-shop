import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { wrapCounter } from "shared/lib/counter";
import { emptyFunction } from "shared/lib/placeholders";
import { ProductCounter } from "../model/productCounter";
import { getProductList } from "../api/getProductList";
import {
  getNotEmptyProductCounterList,
  getPriceOfProductList,
} from "../model/productCounterList";

interface ProductStore {
  productCounterList: ProductCounter[];
  setProductCounterList: React.Dispatch<React.SetStateAction<ProductCounter[]>>;
  notEmptyProductCounterList: ProductCounter[];
  priceOfProductList: number;
  refetchProductCounterList: () => void;
}

const ProductStoreContext = createContext<ProductStore>({
  productCounterList: [],
  notEmptyProductCounterList: [],
  priceOfProductList: 0,
  setProductCounterList: emptyFunction,
  refetchProductCounterList: emptyFunction,
});

export const ProductStoreProvider = ({ children }: PropsWithChildren) => {
  const [productCounterList, setProductCounterList] = useState<
    ProductCounter[]
  >([]);

  const refetchProductCounterList = useCallback(() => {
    getProductList().then((productList) => {
      setProductCounterList(productList.map(wrapCounter));
    });
  }, []);

  useEffect(() => {
    refetchProductCounterList();
  }, [refetchProductCounterList]);

  const notEmptyProductCounterList = useMemo(
    () => getNotEmptyProductCounterList(productCounterList),
    [productCounterList]
  );

  const priceOfProductList = useMemo(
    () => getPriceOfProductList(notEmptyProductCounterList),
    [notEmptyProductCounterList]
  );

  return (
    <ProductStoreContext.Provider
      value={{
        productCounterList,
        notEmptyProductCounterList,
        priceOfProductList,
        setProductCounterList,
        refetchProductCounterList,
      }}
    >
      {children}
    </ProductStoreContext.Provider>
  );
};
export const useProductStore = () => useContext(ProductStoreContext);
