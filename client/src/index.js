import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index';
import checkUserData from './checkUserData'

ReactDOM.render(
    <App loggedUser={checkUserData()}/>,
  document.getElementById('root')
); 
