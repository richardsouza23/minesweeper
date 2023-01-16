import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App';
import mainReducer from './state/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';



const store = configureStore({reducer: mainReducer});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);