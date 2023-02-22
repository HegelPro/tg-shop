export const isTelegram = typeof Telegram.WebApp?.initDataUnsafe?.query_id !== 'undefined'
export const showPopup = (Telegram.WebApp as any).showPopup
export const BackButton = (Telegram.WebApp as any).BackButton
export const MainButton = Telegram.WebApp.MainButton
export const openInvoice = (Telegram.WebApp as any).openInvoice
export const tgOn = (Telegram.WebApp as any).onEvent
export const tgOff = (Telegram.WebApp as any).offEvent