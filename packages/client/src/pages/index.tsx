import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routingPaths } from "shared/config/routingPaths";
import { getTelegramObject } from "shared/lib/getTelegramObject";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { OrderListPage } from "./OrderListPage/OrderListPage";
import { ProductListPage } from "./ProductListPage/ProductListPage";
import { ProductItemPage } from "./ProductItemPage/ProductItemPage";
import { OrderContactInfoFormPage } from "./OrderContactInfoFormPage/OrderContactInfoFormPage";

export const Routing = () => {
  useEffect(() => {
    const telegramObject = getTelegramObject();
    telegramObject.WebApp.ready();
    telegramObject.WebApp.expand();
  }, []);

  return (
    <Routes>
      <Route
        path={`${routingPaths.ProductListPage}/:categoryId?`}
        element={<ProductListPage />}
      />
      <Route
        path={`${routingPaths.ProductItemPage}/:productId`}
        element={<ProductItemPage />}
      />
      <Route path={routingPaths.OrderListPage} element={<OrderListPage />} />
      <Route path={routingPaths.ErrorPage} element={<ErrorPage />} />
      <Route
        path={routingPaths.OrderContactInfoFormPage}
        element={<OrderContactInfoFormPage />}
      />
    </Routes>
  );
};
