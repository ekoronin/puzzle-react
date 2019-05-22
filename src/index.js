import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import monks from "./monks.jpg";

ReactDOM.render(<App dimension={4} image={monks}/>, document.getElementById('root'));
