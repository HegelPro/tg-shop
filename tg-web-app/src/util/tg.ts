export const isTelegram = typeof Telegram.WebApp?.initDataUnsafe?.query_id !== 'undefined'
export const showPopup = isTelegram ? (Telegram.WebApp as any).showPopup : ({message}: {message: string}) => alert(message);
export const BackButton = (Telegram.WebApp as any).BackButton
export const MainButton = Telegram.WebApp.MainButton
export const tgOn = (Telegram.WebApp as any).onEvent
export const tgOff = (Telegram.WebApp as any).offEvent
export const openInvoice = isTelegram ? (Telegram.WebApp as any).openInvoice : (invoiceUrl: string) => alert(`openInvoice with ${invoiceUrl} link`)