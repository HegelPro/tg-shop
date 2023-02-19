import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import type { ProductQueryType } from '../../App';
import { showPopup } from '../../util/tg';
import { WithCounter } from '../../util/types';
import { ModalShopItem } from './ModalShopItem';
import './ShopItem.css'

interface ShopItemProps {
    productWithCounter: WithCounter<ProductQueryType>
    increament: () => void;
    decreament: () => void;
}
export const ShopItem = ({
    productWithCounter,
    increament,
    decreament
}: ShopItemProps) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModalHandler = useCallback(() => setIsOpen(true), [])
    const closeModalHandler = useCallback(() => setIsOpen(false), [])

    useEffect(() => {
        if (productWithCounter.counter === productWithCounter.data.numberOfproduct) {
            showPopup({message: `You choose maximum amount of ${productWithCounter.data.name} products`})
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
                <ModalShopItem
                    onClose={closeModalHandler}
                    productWithCounter={productWithCounter}
                />
            </Modal>
        </>

    )
}