// pages/_app.js
import React, { useEffect } from "react";
// import { wrapper } from '../store';

// Global styles
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";
import { Provider, useDispatch } from "react-redux";
import store from "./../store/store";
import { getUser } from "APIS/user";
import { setData } from "reducers/userSlice";
import Initializer from "./Init";

const MyApp = ({ Component, pageProps }) => {
    
    
  

  return (
    <Provider store={store}>
        <Initializer/>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
// export default wrapper.withRedux(MyApp);


