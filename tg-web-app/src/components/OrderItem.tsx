import './OrderItem.css'

interface OrderItemProps {
  image: string
  name: string
  description?: string | null
  counter: number
  price: number
}
export const OrderItem = ({
  image,
  name, description,
  counter, price
}: OrderItemProps) => {
    return (
        <div>
          <image href={image}/>
          <div>
            <p>{name}</p>
            <p>{description}</p>
          </div>
          <div>
            <p>{counter} x {price} rub</p>
          </div>
        </div>
    );
}