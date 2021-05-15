import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
<<<<<<< HEAD
=======

>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
import { store } from './_helpers';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
    </Provider>
<<<<<<< HEAD
  </React.StrictMode>
  ,
=======
  </React.StrictMode>,
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
