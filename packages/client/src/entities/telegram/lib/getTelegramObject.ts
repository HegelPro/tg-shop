interface MainButton {
  setText(text: string): MainButton;
  onClick(callback: () => void): MainButton;
  offClick(callback: () => void): MainButton;
  show(): MainButton;
  hide(): MainButton;
}
function isMainButton(object: unknown): object is MainButton {
  if(
    typeof object === 'object' && object !== null
    && 'setText' in object && typeof object.setText === 'function'
    && 'onClick' in object && typeof object.onClick === 'function'
    && 'offClick' in object && typeof object.offClick === 'function'
    && 'show' in object && typeof object.show === 'function'
    && 'hide' in object && typeof object.hide === 'function'
  ) {
    return true
  }
  return false
}

interface BackButton {
  onClick(callback: () => void): BackButton;
  offClick(callback: () => void): BackButton;
  show(): BackButton;
  hide(): BackButton;
}
function isBackButton(object: unknown): object is BackButton {
  if(
    typeof object === 'object' && object !== null
    && 'onClick' in object && typeof object.onClick === 'function'
    && 'offClick' in object && typeof object.offClick === 'function'
    && 'show' in object && typeof object.show === 'function'
    && 'hide' in object && typeof object.hide === 'function'
  ) {
    return true
  }
  return false
}

type EventType = "themeChanged" | "viewportChanged" | "mainButtonClicked" | "invoiceClosed";

interface WebApp {
  ready(): void;
  openInvoice(invoice: string): void;
  showPopup(data: {message: string}): void
  onEvent(eventType: EventType, eventHandler: (data: { status: 'paid' | 'cancelled' | 'failed' | 'pending' }) => void): void;
  offEvent(eventType: EventType, eventHandler: (data: { status: 'paid' | 'cancelled' | 'failed' | 'pending' }) => void): void;
  MainButton: MainButton,
  BackButton: BackButton
}
function isWebApp(object: unknown): object is WebApp {
  if(
    typeof object === 'object' && object !== null
    && 'ready' in object && typeof object.ready === 'function'
    && 'openInvoice' in object && typeof object.openInvoice === 'function'
    && 'showPopup' in object && typeof object.showPopup === 'function'
    && 'onEvent' in object && typeof object.onEvent === 'function'
    && 'offEvent' in object && typeof object.offEvent === 'function'
    && 'MainButton' in object && isMainButton(object.MainButton)
    && 'BackButton' in object && isBackButton(object.BackButton)
  ) {
    return true
  }
  return false
}


interface TelegramObject {
  WebApp: WebApp
}
function isTelegramObject(object: unknown): object is TelegramObject {
  if(
    typeof object === 'object' && object !== null
    && 'WebApp' in object && isWebApp(object.WebApp)
  ) {
    return true
  }
  return false
}

const GLOBAL_TELEGRAM_OBJECT = isTelegramObject(Telegram) ? Telegram : undefined
const mockBackButton: BackButton = {
  show: () => mockBackButton,
  hide: () => mockBackButton,
  onClick: () => mockBackButton,
  offClick: () => mockBackButton
}
const mockMainButton: MainButton = {
  setText: () => mockMainButton,
  show: () => mockMainButton,
  hide: () => mockMainButton,
  onClick: () => mockMainButton,
  offClick: () => mockMainButton
}
const mockTelegramObject: TelegramObject = {
  WebApp: {
    BackButton: mockBackButton,
    MainButton: mockMainButton,
    ready: () => undefined,
    openInvoice: (invoice: string) => alert(`invoice: ${invoice}`),
    showPopup({message}: {message: string}) {
      alert(message);
    },
    onEvent(eventType: EventType) {
      alert(eventType); 
    },
    offEvent(eventType: EventType) {
      alert(eventType); 
    },
  }
}

export function getTelegramObject(): TelegramObject {
  if(GLOBAL_TELEGRAM_OBJECT) {
    return GLOBAL_TELEGRAM_OBJECT
  }

  return mockTelegramObject
}

