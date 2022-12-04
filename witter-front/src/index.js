import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { WeetComponent, CreateWeet } from './weets'

const e = React.createElement
var root = false
if(document.getElementById('root')) {
  var root = ReactDOM.createRoot(document.getElementById('root'))
}

if(document.getElementById('root')) {
  root.render(
    e(WeetComponent, root.dataset)
  );
}

const createHTML = document.getElementById('home')
if(createHTML) {
  const create = ReactDOM.createRoot(createHTML);
  if (create) {
    create.render(
      <CreateWeet/> 
    )
  }
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
