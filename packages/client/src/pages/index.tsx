import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ProductListPage } from './ProductListPage/ProductListPage';
import { OrderListPage } from './OrderListPage/OrderListPage';
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { routingPaths } from "../shared/config/routingPaths";
import { getTelegramObject } from "../shared/lib/getTelegramObject";

export const Routing = () => {
  useEffect(() => {
    getTelegramObject().WebApp.ready();
  }, []);

  return (
    <Routes>
      <Route path={routingPaths.ProductListPage} element={<ProductListPage />} />
      <Route path={routingPaths.OrderListPage} element={<OrderListPage />} />
      <Route path={routingPaths.ErrorPage} element={<ErrorPage />} />
    </Routes>
  )
}
