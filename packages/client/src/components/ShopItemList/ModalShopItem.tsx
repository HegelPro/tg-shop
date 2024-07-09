import { useEffect } from 'react'
import { ProductWithCounter } from '../../store/productStore'
import { getTelegramObject } from '../../util/getTelegramObject'
import './ModalShopItem.css'

interface ModalShopItemProps {
    productWithCounter: ProductWithCounter
    onClose: () => void
}
export const ModalShopItem = ({
    productWithCounter,
    onClose
}: ModalShopItemProps) => {
    useEffect(() => {
        getTelegramObject().WebApp.BackButton.show()
        return () => {
            getTelegramObject().WebApp.BackButton.hide()
        }
    }, [])

    useEffect(() => {
        getTelegramObject().WebApp.BackButton.onClick(onClose)
        return () => {
            getTelegramObject().WebApp.BackButton.offClick(onClose)
        }
    }, [onClose])

    return (
        <div className='modalShopItem'>
            <div className='modalShopItem__imageContainer'>
                <img className='pure-img modalShopItem__image' src={productWithCounter.data.image} />
            </div>
            <h2 className='modalShopItem__title'>{productWithCounter.data.name}</h2>
            <p className='modalShopItem__description'>{productWithCounter.data.descrition}</p>
            <p className='modalShopItem__price'>{productWithCounter.data.price} {productWithCounter.data.currency}</p>

            {/* <div className='shopItem__actionBtns'>
                <button
                    className='pure-button pure-button-primary'
                    disabled={productWithCounter.counter <= 0}
                    onClick={decreament}
                >-</button>
                <span className='shopItem__space' />
                <span>{productWithCounter.counter}</span>
                <span className='shopItem__space' />
                <button
                    className='pure-button pure-button-primary'
                    disabled={productWithCounter.counter >= 10}
                    onClick={increament}
                >+</button>
            </div> */}
        </div>

    )
}