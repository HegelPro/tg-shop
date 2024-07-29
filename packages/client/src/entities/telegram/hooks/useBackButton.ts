import { useEffect } from "react"
import { getTelegramObject } from "../lib/getTelegramObject"

interface UseBackButtonProps {
  show: boolean;
  onClick: () => void;
}
export const useBackButton = ({ show, onClick }: UseBackButtonProps) => {
  useEffect(() => {
    if (show) {
      getTelegramObject().WebApp.BackButton.show()
    } else {
      getTelegramObject().WebApp.BackButton.hide()
    }
    return () => {
      getTelegramObject().WebApp.BackButton.hide()
    }
  }, [show]);

  useEffect(() => {
    getTelegramObject().WebApp.BackButton.onClick(onClick)
    return () => {
      getTelegramObject().WebApp.BackButton.offClick(onClick)
    }
  }, [onClick])
}
