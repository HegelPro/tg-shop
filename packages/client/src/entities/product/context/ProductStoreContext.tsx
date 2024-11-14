import { createContext, PropsWithChildren, useContext, useState } from "react";
import { emptyFunction } from "shared/lib/placeholders";
import { ProductCounter } from "../model/productCounter";

interface ProductStore {
  productCounterList: ProductCounter[];
  setProductCounterList: React.Dispatch<React.SetStateAction<ProductCounter[]>>;
}

const ProductStoreContext = createContext<ProductStore>({
  productCounterList: [],
  setProductCounterList: emptyFunction,
});

export const ProductStoreProvider = ({ children }: PropsWithChildren) => {
  const [productCounterList, setProductCounterList] = useState<
    ProductCounter[]
  >([]);

  return (
    <ProductStoreContext.Provider
      value={{
        productCounterList,
        setProductCounterList,
      }}
    >
      {children}
    </ProductStoreContext.Provider>
  );
};
export const useProductStore = () => useContext(ProductStoreContext);
