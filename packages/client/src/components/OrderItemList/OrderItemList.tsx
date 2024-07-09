import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductWithCounter, useProductStore } from "../../store/productStore";
import { graphQLClient } from "../../util/graphQLClient";
import { OrderItem } from "./OrderItem";
import { getTelegramObject } from "../../util/getTelegramObject";
import { graphql } from "../../gql";

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

const useBackButton = ({back}: {back: () => void}) => {
  useEffect(() => {
    getTelegramObject().WebApp.BackButton.show()
    return () => {
        getTelegramObject().WebApp.BackButton.hide()
    }
  }, [])

  useEffect(() => {
    getTelegramObject().WebApp.BackButton.onClick(back)
    return () => {
        getTelegramObject().WebApp.BackButton.offClick(back)
    }
  }, [back])
}

const useMainButton = ({
  notEmpryProductWithCounterList,
  onPayHandler
}: {
  notEmpryProductWithCounterList: ProductWithCounter[],
  onPayHandler: () => void
}) => {
  const sumOfProductPrices = useMemo(
    () => notEmpryProductWithCounterList.reduce((sum, { data, counter }) => sum + data.price * counter, 0),
    [notEmpryProductWithCounterList]
  )

  useEffect(() => {
    getTelegramObject().WebApp.MainButton.setText(`Оплатить: ${sumOfProductPrices} рублей`);
  }, [sumOfProductPrices])

  useEffect(() => {
    getTelegramObject().WebApp.MainButton.onClick(onPayHandler)
    return () => { getTelegramObject().WebApp.MainButton.offClick(onPayHandler) }
  }, [onPayHandler])
}

interface OrderItemListProps {
  back: () => void
}
export const OrderItemList = ({
  back
}: OrderItemListProps) => {
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
        getTelegramObject().WebApp.showPopup({ message: 'Server error' });
      })
  }, [orderId])

  useEffect(() => {
    const invoiceClosedHandler = (data: { status: 'paid' | 'cancelled' | 'failed' | 'pending' }) => {
      if (data.status === 'paid') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'invoice was paid successfully' })
      } else if (data.status === 'cancelled') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'user closed this invoice without paying' })
      } else if (data.status === 'failed') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'Произошла ошибка при оплате заказа' })
      } else if (data.status === 'pending') {
        setInvoiceStatus(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'the payment is still processing. The bot will receive a service message about a successful payment when the payment is successfully paid' })
      }
    };

    getTelegramObject().WebApp.onEvent('invoiceClosed', invoiceClosedHandler);
    return () => { getTelegramObject().WebApp.offEvent('invoiceClosed', invoiceClosedHandler) }
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
        getTelegramObject().WebApp.openInvoice(data.createInvoiceLink.invoiceUrl)
        setOrderId(data.createInvoiceLink.orderId)
      })
      .catch(e => {
        console.error(e);
        getTelegramObject().WebApp.showPopup({ message: 'Server error' });
      });
  }, [notEmpryProductWithCounterList])

  useBackButton({back})
  useMainButton({
    notEmpryProductWithCounterList,
    onPayHandler,
  })

  return (
    <div>
      <div>
        {notEmpryProductWithCounterList
          .map((productWithCounter) => (
            <OrderItem key={productWithCounter.data.id} productWithCounter={productWithCounter} />
          ))
        }
      </div>
    </div>
  );
}