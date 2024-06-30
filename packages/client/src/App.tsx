import { ShopItemList } from './components/ShopItemList/ShopItemList'
import { OrderItemList } from './components/OrderItemList/OrderItemList'
import { useCallback, useState } from "react";
import { useInitTelegram } from './hooks/useInitTelegram';
import { Layout } from './components/Layout/Layout';
import { ProductStoreProvider } from './store/productStore';

export const App = () => {
  const [page, setPage] = useState(0)
  const next = useCallback(() => setPage(page + 1), [page]);
  const back = useCallback(() => setPage(page - 1), [page]);

  useInitTelegram({ page, back });

  return (
    <div className="App">
      <ProductStoreProvider>
        <Layout toolpanel={(
          <>
            <button onClick={back}>back</button>
            <button onClick={next}>next</button>
          </>
        )}>
          {page === 0 && <ShopItemList next={next} />}
          {page === 1 && <OrderItemList />}
        </Layout>
      </ProductStoreProvider>
    </div>
  )
}
