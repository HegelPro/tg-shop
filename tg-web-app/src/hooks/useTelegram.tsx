import { useEffect } from "react";

export const useTelegram = () => {
    return {
        BackButton: (Telegram.WebApp as any).BackButton,
        MainButton: Telegram.WebApp.MainButton,
        openInvoice: (Telegram.WebApp as any).openInvoice
    };
}

export const useInitTelegram = () => {
  useEffect(() => Telegram.WebApp.ready(), [])
}