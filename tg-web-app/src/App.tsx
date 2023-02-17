import { ShopItemList } from './components/ShopItemList'
import { OrderItemList } from './components/OrderItemList'
import {request} from 'graphql-request'
import {graphql} from './gql/gql';
import { useCallback, useEffect, useState } from "react";
import { ProductListQuery } from "./gql/graphql";

const getUserQuery = graphql(/* GraphQL */ `
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

export interface CounterData<T> {
  data: T;
  counter: number;
}

function App() {
  useEffect(() => (window as any).Telegram.WebApp.ready(), [])

  const [page, setPage] = useState(0)

  const [items, setItems] = useState<(CounterData<ProductListQuery['productList'][0]>)[]>([]);

  const next = useCallback(() => setPage(page + 1), [page, setPage]);
  const back = useCallback(() => setPage(page - 1), [page, setPage]);

  const increament = useCallback((id: number) => {
    setItems(
      items.map(item => item.data.id === id
        ? {data: item.data, counter: item.counter + 1}
        : item
      )
    );
  }, [items, setItems]);

  const decreament = useCallback((id: number) => {
    setItems(
      items.map(item => item.data.id === id
        ? {data: item.data, counter: item.counter - 1}
        : item
      )
    );
  }, [items, setItems]);

  useEffect(() => {
      request(
          import.meta.env.VITE_GRAPHQL_ENDPOINT,
          getUserQuery
      )
          .then(data => {
            setItems(data.productList.map(data => ({
              data: {...data},
              counter: 0,
            })))
          })
          .catch(console.error);
  }, []);


  useEffect(() => {
    if(page > 0) {
      (window as any).Telegram.WebApp.BackButton.show()
    } else {
      (window as any).Telegram.WebApp.BackButton.hide()
    }
  }, [page])

  useEffect(() => {
    (window as any).Telegram.WebApp.BackButton.onClick(back)
    return () => {
      (window as any).Telegram.WebApp.BackButton.offClick(back)
    }
  }, [back])

  return (
    <div className="App">
      <button onClick={back}>back</button>
      <button onClick={next}>next</button>
      {page === 0 && (
        <ShopItemList
          next={next}
          items={items}
          increament={increament}
          decreament={decreament}
        />
      )}
      {page === 1 && <OrderItemList items={items} />}
    </div>
  )
}

export default App
