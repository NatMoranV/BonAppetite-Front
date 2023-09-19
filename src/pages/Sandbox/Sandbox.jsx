
import styled from "styled-components";
import { Timer } from "../../components/Timer/Timer";

export const Sandbox = () => {
 
  const handleTimeOff = () => {
    alert("¡Tu tiempo se ha agotado!"); // Coloca aquí la lógica que desees ejecutar al finalizar el tiempo
  };

  return (
    <StyledView>
      <Timer onTimeOff={handleTimeOff}/>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10rem auto;
  padding: 10vh 4vw 10vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 5rem;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 0;
  }
`;
