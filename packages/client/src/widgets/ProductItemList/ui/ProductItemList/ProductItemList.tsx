import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "features/ProductCard";
import { useProductStore } from "entities/product";
import { routingPaths } from "shared/config/routingPaths";
import "./ProductItemList.css";
import { MainButtonProvider } from "shared/ui/MainButtonProvider/MainButtonProvider";

export const ProductItemList = () => {
  const navigate = useNavigate();

  const { productCounterList, setProductCounterList } = useProductStore();

  const onClick = useCallback(
    () => navigate(routingPaths.OrderListPage),
    [navigate]
  );

  return (
    <MainButtonProvider
      show={productCounterList.some(({ counter }) => counter > 0)}
      text="Перейти к заказу"
      onClick={onClick}
    >
      <div className="itemList">
        {productCounterList.map((productCounter) => (
          <ProductCard
            key={productCounter.data.id}
            productCounter={productCounter}
            setProductCounterList={setProductCounterList}
          />
        ))}
      </div>
    </MainButtonProvider>
  );
};
