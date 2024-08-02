import { useEffect } from "react";
import { getTelegramObject } from "../lib/getTelegramObject";

interface UseMainButtonProps {
  show: boolean;
  text: string;
  onClick: () => void;
}
export const useMainButton = ({
  show,
  text,
  onClick
}: UseMainButtonProps) => {
  useEffect(() => {
    if (show) {
      getTelegramObject().WebApp.MainButton.show()
    } else {
      getTelegramObject().WebApp.MainButton.hide()
    }
    return () => {
      getTelegramObject().WebApp.MainButton.hide()
    }
  }, [show]);

  useEffect(() => {
    getTelegramObject().WebApp.MainButton.setText(text)
    return () => {
      getTelegramObject().WebApp.MainButton.setText('Error')
    }
  }, [text]);

  useEffect(() => {
    getTelegramObject().WebApp.MainButton.onClick(onClick)
    return () => { getTelegramObject().WebApp.MainButton.offClick(onClick) }
  }, [onClick]);
}
