import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { getTelegramObject } from "../../lib/getTelegramObject";

interface BackButtonContext {
  show?: boolean;
  onClick?: () => void;
}
const backButtonContext = createContext<BackButtonContext>({});
const useBackButtonContext = () => useContext(backButtonContext);
interface BackButtonProviderProps
  extends BackButtonContext,
    PropsWithChildren {}
export const BackButtonProvider = ({
  children,
  ...props
}: BackButtonProviderProps) => {
  const { show, onClick } = useBackButtonContext();
  useEffect(() => {
    if (props.show) {
      getTelegramObject().WebApp.BackButton.show();
    } else {
      getTelegramObject().WebApp.BackButton.hide();
    }
    return () => {
      if (show) {
        getTelegramObject().WebApp.BackButton.show();
      } else {
        getTelegramObject().WebApp.BackButton.hide();
      }
    };
  }, [props.show, show]);

  useEffect(() => {
    if (props.onClick) {
      getTelegramObject().WebApp.BackButton.onClick(props.onClick);
    }
    if (onClick) {
      getTelegramObject().WebApp.BackButton.offClick(onClick);
    }
    return () => {
      if (props.onClick) {
        getTelegramObject().WebApp.BackButton.offClick(props.onClick);
      }
      if (onClick) {
        getTelegramObject().WebApp.BackButton.onClick(onClick);
      }
    };
  }, [onClick, props.onClick]);

  return (
    <backButtonContext.Provider value={props}>
      {children}
    </backButtonContext.Provider>
  );
};
