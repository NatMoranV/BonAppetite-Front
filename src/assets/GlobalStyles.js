import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.text};
    overflow-x: hidden;
    transition: color, background-color 0.3s ease;
  }
  
  *{
    margin: 0;
    padding: 0;
     font-family: Montserrat;
     color: ${(props) => props.theme.text};
     line-height: 2rem;

  }

  select, input:focus {
    outline: none;
    border: none;}


  
  .disabled{
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.textDisabled};
    color: ${(props) => props.theme.textDisabled} ;
    cursor: default;
    pointer-events: none;


  }
  
  h1{
    font-size: 2.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
  margin-bottom: 2rem;
  }

  h2{
    font-size: 2rem;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 2rem;
text-align: center ;
  }
  
  h4{
    margin-bottom: 1rem;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: start;
  }
  
  h5{
    font-size: 1.5em;
    margin: 0 ;
    font-weight: 600;
  
  }
  h6{
    font-size: 1.5em;
    margin: 1rem 0 0 0;
  
  }
  
  p{
    font-size: 1.2rem;
  line-height: 2rem;
  }
  
  path {
    fill: ${(props) => props.theme.text};
  }
  
  .hidden{
    display: none
  }


@media (max-width: 768px) {
  h1, h2, h4, h5, h6, p, span {
    text-align: center;
  }
}
`;
export default GlobalStyle;
