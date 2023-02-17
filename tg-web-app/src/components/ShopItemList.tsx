import { ShopItem } from "./ShopItem"
import { ProductListQuery } from "../gql/graphql";
import './ShopItemList.css'
import type { CounterData } from "../App";
import { useEffect } from "react";

interface ShopItemListProps {
  items: CounterData<ProductListQuery['productList'][0]>[]
  next: () => void
  increament: (id: number) => void
  decreament: (id: number) => void
}
export const ShopItemList = ({items, increament, decreament, next}: ShopItemListProps) => {
    useEffect(() => {
      (window as any).Telegram.WebApp.MainButton.setText('View order')
    }, [])

    useEffect(() => {
      if(items.some((item) => item.counter > 0)) {
        (window as any).Telegram.WebApp.MainButton.show()
      } else {
        (window as any).Telegram.WebApp.MainButton.hide()
      }
    }, [items])

    useEffect(() => {
      (window as any).Telegram.WebApp.MainButton.onClick(next)
      return () => {(window as any).Telegram.WebApp.MainButton.offClick(next)}
    }, [next])

    return (
        <div className="itemList">
          {items.map(({data, counter}) => <ShopItem
            key={data.id}
            image={data.image}
            name={data.name}
            description={data.descrition}
            price={data.price}
            counter={counter}
            increament={() => increament(data.id)}
            decreament={() => decreament(data.id)}
          />)}
        </div>
    )
}