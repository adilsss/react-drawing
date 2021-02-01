import {createGlobalStyle} from 'styled-components';

export const Globals = createGlobalStyle`
  body {
    background: #FFDF8C;
    font-family: 'Roboto', 'Roboto-Bold', sans-serif;
    font-size: 15px;
    margin: 0;
  }
  
  h1 {
    text-align: center;
    font-weight: 800;
  }
  
  canvas {
    border: 1px solid black;
    background: white;
  }
`;