import request from "graphql-request";
import { useCallback, useEffect, useMemo } from "react";
import type { CounterData } from "../App";
import { graphql } from "../gql";
import { ProductListQuery } from "../gql/graphql";
import { OrderItem } from "./OrderItem";

const getinvoiceUrlQuery = graphql(/* GraphQL */ `
  mutation NewQuery($orderItemList: [OrderItem!]!) {
    invoiceUrl(orderItemList: $orderItemList) 
  }
`);

interface OrderItemListProps {
  productWithCounterList: CounterData<ProductListQuery['productList'][0]>[]
}

export const OrderItemList = ({productWithCounterList}: OrderItemListProps) => {
    const onPayHandler = useCallback(() => {
        request(
            import.meta.env.VITE_GRAPHQL_ENDPOINT,
            getinvoiceUrlQuery,
            {
              orderItemList: productWithCounterList
                .filter(productWithCounter => productWithCounter.counter > 0)
                .map(productWithCounter => ({
                  counter: productWithCounter.counter,
                  productId: productWithCounter.data.id
                }))
            }
        )
            .then(data => {
              (window as any).Telegram.WebApp.openInvoice(data.invoiceUrl)
            })
            .catch(console.error);
    }, [productWithCounterList])

    const sum = useMemo(() => productWithCounterList.reduce((sum, {data, counter}) => sum + data.price * counter, 0), [productWithCounterList])

    useEffect(() => {
      (window as any).Telegram.WebApp.MainButton.setText(`Invoice: ${sum}`);
    }, [sum])

    useEffect(() => {
      (window as any).Telegram.WebApp.MainButton.onClick(onPayHandler)
      return () => {(window as any).Telegram.WebApp.MainButton.offClick(onPayHandler)}
    }, [onPayHandler])

    return (
        <div>
            <div>
                {productWithCounterList
                    .filter(productWithCounter => productWithCounter.counter > 0)
                    .map(({data, counter}) => (
                      <OrderItem
                        image={data.image}
                        key={data.id}
                        name={data.name}
                        description={data.descrition}
                        price={data.price}
                        counter={counter}
                      />
                    ))
                }
            </div>
            <button onClick={onPayHandler}>Pay</button>
        </div>
    );
}