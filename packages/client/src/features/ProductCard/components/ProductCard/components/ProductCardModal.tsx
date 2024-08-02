import { ProductCounter } from '../../../../../entities/product'
import { useBackButton } from '../../../../../shared/hooks/useBackButton'
import './ProductCardModal.css'

interface ProductCardModalProps {
    productCounter: ProductCounter
    onClose: () => void
}
export const ProductCardModal = ({
    productCounter,
    onClose
}: ProductCardModalProps) => {
    useBackButton({
        show: true,
        onClick: onClose,
    });

    return (
        <div className='modalShopItem'>
            <div className='modalShopItem__imageContainer'>
                <img className='pure-img modalShopItem__image' src={productCounter.data.image} />
            </div>
            <h2 className='modalShopItem__title'>{productCounter.data.name}</h2>
            <p className='modalShopItem__description'>{productCounter.data.descrition}</p>
            <p className='modalShopItem__price'>{productCounter.data.price} {productCounter.data.currency}</p>

            {/* <div className='shopItem__actionBtns'>
                <button
                    className='pure-button pure-button-primary'
                    disabled={productCounter.counter <= 0}
                    onClick={decreament}
                >-</button>
                <span className='shopItem__space' />
                <span>{productCounter.counter}</span>
                <span className='shopItem__space' />
                <button
                    className='pure-button pure-button-primary'
                    disabled={productCounter.counter >= 10}
                    onClick={increament}
                >+</button>
            </div> */}
        </div>

    )
}