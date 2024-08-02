import { pipe } from "fp-ts/lib/function";
import { memo, useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { ProductCardModal } from "./components/ProductCardModal";
import { ProductCounter } from "entities/product";
import {
  decreamentProductCounter,
  increamentProductCounter,
} from "entities/product";
import { getTelegramObject } from "shared/lib/getTelegramObject";
import "./ProductCard.css";

interface ProductCardProps {
  productCounter: ProductCounter;
  setProductCounterList: React.Dispatch<React.SetStateAction<ProductCounter[]>>;
}
export const ProductCard = memo(
  ({ productCounter, setProductCounterList }: ProductCardProps) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModalHandler = useCallback(() => setIsOpen(true), []);
    const closeModalHandler = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
      if (productCounter.counter === productCounter.data.numberOfproduct) {
        getTelegramObject().WebApp.showPopup({
          message: `You choose maximum amount of ${productCounter.data.name} products`,
        });
      }
    }, [productCounter]);
    console.log("ProductCard render");

    return (
      <>
        <div className="shopItem">
          <div className="shopItem__info" onClick={openModalHandler}>
            <div className="shopItem__imageContainer">
              <img
                className="pure-img shopItem__image"
                src={productCounter.data.image}
              />
              {productCounter.counter > 0 && (
                <div className="shopItem__counter">
                  {productCounter.counter}
                </div>
              )}
            </div>
            <h2 className="shopItem__title">{productCounter.data.name}</h2>
            <p>
              {productCounter.data.price} {productCounter.data.currency}
            </p>
          </div>

          <div className="shopItem__actionBtns">
            <button
              className="pure-button pure-button-primary shopItem__btn"
              disabled={productCounter.counter <= 0}
              onClick={() =>
                pipe(
                  decreamentProductCounter(productCounter),
                  setProductCounterList
                )
              }
            >
              -
            </button>
            <button
              className="pure-button pure-button-primary shopItem__btn ml"
              disabled={
                productCounter.counter >= productCounter.data.numberOfproduct
              }
              onClick={() =>
                pipe(
                  increamentProductCounter(productCounter),
                  setProductCounterList
                )
              }
            >
              +
            </button>
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
    );
  }
);
