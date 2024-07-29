import { ProductCard } from "../../../../features/ProductCard"
import './ProductItemList.css'
import { useCallback } from "react";
import { useProductStore } from "../../../../entities/product/ProductStoreContext";
import { useNavigate } from "react-router-dom";
import { useMainButton } from "../../../../entities/telegram";

export const ProductItemList = () => {
  const navigate = useNavigate();

  const {
    productWithCounterList,
    decreamentCounterByProductId,
    increamentCounterByProductId
  } = useProductStore();

  const onClick = useCallback(() => navigate('/order'), [navigate]);

  useMainButton({
    show: productWithCounterList.some(({ counter }) => counter > 0),
    text: 'Перейти к заказу',
    onClick
  })

  return (
    <div className="itemList">
      {productWithCounterList.map((productWithCounter) => <ProductCard
        key={productWithCounter.data.id}
        productWithCounter={productWithCounter}
        increament={() => increamentCounterByProductId(productWithCounter.data.id)}
        decreament={() => decreamentCounterByProductId(productWithCounter.data.id)}
      />)}
    </div>
  )
}