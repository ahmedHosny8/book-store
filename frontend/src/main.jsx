import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserContextProvider } from './hooks/UserContext.jsx';
import { CartProvider } from './context/cartContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OrderContextProvider } from './context/OrderContext.jsx';
const clientId = import.meta.env.VITE_CLIENT_ID;
if (!clientId) {
  console.error('Google Client ID is not defined! Please check your .env file.');
}
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
  <UserContextProvider>
    <CartProvider>
    <OrderContextProvider>
      <App />
      </OrderContextProvider>
    </CartProvider>
  </UserContextProvider>
  </GoogleOAuthProvider>
);
