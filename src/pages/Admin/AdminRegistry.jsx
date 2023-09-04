import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";

export const ManagerRegistry = () => {
  return (
    <StyledView>
      <Logo />
      <h6>Agrega un encargado</h6>
      <InputsContainer>
        <StyledInput
          type={"text"}
          label={"Nombre"}
          name={"name"}
          placeholder={"Nombre del encargado"}
        />

        <StyledInput
          type={"email"}
          label={"Correo"}
          name={"email"}
          placeholder={"ejemplo@mail.com"}
        />
      </InputsContainer>
      <p>
        El encargado recibirá un mail con las indicaciones para crear su cuenta.
      </p>
      <CTAsContainer text1={"Enviar invitación"} />
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  overflow-y: auto;
  padding: 3vh 4vw 10vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 0;
  }
`;


const InputsContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

