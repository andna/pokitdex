import '../styles/globals.css'
import Layout from "../components/templates/Layout";

import {Provider,} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "../app/store";

const store = configureStore({reducer: rootReducer});

function MyApp({ Component, pageProps }) {

  return  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
}

export default MyApp
