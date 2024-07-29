import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal';
import { BrowserRouter } from "react-router-dom";
import './main.css'
import { ProductStoreProvider } from '../entities/product';
import { Routing } from '../pages';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductStoreProvider>
        <div className="App">
          <Routing />
        </div>
      </ProductStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

Modal.setAppElement(document.getElementById('root') as HTMLElement);
