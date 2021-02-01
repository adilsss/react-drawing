import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from './App';
import { Globals } from "./Global-styles";


ReactDOM.render(
    <React.StrictMode>
        <Globals />
        <Canvas/>
    </React.StrictMode>,
    document.getElementById('root')
);