import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ProductCounter } from '../../../../entities/product';
import { ProductCardModal } from './components/ProductCardModal';
import './ProductCard.css'
import { pipe } from 'fp-ts/lib/function';
import { decreamentProductCounter, increamentProductCounter } from '../../../../entities/product/model/Product';
import { getTelegramObject } from '../../../../shared/lib/getTelegramObject';

interface ProductCardProps {
    productCounter: ProductCounter
    setProductCounterList: React.Dispatch<React.SetStateAction<ProductCounter[]>>
}
export const ProductCard = ({
    productCounter,
    setProductCounterList,
}: ProductCardProps) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModalHandler = useCallback(() => setIsOpen(true), [])
    const closeModalHandler = useCallback(() => setIsOpen(false), [])

    useEffect(() => {
        if (productCounter.counter === productCounter.data.numberOfproduct) {
            getTelegramObject().WebApp.showPopup({ message: `You choose maximum amount of ${productCounter.data.name} products` })
        }
    }, [productCounter])

    return (
        <>
            <div className='shopItem'>
                <div className='shopItem__info' onClick={openModalHandler}>
                    <div className='shopItem__imageContainer'>
                        <img className='pure-img shopItem__image' src={productCounter.data.image} />
                        {productCounter.counter > 0 && <div className='shopItem__counter'>{productCounter.counter}</div>}
                    </div>
                    <h2 className='shopItem__title'>{productCounter.data.name}</h2>
                    <p>{productCounter.data.price} {productCounter.data.currency}</p>
                </div>

                <div className='shopItem__actionBtns'>
                    <button
                        className='pure-button pure-button-primary shopItem__btn'
                        disabled={productCounter.counter <= 0}
                        onClick={() => pipe(
                            decreamentProductCounter(productCounter),
                            setProductCounterList
                        )}
                    >-</button>
                    <button
                        className='pure-button pure-button-primary shopItem__btn ml'
                        disabled={productCounter.counter >= productCounter.data.numberOfproduct}
                        onClick={() => pipe(
                            increamentProductCounter(productCounter),
                            setProductCounterList
                        )}
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
                    productCounter={productCounter}
                />
            </Modal>
        </>

    )
}