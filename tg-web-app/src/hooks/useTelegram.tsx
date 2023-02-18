import { useEffect } from "react";

export const useTelegram = () => {
    return {
        isTelegram: typeof Telegram.WebApp?.initDataUnsafe?.query_id !== 'undefined',
        showPopup: (Telegram.WebApp as any).showPopup,
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
  
  const {BackButton, showPopup} = useTelegram()
  
  useEffect(() => {
    const invoiceClosedHandler = (data: any) => {
      switch (data.status) {
        case 'paid': showPopup({message: 'invoice was paid successfully'}); break;
        case 'cancelled': showPopup({message: 'user closed this invoice without paying'}); break;
        case 'failed': showPopup({message: 'user tried to pay, but the payment was failed'}); break;
        case 'pending': showPopup({message: 'the payment is still processing. The bot will receive a service message about a successful payment when the payment is successfully paid'}); break;
      }
    };

    (Telegram.WebApp as any).onEvent('invoiceClosed', invoiceClosedHandler);
    return () => {(Telegram.WebApp as any).offEvent('invoiceClosed', invoiceClosedHandler)}
  }, [showPopup])

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