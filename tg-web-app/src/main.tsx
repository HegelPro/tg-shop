import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal';
import App from './App'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

Modal.setAppElement(document.getElementById('root') as HTMLElement);
