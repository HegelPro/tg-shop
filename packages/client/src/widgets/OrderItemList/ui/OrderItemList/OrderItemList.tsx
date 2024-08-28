import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInvoiceUrl } from "../../api/createInvoiceUrl";
import { useProductStore } from "entities/product";
import { ProductLine } from "entities/product";
import { routingPaths } from "shared/config/routingPaths";
import { BackButtonProvider } from "shared/ui/BackButtonProvider/BackButtonProvider";
import { MainButtonProvider } from "shared/ui/MainButtonProvider/MainButtonProvider";
import { getTelegramObject } from "shared/lib/getTelegramObject";

export const OrderItemList = () => {
  const navigate = useNavigate();

  const toProductPage = useCallback(() => {
    navigate(routingPaths.ProductListPage);
  }, [navigate]);

  const {
    notEmptyProductCounterList,
    priceOfProductList,
  } = useProductStore();

  const [, setOrderId] = useState<number | undefined>();

  const onPayHandler = useCallback(() => {
    createInvoiceUrl(notEmptyProductCounterList).then((data) => {
      if (!data) return;
      getTelegramObject().WebApp.openInvoice(data.createInvoiceLink.invoiceUrl);
      setOrderId(data.createInvoiceLink.orderId);
    });
  }, [notEmptyProductCounterList]);

  const text = `Оплатить: ${priceOfProductList} рублей`;

  useEffect(() => {
    const invoiceClosedHandler = (data: {
      status: "paid" | "cancelled" | "failed" | "pending";
    }) => {
      if (data.status === "paid") {
        getTelegramObject().WebApp.showPopup({
          message: "invoice was paid successfully",
        });
      } else if (data.status === "cancelled") {
        navigate(routingPaths.ErrorPage);
        // getTelegramObject().WebApp.showPopup({ message: 'user closed this invoice without paying' })
      } else if (data.status === "failed") {
        navigate(routingPaths.ErrorPage);
        // getTelegramObject().WebApp.showPopup({ message: 'Произошла ошибка при оплате заказа' })
      } else if (data.status === "pending") {
        navigate(routingPaths.ErrorPage);
        // getTelegramObject().WebApp.showPopup({ message: 'the payment is still processing. The bot will receive a service message about a successful payment when the payment is successfully paid' })
      }
    };

    getTelegramObject().WebApp.onEvent("invoiceClosed", invoiceClosedHandler);
    return () => {
      getTelegramObject().WebApp.offEvent(
        "invoiceClosed",
        invoiceClosedHandler
      );
    };
  }, [navigate]);

  return (
    <MainButtonProvider show text={text} onClick={onPayHandler}>
      <BackButtonProvider show onClick={toProductPage}>
        <div>
          {notEmptyProductCounterList.map((productCounter) => (
            <ProductLine
              key={productCounter.data.id}
              productCounter={productCounter}
            />
          ))}
        </div>
      </BackButtonProvider>
    </MainButtonProvider>
  );
};
