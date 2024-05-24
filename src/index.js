import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import FlagProvider from './context/FlagProvider';
// require('dotenv').config();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FlagProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </FlagProvider>
);
