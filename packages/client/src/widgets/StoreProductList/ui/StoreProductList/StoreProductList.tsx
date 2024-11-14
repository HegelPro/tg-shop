import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "features/ProductCard";
import { useProductStore } from "entities/product";
import { routingPaths } from "shared/config/routingPaths";
import { MainButtonProvider } from "shared/ui/MainButtonProvider/MainButtonProvider";
import { Grid2 } from "@mui/material";
import {
  ProductCategory,
  ProductListWithCategoryFilterQuery,
} from "shared/api/gql/graphql";
import { getProductListWithCategoryFilter } from "entities/product/api/getProductListWithCategoryFilter";

const MAIN_BUTTON_TEXT = "Перейти к заказу"

export const StoreProductList = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [productList, setProductList] = useState<
    ProductListWithCategoryFilterQuery["productListWithCategoryFilter"]
  >([]);

  const refetchProductList = useCallback(
    (productCategoryId?: ProductCategory["id"]) => {
      getProductListWithCategoryFilter(productCategoryId).then(
        (productList) => {
          setProductList(productList);
        }
      );
    },
    []
  );

  useEffect(() => {
    refetchProductList(categoryId ? +categoryId : undefined);
  }, [refetchProductList, categoryId]);

  const { productCounterList, setProductCounterList } = useProductStore();

  const toOrderContactInfoFormPage = useCallback(() => {
    navigate(routingPaths.OrderContactInfoFormPage);
  }, [navigate]);

  return (
    <MainButtonProvider
      show={productCounterList.some(({ counter }) => counter > 0)}
      text={MAIN_BUTTON_TEXT}
      onClick={toOrderContactInfoFormPage}
    >
      <Grid2 container spacing={1}>
        {productList.map((product) => (
          <Grid2 size={12}>
            <ProductCard
              key={product.id}
              product={product}
              counter={
                productCounterList.find(
                  (productCounter) => productCounter.data.id === product.id
                )?.counter
              }
              setProductCounterList={setProductCounterList}
            />
          </Grid2>
        ))}
      </Grid2>
    </MainButtonProvider>
  );
};
