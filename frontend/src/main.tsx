import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {  ApolloProvider } from '@apollo/client';
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "select2/dist/css/select2.min.css";
import "./assets/sass/main.scss";
import "./assets/css/main.css";
import "./assets/css/jquery-ui.css";
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
