import { ShopItem } from "./ShopItem"
import './ShopItemList.css'
import { useEffect } from "react";
import { WithCounter } from "../../util/types";
import type { ProductQueryType } from "../../App";
import { useTelegram } from "../../hooks/useTelegram";

interface ShopItemListProps {
  productWithCounterList: WithCounter<ProductQueryType>[]
  next: () => void
  increament: (id: number) => void
  decreament: (id: number) => void
}
export const ShopItemList = ({productWithCounterList, increament, decreament, next}: ShopItemListProps) => {
  const {MainButton} = useTelegram()

    useEffect(() => {
      MainButton.setText('View order')
    }, [MainButton])

    useEffect(() => {
      if(productWithCounterList.some(({counter}) => counter > 0)) {
        MainButton.show()
      } else {
        MainButton.hide()
      }
    }, [MainButton, productWithCounterList])

    useEffect(() => {
      MainButton.onClick(next)
      return () => {MainButton.offClick(next)}
    }, [MainButton, next])

    return (
      <div className="itemList">
        {productWithCounterList.map((productWithCounter) => <ShopItem
          key={productWithCounter.data.id}
          productWithCounter={productWithCounter}
          increament={() => increament(productWithCounter.data.id)}
          decreament={() => decreament(productWithCounter.data.id)}
        />)}
      </div>
    )
}