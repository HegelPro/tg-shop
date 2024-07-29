import { useEffect } from "react";
import { getTelegramObject } from '../entities/telegram';
import { Routes, Route } from "react-router-dom";
import { ProductListPage } from './ProductListPage/ProductListPage';
import { OrderListPage } from './OrderListPage/OrderListPage';

export const Routing = () => {
  useEffect(() => {
    getTelegramObject().WebApp.ready();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/order" element={<OrderListPage />} />
    </Routes>
  )
}
