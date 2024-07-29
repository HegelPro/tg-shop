import { ProductWithCounter } from '../../model/Product';
import './ProductLine.css'

interface ProductLineProps {
  productWithCounter: ProductWithCounter
}
export const ProductLine = ({productWithCounter}: ProductLineProps) => (
  <div className='orderItem'>
    <img className='orderItem__image' src={productWithCounter.data.image}/>
    <p className='ml'>{productWithCounter.data.name}</p>
    <div className='ml'>
      <p>{productWithCounter.counter} x {productWithCounter.data.price} {productWithCounter.data.currency}</p>
    </div>
  </div>
);