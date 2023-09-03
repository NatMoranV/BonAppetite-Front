import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from 'react-router-dom'

export const CustomerPasswordRecovery = () => {
	const navigate = useNavigate()
	const navigateHome = () => {
		navigate('/home')
	}
  return (
    <StyledView>
      <Logo />
      <h6>Actualiza tu contraseña</h6>
      <InputsContainer>
        <StyledInput
          type={"password"}
		  label={"Nueva contraseña"}
          name={"password"}
          placeholder={"8 digitos"}
        />

        <StyledInput
          type={"password"}
		  label={"Repetir contraseña"}
          name={"password"}
          placeholder={"Debe coincidir con el campo anterior"}
        />
      </InputsContainer>
      <CTAsContainer text1={"Actualizar Contraseña"} onClick1={navigateHome}>
	  </CTAsContainer>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 3rem 1rem;
  box-sizing: border-box;
  gap: 2.5rem;
  transition: width 0.3s ease-in-out;


  @media (min-width: 650px){
	width: 30rem;
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


