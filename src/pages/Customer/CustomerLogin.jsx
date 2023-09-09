import { useState } from "react";
import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import onFacebook from "../../utils/Firebase/onFacebook";
import onGoogle from "../../utils/Firebase/onGoogle";
import sigIn from "../../utils/Firebase/sigIn";

export const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = () => {
    sigIn(email, password);
    navigate("/home");
  };
  const onClickGoogle = async () => {
    const response = await onGoogle();
    console.log(response);
    navigate("/home");
  };
  const onClickFacebook = async () => {
    const response = await onFacebook();
    console.log(response);
    navigate("/home");
  };
  /*   const navigateRecovery = () => {
    navigate("/customer/recovery");
  }; */
  /*   const navigatePassword = () => {
    navigate("/customer/password");
  }; */

  const navigateRegistry = () => {
    navigate("/customer/registry");
  };
  return (
    <StyledView>
      <Logo />
      <h6>Iniciar sesión</h6>
      <CircleButtonsContainer>
        <CircleButton
          onClick={onClickGoogle}
          className={`big`}
          icon={faGoogle}
        />
        <CircleButton
          onClick={onClickFacebook}
          className={`big`}
          icon={faFacebookF}
        />
      </CircleButtonsContainer>
      <p>O ingresa tus datos</p>
      <InputsContainer>
        <StyledInput
          type={"email"}
          label={"Correo"}
          name={"email"}
          placeholder={"ejemplo@mail.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          type={"password"}
          label={"Contraseña"}
          name={"password"}
          placeholder={"8 digitos"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputsContainer>
      <CTAsContainer
        text1={"Ingresar"}
        onClick1={login}
        text2={"Crear cuenta"}
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
