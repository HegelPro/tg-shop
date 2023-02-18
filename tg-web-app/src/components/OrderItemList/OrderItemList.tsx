import request from "graphql-request";
import { useCallback, useEffect, useMemo } from "react";
import type { ProductQueryType } from "../../App";
import { graphql } from "../../gql";
import { useTelegram } from "../../hooks/useTelegram";
import { WithCounter } from "../../util/types";
import { OrderItem } from "./OrderItem";

const getinvoiceUrlQuery = graphql(/* GraphQL */ `
  mutation NewQuery($orderItemList: [OrderItem!]!) {
    invoiceUrl(orderItemList: $orderItemList) 
  }
`);

interface OrderItemListProps {
  productWithCounterList: WithCounter<ProductQueryType>[]
}

export const OrderItemList = ({productWithCounterList}: OrderItemListProps) => {
  const {MainButton, openInvoice} = useTelegram();

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
            .then(data => openInvoice(data.invoiceUrl))
            .catch(console.error);
    }, [openInvoice, productWithCounterList])

    const sum = useMemo(() => productWithCounterList.reduce((sum, {data, counter}) => sum + data.price * counter, 0), [productWithCounterList])

    useEffect(() => {
      MainButton.setText(`Pay: ${sum} rub`);
    }, [MainButton, sum])

    useEffect(() => {
      MainButton.onClick(onPayHandler)
      return () => {MainButton.offClick(onPayHandler)}
    }, [MainButton, onPayHandler])

    return (
        <div>
            <div>
                {productWithCounterList
                    .filter(productWithCounter => productWithCounter.counter > 0)
                    .map((productWithCounter) => (
                      <OrderItem key={productWithCounter.data.id} productWithCounter={productWithCounter}/>
                    ))
                }
            </div>
            
            <button onClick={onPayHandler}>Pay</button>
        </div>
    );
}