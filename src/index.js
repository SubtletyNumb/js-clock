import React from 'react';
import ReactDOM from 'react-dom/client';
import './style-sheets/index.css';
import App from './App';
import { Store } from './Store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
