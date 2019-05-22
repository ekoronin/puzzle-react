import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import monks from "./monks.jpg";

ReactDOM.render(<App dimension={3} size={120} image="https://www.artscalendar.com/wp-content/uploads/sites/www.artscalendar.com/images/2018/05/Sacred-Art-Tour_1601191-400x400.jpg" />, document.getElementById('root33'));
ReactDOM.render(<App dimension={4} size={100} image={monks} cheating/>, document.getElementById('root44'));
ReactDOM.render(<App dimension={5} size={75} image="https://d3dk2sm57sh93q.cloudfront.net/Freepackers/Activities/en--LAO02-volontariat-laos-novices-thumb.jpg" />, document.getElementById('root55'));
