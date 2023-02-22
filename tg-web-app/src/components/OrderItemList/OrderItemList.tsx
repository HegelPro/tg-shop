import { useCallback, useEffect, useMemo, useState } from "react";
import { graphql } from "../../gql";
import { useProductStore } from "../../store/productStore";
import { graphQLClient } from "../../util/graphQLClient";
import { MainButton, openInvoice, showPopup, tgOff, tgOn } from "../../util/tg";
import { NoTelegram } from "../NoTelegram/NoTelegram";
import { OrderItem } from "./OrderItem";


const createInvoiceUrlMutation = graphql(/* GraphQL */ `
  mutation CreateInvoiceLink($orderItemList: [OrderItem!]!) {
    createInvoiceLink(orderItemList: $orderItemList) {
      invoiceUrl
      orderId
    }
  }
`);

const setInvoiceStatusMutation = graphql(/* GraphQL */ `
  mutation SetInvoiceStatus($orderId: Int!, $invoiceStatus: String!) { 
    setInvoiceStatus(invoiceStatus: $invoiceStatus, orderId: $orderId)
  }
`);

export const OrderItemList = () => {
  const { productWithCounterList, refetchProductWithCounterList } = useProductStore()

  const notEmpryProductWithCounterList = useMemo(
    () => productWithCounterList.filter(productWithCounter => productWithCounter.counter > 0),
    [productWithCounterList]
  )

  const [orderId, setOrderId] = useState<number | undefined>();

  const setInvoiceStatus = useCallback((invoiceStatus: string, onLoad: () => void) => {
    if (!orderId) return;

    graphQLClient.request(
      setInvoiceStatusMutation,
      {
        invoiceStatus,
        orderId
      }
    )
      .then(onLoad)
      .catch(e => {
        console.error(e);
        showPopup({ message: 'Server error' });
      })
  }, [orderId])

  useEffect(() => {
    const invoiceClosedHandler = (data: { status: 'paid' | 'cancelled' | 'failed' | 'pending' }) => {
      if (data.status === 'paid') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        showPopup({ message: 'invoice was paid successfully' })
      } else if (data.status === 'cancelled') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        showPopup({ message: 'user closed this invoice without paying' })
      } else if (data.status === 'failed') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        showPopup({ message: 'user tried to pay, but the payment was failed' })
      } else if (data.status === 'pending') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        showPopup({ message: 'the payment is still processing. The bot will receive a service message about a successful payment when the payment is successfully paid' })
      }
    };

    tgOn('invoiceClosed', invoiceClosedHandler);
    return () => { tgOff('invoiceClosed', invoiceClosedHandler) }
  }, [refetchProductWithCounterList, setInvoiceStatus])

  const onPayHandler = useCallback(() => {
    graphQLClient.request(
      createInvoiceUrlMutation,
      {
        orderItemList: notEmpryProductWithCounterList
          .map(productWithCounter => ({
            counter: productWithCounter.counter,
            productId: productWithCounter.data.id
          }))
      }
    )
      .then(data => {
        openInvoice(data.createInvoiceLink.invoiceUrl)
        setOrderId(data.createInvoiceLink.orderId)
      })
      .catch(e => {
        console.error(e);
        showPopup({ message: 'Server error' });
      });
  }, [notEmpryProductWithCounterList])

  const sumOfProductPrices = useMemo(
    () => notEmpryProductWithCounterList.reduce((sum, { data, counter }) => sum + data.price * counter, 0),
    [notEmpryProductWithCounterList]
  )

  useEffect(() => {
    MainButton.setText(`Pay: ${sumOfProductPrices} rub`);
  }, [sumOfProductPrices])

  useEffect(() => {
    MainButton.onClick(onPayHandler)
    return () => { MainButton.offClick(onPayHandler) }
  }, [onPayHandler])

  return (
    <div>
      <div>
        {notEmpryProductWithCounterList
          .map((productWithCounter) => (
            <OrderItem key={productWithCounter.data.id} productWithCounter={productWithCounter} />
          ))
        }
      </div>
      <NoTelegram>
        <button onClick={onPayHandler}>Pay</button>
      </NoTelegram>
    </div>
  );
}