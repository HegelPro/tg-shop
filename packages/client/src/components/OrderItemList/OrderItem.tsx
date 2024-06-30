import { ProductWithCounter } from '../../store/productStore';
import './OrderItem.css'

interface OrderItemProps {
  productWithCounter: ProductWithCounter
}
export const OrderItem = ({productWithCounter}: OrderItemProps) => (
  <div className='orderItem'>
    <img className='orderItem__image' src={productWithCounter.data.image}/>
    <p className='ml'>{productWithCounter.data.name}</p>
    <div className='ml'>
      <p>{productWithCounter.counter} x {productWithCounter.data.price} {productWithCounter.data.currency}</p>
    </div>
  </div>
);