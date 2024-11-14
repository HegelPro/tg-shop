import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "pages";
import { ProductStoreProvider } from "entities/product";
import { TelegramThemeProvider } from "shared/ui/ThemeProvider/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductStoreProvider>
        <TelegramThemeProvider>
          <Routing />
        </TelegramThemeProvider>
      </ProductStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);

