import { memo, useCallback } from "react";
import { Product, ProductCounter } from "entities/product";
import { addProduct, removeProduct } from "entities/product";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routingPaths } from "shared/config/routingPaths";
import { Price } from "shared/ui/Price/Price";
import { Counter } from "shared/ui/Counter/Counter";

const emptyImageUrl = "";
const emptyImageAlt = "";

interface ProductCardProps {
  product: Product;
  counter?: number;
  setProductCounterList: React.Dispatch<React.SetStateAction<ProductCounter[]>>;
}
export const ProductCard = memo(
  ({ product, counter, setProductCounterList }: ProductCardProps) => {
    const navigate = useNavigate();
    const toProductList = useCallback(
      () => navigate(`${routingPaths.ProductItemPage}/${product.id}`),
      [navigate, product.id]
    );

    // useEffect(() => {
    //   if (productCounter.counter === productCounter.data.numberOfproduct) {
    //     getTelegramObject().WebApp.showPopup({
    //       message: `You choose maximum amount of ${productCounter.data.name} products`,
    //     });
    //   }
    // }, [productCounter]);

    return (
      <Card>
        <CardActionArea onClick={toProductList}>
          <CardHeader title={product.name} />
          <CardMedia
            component="img"
            image={product.image || emptyImageUrl}
            alt={product.image || emptyImageAlt}
          />
          <CardContent>
            <Price
              price={product.price}
              discount={product.discountPrice || undefined}
            />
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Counter
            counter={counter}
            onAdd={() => setProductCounterList(addProduct(product))}
            onRemove={() => setProductCounterList(removeProduct(product))}
          />
        </CardActions>
      </Card>
    );
  }
);
