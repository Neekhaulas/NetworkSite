import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Open+Sans");

  body {
    font-family: "Open Sans", sans-serif;
    background-color: #393e46;
    margin: 0;
  }
`;

export default GlobalStyles;