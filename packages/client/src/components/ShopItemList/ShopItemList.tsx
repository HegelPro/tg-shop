import { ShopItem } from "./ShopItem"
import './ShopItemList.css'
import { useEffect } from "react";
import { useProductStore } from "../../store/productStore";
import { getTelegramObject } from "../../util/getTelegramObject";

interface ShopItemListProps {
  next: () => void
}
export const ShopItemList = ({next}: ShopItemListProps) => {
  const {
    productWithCounterList,
    decreamentCounterByProductId,
    increamentCounterByProductId
  } = useProductStore()

    useEffect(() => {
      if(productWithCounterList.some(({counter}) => counter > 0)) {
        getTelegramObject().WebApp.MainButton.show()
      } else {
        getTelegramObject().WebApp.MainButton.hide()
      }
    }, [productWithCounterList])

    useEffect(() => {
      getTelegramObject().WebApp.MainButton.setText('Перейти к заказу')
      getTelegramObject().WebApp.MainButton.onClick(next)
      return () => {getTelegramObject().WebApp.MainButton.offClick(next)}
    }, [next])

    return (
      <div className="itemList">
        {productWithCounterList.map((productWithCounter) => <ShopItem
          key={productWithCounter.data.id}
          productWithCounter={productWithCounter}
          increament={() => increamentCounterByProductId(productWithCounter.data.id)}
          decreament={() => decreamentCounterByProductId(productWithCounter.data.id)}
        />)}
      </div>
    )
}