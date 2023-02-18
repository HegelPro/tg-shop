import type { ProductQueryType } from '../../App';
import { WithCounter } from '../../util/types';
import './OrderItem.css'

interface OrderItemProps {
  productWithCounter: WithCounter<ProductQueryType>
}
export const OrderItem = ({productWithCounter}: OrderItemProps) => {
    return (
        <div className='orderItem'>
          <image href={productWithCounter.data.image}/>
          <p>{productWithCounter.data.name}</p>
          <div>
            <p>{productWithCounter.counter} x {productWithCounter.data.price} {productWithCounter.data.currency}</p>
          </div>
        </div>
    );
}