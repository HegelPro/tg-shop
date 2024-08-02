import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "entities/product";
import { routingPaths } from "shared/config/routingPaths";
import { Layout } from "shared/ui/Layout/Layout";
import { MainButtonProvider } from "shared/ui/MainButtonProvider/MainButtonProvider";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { refetchProductCounterList } = useProductStore();

  const returnToProduct = useCallback(() => {
    navigate(routingPaths.ProductListPage);
    refetchProductCounterList();
  }, [navigate, refetchProductCounterList]);

  return (
    <MainButtonProvider
      show
      text="Вернуться на главную страницу"
      onClick={returnToProduct}
    >
      <Layout>Произошла ошибка</Layout>
    </MainButtonProvider>
  );
};
