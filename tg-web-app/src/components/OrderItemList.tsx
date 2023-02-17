import request from "graphql-request";
import { useCallback, useEffect, useMemo } from "react";
import type { CounterData } from "../App";
import { graphql } from "../gql";
import { ProductListQuery } from "../gql/graphql";
import { OrderItem } from "./OrderItem";

const getinvoiceUrlQuery = graphql(/* GraphQL */ `
  mutation NewQuery($productList: [ProductInput!]!) {
    invoiceUrl(productList: $productList) 
  }
`);

interface OrderItemListProps {
  items: CounterData<ProductListQuery['productList'][0]>[]
}

export const OrderItemList = ({items}: OrderItemListProps) => {
    const onPayHandler = useCallback(() => {
        request(
            import.meta.env.VITE_GRAPHQL_ENDPOINT,
            getinvoiceUrlQuery,
            {
              productList: items
                .filter(item => item.counter > 0)
                .map(item => ({
                  counter: item.counter,
                  id: item.data.id
                }))
            }
        )
            .then(data => {
              (window as any).Telegram.WebApp.openInvoice(data.invoiceUrl)
            })
            .catch(console.error);
    }, [items])

    const sum = useMemo(() => items.reduce((sum, item) => sum + item.data.price * item.counter, 0), [items])

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
                {items
                    .filter(item => item.counter > 0)
                    .map(item => (
                      <OrderItem
                        image={item.data.image}
                        key={item.data.id}
                        name={item.data.name}
                        description={item.data.descrition}
                        price={item.data.price}
                        counter={item.counter}
                      />
                    ))
                }
            </div>
            <button onClick={onPayHandler}>Pay</button>
        </div>
    );
}