import { useState } from 'react';
import Modal from 'react-modal';
import type { ProductQueryType } from '../../App';
import { WithCounter } from '../../util/types';
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

    return (
        <>
            <div className='shopItem'>
                <div onClick={() => setIsOpen(true)}>
                    <img className='shopItem__image' src={productWithCounter.data.image} />
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
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Example Modal"
            >
                <img className='shopItem__image' src={productWithCounter.data.image} />
                <h2 className='shopItem__title'>{productWithCounter.data.name}</h2>
                <p className='shopItem__description'>{productWithCounter.data.descrition}</p>
                <p>{productWithCounter.data.price} rub</p>

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
                        disabled={productWithCounter.counter >= 10}
                        onClick={increament}
                    >+</button>
                </div>
            </Modal>
        </>

    )
}