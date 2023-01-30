import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App'

const baseRoot = document.getElementById('root') as HTMLElement

let root = ReactDOM.createRoot(baseRoot)
root.render(
    <App/>
);
