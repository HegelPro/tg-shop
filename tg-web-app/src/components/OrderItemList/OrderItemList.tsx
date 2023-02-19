import request from "graphql-request";
import { useCallback, useEffect, useMemo } from "react";
import type { ProductQueryType } from "../../App";
import { graphql } from "../../gql";
import { MainButton, openInvoice, showPopup } from "../../util/tg";
import { WithCounter } from "../../util/types";
import { NoTelegram } from "../NoTelegram/NoTelegram";
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
  const notEmpryProductWithCounterList = useMemo(
    () => productWithCounterList.filter(productWithCounter => productWithCounter.counter > 0),
    [productWithCounterList]
  )

    const onPayHandler = useCallback(() => {
        request(
            import.meta.env.VITE_GRAPHQL_ENDPOINT,
            getinvoiceUrlQuery,
            {
              orderItemList: notEmpryProductWithCounterList
                .map(productWithCounter => ({
                  counter: productWithCounter.counter,
                  productId: productWithCounter.data.id
                }))
            }
        )
            .then(data => openInvoice(data.invoiceUrl))
            .catch(e => {
              console.error(e);
              showPopup({message: 'Server error'});
            });
    }, [notEmpryProductWithCounterList])

    const sumOfProductPrices = useMemo(
      () => notEmpryProductWithCounterList.reduce((sum, {data, counter}) => sum + data.price * counter, 0),
      [notEmpryProductWithCounterList]
    )

    useEffect(() => {
      MainButton.setText(`Pay: ${sumOfProductPrices} rub`);
    }, [sumOfProductPrices])

    useEffect(() => {
      MainButton.onClick(onPayHandler)
      return () => {MainButton.offClick(onPayHandler)}
    }, [onPayHandler])

    return (
        <div>
            <div>
                {notEmpryProductWithCounterList
                    .map((productWithCounter) => (
                      <OrderItem key={productWithCounter.data.id} productWithCounter={productWithCounter}/>
                    ))
                }
            </div>
            <NoTelegram>
              <button onClick={onPayHandler}>Pay</button>
            </NoTelegram>
        </div>
    );
}