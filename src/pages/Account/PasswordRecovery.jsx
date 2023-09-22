import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { Input } from "../../components/Input/Input";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import {validateLength8, containsNumberAndLetter} from "../../utils/validations";


export const PasswordRecovery = () => {
	const navigate = useNavigate()
	const navigateHome = () => {
		navigate('/home')
	}

  const [formData, setFormData] = useState({
    password: "",
    passwordRepeat: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (event) =>{
    let error = ""
    const {name, value} = event.target

    if (name === "password") {
      error = !value ? "No puede estar vacio" : !validateLength8(value) ? "No puede tener menos de 8 caracteres" : containsNumberAndLetter(value) ? "" : "Debe contener al menos un numero y al menos una letra"
      setFormData({ ...formData, [name]: value })
    }
    if (name === "passwordRepeat") {
      error = !value ? "No puede estar vacio" : value !== formData.password ? "Tus contraseñas no coinciden" : "";
      setFormData({ ...formData, [name]: value })
    }
		setErrors({ ...errors, [name]: error });
  }

  const enableButton =
		errors.password === "" &&
		errors.passwordRepeat === "" &&
		formData.password !== "" &&
		formData.passwordRepeat !== "";

  return (
    <StyledView>
      <Logo />
      <h6>Actualiza tu contraseña</h6>
      <InputsContainer>
        <Input
          type={"password"} 
          label={"Nueva contraseña"}
          name={"password"}
          placeholder={"Al menos 8 caracteres..."}
          onChange={handleChange}
          onBlur={handleChange}
          helper={errors.password}
          value={formData.password}        
          isHelperOrError={true}
        />

        <Input
          type={"password"}
          label={"Repetir contraseña"}
          name={"passwordRepeat"}
          placeholder={"Debe coincidir con el campo anterior"}
          onChange={handleChange}
          onBlur={handleChange}
          helper={errors.passwordRepeat}
          value={formData.passwordRepeat}
          isHelperOrError={true}
        />
      </InputsContainer>
      <CTAsContainer text1={"Actualizar Contraseña"} onClick1={navigateHome} buttonClass1={enableButton ? "" : "disabled"} >
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

