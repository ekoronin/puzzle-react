import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import monks from "./monks.jpg";

//redux business here
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import * as Reducers from './reducers' 

const initialState = {
    time:   0,
    steps:  0,
    won:    false,
    tiles:  [],
  };

const reducers = combineReducers(Reducers);
export const store33 = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store44 = createStore(reducers, initialState);
export const store55 = createStore(reducers, initialState);
  

ReactDOM.render(
    <Provider store={store33}>
        <App dimension={3} size={120} image="https://www.artscalendar.com/wp-content/uploads/sites/www.artscalendar.com/images/2018/05/Sacred-Art-Tour_1601191-400x400.jpg" />
    </Provider>
    ,document.getElementById('root33'));  

ReactDOM.render(
    <Provider store={store44}>
        <App dimension={4} size={100} image={monks} cheating />
    </Provider>    
    ,document.getElementById('root44'));

ReactDOM.render(
    <Provider store={store55}>
        <App dimension={5} size={75} image="https://d3dk2sm57sh93q.cloudfront.net/Freepackers/Activities/en--LAO02-volontariat-laos-novices-thumb.jpg" />
    </Provider>
    ,document.getElementById('root55'));
