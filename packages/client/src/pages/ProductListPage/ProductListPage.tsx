import { StoreProductList } from "widgets/StoreProductList";
import { Layout } from "shared/ui/Layout/Layout";
import { ProductCategoryFilter } from "entities/product";

export const ProductListPage = () => (
  <Layout header={<ProductCategoryFilter />}>
    <StoreProductList />
  </Layout>
);
