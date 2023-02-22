import { ShopItem } from "./ShopItem"
import './ShopItemList.css'
import { useEffect } from "react";
import { MainButton } from "../../util/tg";
import { useProductStore } from "../../store/productStore";

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
        MainButton.show()
      } else {
        MainButton.hide()
      }
    }, [productWithCounterList])

    useEffect(() => {
      MainButton.setText('View order')
      MainButton.onClick(next)
      return () => {MainButton.offClick(next)}
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