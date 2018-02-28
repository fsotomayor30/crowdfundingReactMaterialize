import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';

//Routes
import AppRoutes from './routes';

//Assets   
import './index.css';

firebase.initializeApp({
    apiKey: " ",
    authDomain: " ",
    databaseURL: " ",
    projectId: " ",
    storageBucket: " ",
    messagingSenderId: ""
})

render(
    <Router>
        <AppRoutes />
    </Router>,
    document.getElementById('root')
);

