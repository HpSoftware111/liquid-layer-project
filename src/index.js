import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClientProvider , QueryClient} from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Web3ContextProvider } from './context/web3Context';
import {
  TokenInfoProvider
} from "./hooks/useTokenInfo";
import {
  LockInfoProvider
} from "./hooks/useLockInfo";
import {
  FarmInfoProvider
} from "./hooks/useFarmInfo";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <Web3ContextProvider >
      <TokenInfoProvider>
        <LockInfoProvider>
          <FarmInfoProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider >
          </FarmInfoProvider>
        </LockInfoProvider>
      </TokenInfoProvider>
    </Web3ContextProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
