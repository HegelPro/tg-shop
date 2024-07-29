import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ProductWithCounter } from '../../../../entities/product';
import { ProductCardModal } from './components/ProductCardModal';
import './ProductCard.css'
import { getTelegramObject } from '../../../../entities/telegram';

interface ProductCardProps {
    productWithCounter: ProductWithCounter
    increament: () => void;
    decreament: () => void;
}
export const ProductCard = ({
    productWithCounter,
    increament,
    decreament
}: ProductCardProps) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModalHandler = useCallback(() => setIsOpen(true), [])
    const closeModalHandler = useCallback(() => setIsOpen(false), [])

    useEffect(() => {
        if (productWithCounter.counter === productWithCounter.data.numberOfproduct) {
            getTelegramObject().WebApp.showPopup({ message: `You choose maximum amount of ${productWithCounter.data.name} products` })
        }
    }, [productWithCounter])

    return (
        <>
            <div className='shopItem'>
                <div className='shopItem__info' onClick={openModalHandler}>
                    <div className='shopItem__imageContainer'>
                        <img className='pure-img shopItem__image' src={productWithCounter.data.image} />
                        {productWithCounter.counter > 0 && <div className='shopItem__counter'>{productWithCounter.counter}</div>}
                    </div>
                    <h2 className='shopItem__title'>{productWithCounter.data.name}</h2>
                    <p>{productWithCounter.data.price} {productWithCounter.data.currency}</p>
                </div>

                <div className='shopItem__actionBtns'>
                    <button
                        className='pure-button pure-button-primary shopItem__btn'
                        disabled={productWithCounter.counter <= 0}
                        onClick={decreament}
                    >-</button>
                    <button
                        className='pure-button pure-button-primary shopItem__btn ml'
                        disabled={productWithCounter.counter >= productWithCounter.data.numberOfproduct}
                        onClick={increament}
                    >+</button>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModalHandler}
                contentLabel="Example Modal"
            >
                <ProductCardModal
                    onClose={closeModalHandler}
                    productWithCounter={productWithCounter}
                />
            </Modal>
        </>

    )
}