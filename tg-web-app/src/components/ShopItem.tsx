import './ShopItem.css'

interface ShopItemProps {
    image?: string;
    name: string;
    description?: string | null;
    counter: number;
    price: number;
    increament: () => void;
    decreament: () => void;
}
export const ShopItem = ({
    image,
    name,
    description,
    price,
    counter,
    increament,
    decreament
}: ShopItemProps) => {
    return (
        <div className='shopItem'>
            <img className='shopItem__image' src={image}/>
            <h2 className='shopItem__title'>{name}</h2>
            <p className='shopItem__description'>{description}</p>
            <p>{price} rub</p>
            <div className='shopItem__actionBtns'>
                <button
                    className='pure-button pure-button-primary'
                    disabled={counter <= 0}
                    onClick={decreament}
                >-</button>
                <span className='shopItem__space' />
                <span>{counter}</span>
                <span className='shopItem__space' />
                <button
                    className='pure-button pure-button-primary'
                    disabled={counter >= 10}
                    onClick={increament}
                >+</button>
            </div>
        </div>
    )
}