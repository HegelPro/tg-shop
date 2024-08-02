import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "pages";
import { ProductStoreProvider } from "entities/product";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductStoreProvider>
        <div className="App">
          <Routing />
        </div>
      </ProductStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);

Modal.setAppElement(document.getElementById("root") as HTMLElement);
