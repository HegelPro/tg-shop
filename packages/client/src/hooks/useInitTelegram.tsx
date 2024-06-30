import { useEffect } from "react";
import { BackButton } from "../util/tg";

interface UseInitTelegramProps {
  page: number
  back: (page: number) => void
}
export const useInitTelegram = ({page, back}: UseInitTelegramProps) => {
  useEffect(() => Telegram.WebApp.ready(), []);

  useEffect(() => {
    if(page > 0) {
      BackButton.show()
    } else {
      BackButton.hide()
    }
  }, [page])

  useEffect(() => {
    BackButton.onClick(back)
    return () => {
      BackButton.offClick(back)
    }
  }, [back])
}