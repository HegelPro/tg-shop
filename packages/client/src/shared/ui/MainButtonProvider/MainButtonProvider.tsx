import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { getTelegramObject } from "../../lib/getTelegramObject";

interface MainButtonContext {
  show?: boolean;
  text?: string;
  onClick?: () => void;
}
const mainButtonContext = createContext<MainButtonContext>({});
const useMainButtonContext = () => useContext(mainButtonContext);
interface MainButtonProviderProps
  extends MainButtonContext,
    PropsWithChildren {}
export const MainButtonProvider = ({
  children,
  ...props
}: MainButtonProviderProps) => {
  const { show, text, onClick } = useMainButtonContext();
  useEffect(() => {
    if (props.show) {
      getTelegramObject().WebApp.MainButton.show();
    } else {
      getTelegramObject().WebApp.MainButton.hide();
    }
    return () => {
      if (show) {
        getTelegramObject().WebApp.MainButton.show();
      } else {
        getTelegramObject().WebApp.MainButton.hide();
      }
    };
  }, [props.show, show]);

  useEffect(() => {
    if (props.text) {
      getTelegramObject().WebApp.MainButton.setText(props.text);
    }
    return () => {
      if (text) {
        getTelegramObject().WebApp.MainButton.setText(text);
      }
    };
  }, [props.text, text]);

  useEffect(() => {
    if (props.onClick) {
      getTelegramObject().WebApp.MainButton.onClick(props.onClick);
    }
    if (onClick) {
      getTelegramObject().WebApp.MainButton.offClick(onClick);
    }
    return () => {
      if (props.onClick) {
        getTelegramObject().WebApp.MainButton.offClick(props.onClick);
      }
      if (onClick) {
        getTelegramObject().WebApp.MainButton.onClick(onClick);
      }
    };
  }, [onClick, props.onClick]);

  return (
    <mainButtonContext.Provider value={props}>
      {children}
    </mainButtonContext.Provider>
  );
};
