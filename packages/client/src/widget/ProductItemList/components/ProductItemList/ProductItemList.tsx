import { ProductCard } from "../../../../features/ProductCard"
import './ProductItemList.css'
import { useCallback } from "react";
import { useProductStore } from "../../../../entities/product/ProductStoreContext";
import { useNavigate } from "react-router-dom";
import { routingPaths } from "../../../../shared/config/routingPaths";
import { useMainButton } from "../../../../shared/hooks/useMainButton";

export const ProductItemList = () => {
  const navigate = useNavigate();

  const {
    productCounterList,
    setProductCounterList,
  } = useProductStore();

  const onClick = useCallback(() => navigate(routingPaths.OrderListPage), [navigate]);

  useMainButton({
    show: productCounterList.some(({ counter }) => counter > 0),
    text: 'Перейти к заказу',
    onClick
  })

  return (
    <div className="itemList">
      {productCounterList.map((productCounter) => <ProductCard
        key={productCounter.data.id}
        productCounter={productCounter}
        setProductCounterList={setProductCounterList}
      />)}
    </div>
  )
}