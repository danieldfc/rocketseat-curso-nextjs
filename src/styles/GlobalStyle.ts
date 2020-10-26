import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: #121214;
    color: #fff;
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }
`;