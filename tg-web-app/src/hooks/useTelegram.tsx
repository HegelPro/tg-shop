import { useEffect } from "react";

export const useTelegram = () => {
    return {
        BackButton: (Telegram.WebApp as any).BackButton,
        MainButton: Telegram.WebApp.MainButton,
        openInvoice: (Telegram.WebApp as any).openInvoice
    };
}

interface UseInitTelegramProps {
  page: number
  back: (page: number) => void
}
export const useInitTelegram = ({page, back}: UseInitTelegramProps) => {
  useEffect(() => Telegram.WebApp.ready(), []);
  
  const {BackButton} = useTelegram()
  
  useEffect(() => {
    const invoiceClosedHandler = (data: any) => alert(`${data} ${data.url} ${data.status}`);

    (Telegram.WebApp as any).onEvent('invoiceClosed', invoiceClosedHandler);
    return () => {(Telegram.WebApp as any).offEvent('invoiceClosed', invoiceClosedHandler)}
  }, [])

  useEffect(() => {
    if(page > 0) {
      BackButton.show()
    } else {
      BackButton.hide()
    }
  }, [BackButton, page])

  useEffect(() => {
    BackButton.onClick(back)
    return () => {
      BackButton.offClick(back)
    }
  }, [BackButton, back])
}