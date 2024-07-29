import { ProductWithCounter } from '../../../../../entities/product'
import { useBackButton } from '../../../../../entities/telegram'
import './ProductCardModal.css'

interface ProductCardModalProps {
    productWithCounter: ProductWithCounter
    onClose: () => void
}
export const ProductCardModal = ({
    productWithCounter,
    onClose
}: ProductCardModalProps) => {
    useBackButton({
        show: true,
        onClick: onClose,
    });

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