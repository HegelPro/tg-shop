import { useCallback, useState } from 'react';
import Modal from 'react-modal';
import type { ProductQueryType } from '../../App';
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

    return (
        <>
            <div className='shopItem'>
                <div className='shopItem__info' onClick={openModalHandler}>
                    <div className='shopItem__imageContainer'>
                        <img className='pure-img shopItem__image' src={productWithCounter.data.image} />
                    </div>
                    <h2 className='shopItem__title'>{productWithCounter.data.name}</h2>
                    <p>{productWithCounter.data.price} rub</p>
                </div>

                <div className='shopItem__actionBtns'>
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
                        disabled={productWithCounter.counter >= 100}
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