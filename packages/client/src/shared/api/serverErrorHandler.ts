import { getTelegramObject } from "../../shared/lib/getTelegramObject";

export const serverErrorHandler = (e: unknown) => {
  if (e instanceof Error) {
    console.error(e);
    getTelegramObject().WebApp.showPopup({
      message: `name: ${e.name}\nmessage: ${e.message}\nstack: ${e.stack}`,
    });
  }
};
