import { useNavigate } from "react-router-dom";
import { Layout } from "../../shared/ui/Layout/Layout";
import { routingPaths } from "../../shared/config/routingPaths";
import { useProductStore } from "../../entities/product";
import { useCallback } from "react";
import { useMainButton } from "../../shared/hooks/useMainButton";

export const ErrorPage = () => {
    const navigate = useNavigate();
    const {refetchProductCounterList} = useProductStore()

    const returnToProduct = useCallback(() => {
        navigate(routingPaths.ProductListPage)
        refetchProductCounterList()
    }, [navigate, refetchProductCounterList])

    useMainButton({
        show: true,
        text: 'Вернуться на главную страницу',
        onClick: returnToProduct
    })

    return (
        <Layout>
            Произошла ошибка
        </Layout>
    )
}

