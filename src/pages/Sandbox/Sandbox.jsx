
import styled from "styled-components";
import { PaySuccess } from "../PaySuccess/PaySuccess";


export const Sandbox = ({currentTheme}) => {


  return (
    <StyledView>
<PaySuccess currentTheme={currentTheme}></PaySuccess>
    </StyledView>
  );
};


const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10rem auto;
  /* padding: 10vh 4vw 10vh; */
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 5rem;
  background-color: blue;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 0;
  }
`;
