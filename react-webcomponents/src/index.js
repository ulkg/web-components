import React from 'react';
import { render } from 'react-dom';
import './style.css';

import App from './App';


const WebComponentApp = () => {
  
  return <div>
    <App />
  </div>;
}

render(<WebComponentApp />, document.getElementById('root'));
