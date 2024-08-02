import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { routingPaths } from "shared/config/routingPaths";
import { getTelegramObject } from "shared/lib/getTelegramObject";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { OrderListPage } from "./OrderListPage/OrderListPage";
import { ProductListPage } from "./ProductListPage/ProductListPage";

export const Routing = () => {
  useEffect(() => {
    getTelegramObject().WebApp.ready();
  }, []);

  return (
    <Routes>
      <Route
        path={routingPaths.ProductListPage}
        element={<ProductListPage />}
      />
      <Route path={routingPaths.OrderListPage} element={<OrderListPage />} />
      <Route path={routingPaths.ErrorPage} element={<ErrorPage />} />
    </Routes>
  );
};
