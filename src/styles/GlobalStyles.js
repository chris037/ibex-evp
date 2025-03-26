import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

/* Prevent horizontal scrolling */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

  body {
    background-color: #000;
    color: #fff;
    text-align: center;
  }

  button {
    background: #FF007A;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
  }

  
`;



export default GlobalStyle;


