import { Typography } from "@mui/material";
import { addProduct, removeProduct, useProductStore } from "entities/product";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routingPaths } from "shared/config/routingPaths";
import { BackButtonProvider } from "shared/ui/BackButtonProvider/BackButtonProvider";
import { MainButtonProvider } from "shared/ui/MainButtonProvider/MainButtonProvider";
import { Price } from "shared/ui/Price/Price";
import { marked } from "marked";
import { ProductQuery } from "shared/api/gql/graphql";
import { getProduct } from "../../../../entities/product/api/getProduct";
import { Counter } from "shared/ui/Counter/Counter";

const NotFoundMessage = () => <>Товар не найден</>;

export const ProductItem = () => {
  const navigate = useNavigate();
  const toProductList = useCallback(
    () => navigate(routingPaths.ProductListPage),
    [navigate]
  );
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductQuery["product"]>();

  const { productCounterList, setProductCounterList } = useProductStore();

  useEffect(() => {
    if (productId) {
      getProduct(+productId).then((product) => setProduct(product));
    }
  }, [productId]);

  const productCounter = useMemo(
    () =>
      productCounterList.find(
        (productCounter) => productCounter.data.id === product?.id
      ),
    [product?.id, productCounterList]
  );

  const htmlDescription = useMemo(
    () => (product?.descrition ? marked.parse(product?.descrition) : undefined),
    [product?.descrition]
  );

  if (!product) {
    return <NotFoundMessage />;
  }

  return (
    <MainButtonProvider show={false}>
      <BackButtonProvider show onClick={toProductList}>
        <Typography variant="h6">{product.name}</Typography>
        <img src={product.image || undefined} width="100%" />
        <Price
          price={product.price}
          discount={product.discountPrice || undefined}
        />
        {typeof htmlDescription === "string" && (
          <Typography>{htmlDescription}</Typography>
        )}

        <Counter
          onAdd={() => setProductCounterList(addProduct(product))}
          onRemove={() => setProductCounterList(removeProduct(product))}
          counter={productCounter?.counter}
        />
      </BackButtonProvider>
    </MainButtonProvider>
  );
};
