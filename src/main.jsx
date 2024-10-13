import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalStyle } from "@/components"
import store, { persistor } from './store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalStyle>
    </PersistGate>
  </Provider>
)
