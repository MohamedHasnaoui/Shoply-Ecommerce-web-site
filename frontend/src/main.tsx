import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {  ApolloProvider } from '@apollo/client';
import { BrowserRouter } from "react-router";


import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { client } from './graphqlProvider.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
       </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
