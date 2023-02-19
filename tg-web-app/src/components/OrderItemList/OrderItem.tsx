import type { ProductQueryType } from '../../App';
import { WithCounter } from '../../util/types';
import './OrderItem.css'

interface OrderItemProps {
  productWithCounter: WithCounter<ProductQueryType>
}
export const OrderItem = ({productWithCounter}: OrderItemProps) => {
    return (
        <div className='orderItem'>
          <img className='orderItem__image' src={productWithCounter.data.image}/>
          <p className='ml'>{productWithCounter.data.name}</p>
          <div className='ml'>
            <p>{productWithCounter.counter} x {productWithCounter.data.price} {productWithCounter.data.currency}</p>
          </div>
        </div>
    );
}