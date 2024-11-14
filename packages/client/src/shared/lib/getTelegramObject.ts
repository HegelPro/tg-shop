import { pipe } from "fp-ts/lib/function";
import * as T from "io-ts";
import * as E from "fp-ts/Either";

const themeParams = T.type({
  bg_color: T.union([T.string, T.undefined]),
  text_color: T.union([T.string, T.undefined]),
  hint_color: T.union([T.string, T.undefined]),
  link_color: T.union([T.string, T.undefined]),
  button_color: T.union([T.string, T.undefined]),
  button_text_color: T.union([T.string, T.undefined]),
  section_separator_color: T.union([T.string, T.undefined]),
});
type ThemeParams = T.TypeOf<typeof themeParams>;

type EventType =
  | "themeChanged"
  | "viewportChanged"
  | "mainButtonClicked"
  | "invoiceClosed";

const mainButton = T.type({
  setText: T.Function,
  onClick: T.Function,
  offClick: T.Function,
  show: T.Function,
  hide: T.Function,
});
interface MainButton extends T.TypeOf<typeof mainButton> {
  setText: (text: string) => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
}

const backButton = T.type({
  onClick: T.Function,
  offClick: T.Function,
  show: T.Function,
  hide: T.Function,
});
interface BackButton extends T.TypeOf<typeof backButton> {
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
}

const user = T.union([
  T.type({
    id: T.union([T.number, T.undefined]),
    // is_bot: T.boolean,
    is_bot: T.union([T.boolean, T.undefined]),
    // first_name: T.string,
    first_name: T.union([T.string, T.undefined]),
    last_name: T.union([T.string, T.undefined]),
    username: T.union([T.string, T.undefined]),
    language_code: T.union([T.string, T.undefined]),
  }),
  T.undefined,
]);
type User = T.TypeOf<typeof user>;

const telegramObject = T.type({
  WebApp: T.type({
    close: T.Function,
    expand: T.Function,
    ready: T.Function,
    openInvoice: T.Function,
    showPopup: T.Function,
    onEvent: T.Function,
    offEvent: T.Function,
    MainButton: mainButton,
    BackButton: backButton,
    initDataUnsafe: T.type({
      user,
    }),
  }),
});
interface TelegramObject extends T.TypeOf<typeof telegramObject> {
  WebApp: {
    close: () => void;
    expand: () => void;
    ready: () => void;
    openInvoice: (invoice: string) => void;
    showPopup: (data: { message: string }) => void;
    onEvent: (
      eventType: EventType,
      eventHandler: (data: {
        status: "paid" | "cancelled" | "failed" | "pending";
      }) => void
    ) => void;
    offEvent: (
      eventType: EventType,
      eventHandler: (data: {
        status: "paid" | "cancelled" | "failed" | "pending";
      }) => void
    ) => void;
    MainButton: MainButton;
    BackButton: BackButton;
    themeParams: ThemeParams;
    initDataUnsafe: {
      user: User;
    };
  };
}

const mockBackButton: BackButton = {
  show: () => mockBackButton,
  hide: () => mockBackButton,
  onClick: () => mockBackButton,
  offClick: () => mockBackButton,
};
const mockMainButton: MainButton = {
  setText: () => mockMainButton,
  show: () => mockMainButton,
  hide: () => mockMainButton,
  onClick: () => mockMainButton,
  offClick: () => mockMainButton,
};
const mockTelegramObject: TelegramObject = {
  WebApp: {
    BackButton: mockBackButton,
    MainButton: mockMainButton,
    ready: () => undefined,
    close: () => undefined,
    expand: () => undefined,
    openInvoice: (invoice: string) => alert(`invoice: ${invoice}`),
    showPopup({ message }: { message: string }) {
      alert(message);
    },
    onEvent(eventType: EventType) {
      alert(eventType);
    },
    offEvent(eventType: EventType) {
      alert(eventType);
    },
    themeParams: {
      bg_color: undefined,
      hint_color: undefined,
      link_color: undefined,
      text_color: undefined,
      button_color: undefined,
      button_text_color: undefined,
      section_separator_color: undefined,
    },
    initDataUnsafe: {
      user: {
        id: 0,
        first_name: "",
        last_name: undefined,
        language_code: undefined,
        username: undefined,
        is_bot: false,
      },
    },
  },
};

export function getTelegramObject(): TelegramObject {
  // (Telegram as any).WebApp.showPopup({
  //   message: 'JSON.stringify("Hello")',
  // });
  // (Telegram as any).WebApp.showPopup({
  //   message: JSON.stringify((Telegram as any)?.initData),
  // });
  // (Telegram as any).WebApp.showPopup({
  //   message: JSON.stringify((Telegram as any)?.initDataUnsafe?.user),
  // });
  // (Telegram as any).WebApp.showPopup({
  //   message: JSON.stringify((Telegram as any)?.initDataUnsafe),
  // });
  // console.log();
  const eithertelegramObject = telegramObject.decode(Telegram) as E.Either<
    T.Errors,
    TelegramObject
  >;
  return pipe(
    eithertelegramObject,
    E.getOrElse(() => mockTelegramObject)
  );
}
