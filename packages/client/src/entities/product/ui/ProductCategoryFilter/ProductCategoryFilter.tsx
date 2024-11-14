import { Tab, Tabs } from "@mui/material";
import { ProductCategory } from "shared/api/gql/graphql";
import { useCallback, useEffect, useState } from "react";
import { getProductCategoryList } from "entities/product/api/getProductCategoryList";
import { useNavigate } from "react-router-dom";
import { routingPaths } from "shared/config/routingPaths";

const ALL_FILTER_LABEL = "Все";

export const ProductCategoryFilter = () => {
  const navigate = useNavigate();

  const [productCategory, setProductCategory] = useState<ProductCategory>();

  const [productCategoryList, setProductCategoryList] = useState<
    ProductCategory[]
  >([]);

  const refetchProductCategoryList = useCallback(() => {
    getProductCategoryList().then((productCategoryList) => {
      setProductCategoryList(productCategoryList);
    });
  }, []);

  useEffect(() => {
    refetchProductCategoryList();
  }, [refetchProductCategoryList]);

  return (
    <Tabs
      value={productCategory}
      onChange={(_e, productCategory: ProductCategory) => {
        setProductCategory(productCategory);
        navigate(
          `${routingPaths.ProductListPage}${
            productCategory.id ? productCategory.id : ""
          }`
        );
      }}
    >
      <Tab label={ALL_FILTER_LABEL} value={undefined} />
      {productCategoryList.map((productCategory) => (
        <Tab label={productCategory.singleName} value={productCategory} />
      ))}
    </Tabs>
  );
};
