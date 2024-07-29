import { useCallback, useEffect, useState } from "react";
import { useProductStore } from "../../../../entities/product";
import { ProductLine } from "../../../../entities/product";
import { getTelegramObject } from "../../../../entities/telegram";
import { useNavigate } from "react-router-dom";
import { createInvoiceUrl } from "../../api/createInvoiceUrlMutation";
import { setInvoiceStatus } from "../../api/setInvoiceStatusMutation";
import { useMainButton, useBackButton } from "../../../../entities/telegram";

export const OrderItemList = () => {
  const navigate = useNavigate();

  const toProductPage = useCallback(() => {
    navigate('/')
  }, [navigate])

  const { notEmptyProductWithCounterList, priceOfProductList, refetchProductWithCounterList } = useProductStore()

  const [orderId, setOrderId] = useState<number | undefined>();

  const onPayHandler = useCallback(() => {
    createInvoiceUrl(notEmptyProductWithCounterList)
      .then(data => {
        if (!data) return;
        getTelegramObject().WebApp.openInvoice(data.createInvoiceLink.invoiceUrl)
        setOrderId(data.createInvoiceLink.orderId)
      })

  }, [notEmptyProductWithCounterList])

  const text = `Оплатить: ${priceOfProductList} рублей`;

  useMainButton({
    show: true,
    text,
    onClick: onPayHandler,
  })
  useBackButton({
    show: true,
    onClick: toProductPage
  })


  const setInvoiceStatusHandler = useCallback((invoiceStatus: string, onLoad: () => void) => {
    if (!orderId) return;
    setInvoiceStatus({
      invoiceStatus,
      orderId
    })
      .then(onLoad)
  }, [orderId])

  useEffect(() => {
    const invoiceClosedHandler = (data: { status: 'paid' | 'cancelled' | 'failed' | 'pending' }) => {
      if (data.status === 'paid') {
        setInvoiceStatusHandler(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'invoice was paid successfully' })
      } else if (data.status === 'cancelled') {
        setInvoiceStatusHandler(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'user closed this invoice without paying' })
      } else if (data.status === 'failed') {
        setInvoiceStatusHandler(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'Произошла ошибка при оплате заказа' })
      } else if (data.status === 'pending') {
        setInvoiceStatusHandler(data.status, refetchProductWithCounterList)
        getTelegramObject().WebApp.showPopup({ message: 'the payment is still processing. The bot will receive a service message about a successful payment when the payment is successfully paid' })
      }
    };

    getTelegramObject().WebApp.onEvent('invoiceClosed', invoiceClosedHandler);
    return () => { getTelegramObject().WebApp.offEvent('invoiceClosed', invoiceClosedHandler) }
  }, [refetchProductWithCounterList, setInvoiceStatusHandler])

  return (
    <div>
      <div>
        {notEmptyProductWithCounterList
          .map((productWithCounter) => (
            <ProductLine key={productWithCounter.data.id} productWithCounter={productWithCounter} />
          ))
        }
      </div>
    </div>
  );
}