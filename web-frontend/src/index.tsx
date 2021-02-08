import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import './style.scss';
import 'antd-mobile/dist/antd-mobile.css';

ReactDom.render(
  <App />,
  document.getElementById('app'),
);
