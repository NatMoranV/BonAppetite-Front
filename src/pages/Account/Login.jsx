import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/customer");
  };
  const navigateRecovery = () => {
    navigate("/customer/recovery");
  };
  const navigatePassword = () => {
    navigate("/customer/password");
  };

  const navigateRegistry = () => {
    navigate("/customer/registry");
  };

  const location = useLocation();
  const $isCustomerView = location.pathname.startsWith("/customer");
  return (
    <StyledView>
      <Logo />
      <h6>Iniciar sesión</h6>
      {$isCustomerView && (
        <CircleButtonsContainer>
          <CircleButton
            onClick={navigateRecovery}
            className={`big`}
            icon={faGoogle}
          />
          {/* <CircleButton onClick={navigatePassword} className={`big`} icon={faFacebookF} /> */}
        </CircleButtonsContainer>
      )}
      {$isCustomerView && <p>O ingresa tus datos</p>}
      <InputsContainer>
        <StyledInput
          type={"email"}
          label={"Correo"}
          name={"email"}
          placeholder={"ejemplo@mail.com"}
        />
        <StyledInput
          type={"password"}
          label={"Contraseña"}
          name={"password"}
          placeholder={"8 digitos"}
        />
      </InputsContainer>
      <CTAsContainer
        text1={"Ingresar"}
        onClick1={navigateHome}
        text2={$isCustomerView && ("Crear cuenta")}
        onClick2={navigateRegistry}
      />
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

const CircleButtonsContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const InputsContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
