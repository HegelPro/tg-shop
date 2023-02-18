import { ShopItemList } from './components/ShopItemList/ShopItemList'
import { OrderItemList } from './components/OrderItemList/OrderItemList'
import {request} from 'graphql-request'
import {graphql} from './gql/gql';
import { useCallback, useEffect, useState } from "react";
import { ProductListQuery } from "./gql/graphql";
import { WithCounter } from './util/types';
import { useInitTelegram, useTelegram } from './hooks/useTelegram';

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

export type ProductQueryType = ProductListQuery['productList'][0]

function App() {
  useInitTelegram();
  const {BackButton} = useTelegram()

  const [page, setPage] = useState(0)
  const next = useCallback(() => setPage(page + 1), [page, setPage]);
  const back = useCallback(() => setPage(page - 1), [page, setPage]);

  const [productWithCounterList, setProductWithCounterList] = useState<(WithCounter<ProductQueryType>)[]>([]);
  const changeCounterByProductId = useCallback((id: number, value: number) => {
    setProductWithCounterList(
      productWithCounterList.map(productWithCounter => productWithCounter.data.id === id
        ? {data: productWithCounter.data, counter: productWithCounter.counter + value}
        : productWithCounter
      )
    );
  }, [productWithCounterList])
  const increamentCounterByProductId = useCallback((id: number) => changeCounterByProductId(id, 1), [changeCounterByProductId]);
  const decreamentCounterByProductId = useCallback((id: number) => changeCounterByProductId(id, -1), [changeCounterByProductId]);

  useEffect(() => {
      request(
          import.meta.env.VITE_GRAPHQL_ENDPOINT,
          getProductListQuery
      )
          .then(data => {
            setProductWithCounterList(data.productList.map(data => ({
              data,
              counter: 0,
            })))
          })
          .catch(console.error);
  }, []);


  useEffect(() => {
    if(page > 0) {
      BackButton.show()
    } else {
      BackButton.hide()
    }
  }, [BackButton, page])

  useEffect(() => {
    BackButton.onClick(back)
    return () => {
      BackButton.offClick(back)
    }
  }, [BackButton, back])

  return (
    <div className="App">
      <button onClick={back}>back</button>
      <button onClick={next}>next</button>
      {page === 0 && (
        <ShopItemList
          next={next}
          productWithCounterList={productWithCounterList}
          increament={increamentCounterByProductId}
          decreament={decreamentCounterByProductId}
        />
      )}
      {page === 1 && <OrderItemList productWithCounterList={productWithCounterList} />}
    </div>
  )
}

export default App
