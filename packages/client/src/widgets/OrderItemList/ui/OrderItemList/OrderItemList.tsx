import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createInvoiceUrl } from "../../api/createInvoiceUrl";
import { getPriceOfProductList, useProductStore } from "entities/product";
import { routingPaths } from "shared/config/routingPaths";
import { BackButtonProvider } from "shared/ui/BackButtonProvider/BackButtonProvider";
import { MainButtonProvider } from "shared/ui/MainButtonProvider/MainButtonProvider";
import { Divider } from "@mui/material";
import { ProductList } from "features/ProductList";
import { ProductCounterListPrice } from "entities/product/ui/ProductCounterListPrice/ProductCounterListPrice";
import { formatPrice } from "shared/format/formatPrice";
import { getTelegramObject } from "shared/lib/getTelegramObject";

const getMainButtonText = (priceOfProductList: number) =>
  `Оплатить: ${formatPrice(priceOfProductList)}`;

export const OrderItemList = () => {
  const navigate = useNavigate();

  const toOrderContactInfoFormPage = useCallback(() => {
    navigate(routingPaths.OrderContactInfoFormPage);
  }, [navigate]);

  const { productCounterList } = useProductStore();

  const priceOfProductList = useMemo(
    () => getPriceOfProductList(productCounterList),
    [productCounterList]
  );

  const onPayHandler = useCallback(() => {
    const telegramUserId = getTelegramObject().WebApp.initDataUnsafe.user?.id;
    console.log(telegramUserId);
    if (telegramUserId) {
      getTelegramObject().WebApp.showPopup({
        message: "id: " + telegramUserId,
      });

      return createInvoiceUrl(telegramUserId, productCounterList).then(
        (data) => {
          if (!data) return;
          getTelegramObject().WebApp.openInvoice(
            data.createInvoiceLink.invoiceUrl
          );
        }
      );
    }
    getTelegramObject().WebApp.showPopup({
      message: "penis",
    });
    getTelegramObject().WebApp.showPopup({
      message: JSON.stringify(getTelegramObject().WebApp.initDataUnsafe.user),
    });
    return Promise.reject();
  }, [productCounterList]);
  // useEffect(() => {
  //   const invoiceClosedHandler = (data: {
  //     status: "paid" | "cancelled" | "failed" | "pending";
  //   }) => {
  //     if (data.status === "paid") {
  //       getTelegramObject().WebApp.showPopup({
  //         message: "invoice was paid successfully",
  //       });
  //     } else if (data.status === "cancelled") {
  //       navigate(routingPaths.ErrorPage);
  //       // getTelegramObject().WebApp.showPopup({ message: 'user closed this invoice without paying' })
  //     } else if (data.status === "failed") {
  //       navigate(routingPaths.ErrorPage);
  //       // getTelegramObject().WebApp.showPopup({ message: 'Произошла ошибка при оплате заказа' })
  //     } else if (data.status === "pending") {
  //       navigate(routingPaths.ErrorPage);
  //       // getTelegramObject().WebApp.showPopup({ message: 'the payment is still processing. The bot will receive a service message about a successful payment when the payment is successfully paid' })
  //     }
  //   };

  //   getTelegramObject().WebApp.onEvent("invoiceClosed", invoiceClosedHandler);
  //   return () => {
  //     getTelegramObject().WebApp.offEvent(
  //       "invoiceClosed",
  //       invoiceClosedHandler
  //     );
  //   };
  // }, [navigate]);

  const toTelegramBot = useCallback(() => {
    // TODO to telegram bot action
    onPayHandler()
      .then(() => {
        const telegramObject = getTelegramObject();
        telegramObject.WebApp.close();
      })
      .catch(() => {
        //TODO
      });
  }, [onPayHandler]);

  return (
    <MainButtonProvider
      show
      text={getMainButtonText(priceOfProductList)}
      onClick={toTelegramBot}
    >
      <BackButtonProvider show onClick={toOrderContactInfoFormPage}>
        <ProductList productCounterList={productCounterList} />
        <Divider />
        <ProductCounterListPrice productCounterList={productCounterList} />
      </BackButtonProvider>
    </MainButtonProvider>
  );
};
