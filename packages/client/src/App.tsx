import { ShopItemList } from './components/ShopItemList/ShopItemList'
import { OrderItemList } from './components/OrderItemList/OrderItemList'
import { useCallback, useEffect, useState } from "react";
import { Layout } from './components/Layout/Layout';
import { ProductStoreProvider } from './store/productStore';
import { getTelegramObject } from './util/getTelegramObject';

export const App = () => {
  const [page, setPage] = useState(0)
  const next = useCallback(() => setPage(page + 1), [page]);
  const back = useCallback(() => setPage(page - 1), [page]);

  useEffect(() => {
    getTelegramObject().WebApp.ready()
  }, []);

  return (
    <div className="App">
      <ProductStoreProvider>
        <Layout>
          {page === 0 && <ShopItemList next={next} />}
          {page === 1 && <OrderItemList back={back} />}
        </Layout>
      </ProductStoreProvider>
    </div>
  )
}
