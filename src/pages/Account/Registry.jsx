import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { Input } from "../../components/Input/Input";
import {
  isString,
  validateEmail,
  validateLength8,
  containsNumberAndLetter
} from "../../utils/validations";
import { Modal } from "../../components/Modal/Modal";

export const Registry = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    displayName: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    displayName: "",
    button: "disabled",
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const $isCustomerView = location.pathname.startsWith("/customer");

  const login = async () => {
    setLoading(true);

    try {
      const form = { ...formData };
      delete form.passwordRepeat;

      // console.log(form);

      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/users/create`,
        form
      );
      console.log(response.data)
      setLoading(false);
      navigateHome();
    } catch (error) {
      console.error(
        "Error en el proceso de inicio de sesión:",
        error.response.data.error
      );
      alert(error.response.data.error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    let error = "";
    const { name, value } = event.target;

    if (name === "displayName") {
      error = !value ? "No puede estar vacio" : isString(value) ? "" : "Verifica tu nombre";
    }
    if (name === "email") {
      error = !value ? "No puede estar vacio" : validateEmail(value) ? "" : "Debe ser un email valido";
    }
    if (name === "password") {
      error = !value ? "No puede estar vacio" : !validateLength8(value) ? "No puede tener menos de 8 caracteres" : containsNumberAndLetter(value) ? "" : "Debe contener al menos un numero y al menos una letra"
    }
    if (name === "passwordRepeat") {
      error = !value ? "No puede estar vacio" : value !== formData.password ? "Tus contraseñas no coinciden" : "";
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    console.log(errors, formData);
    const { email, password, passwordRepeat, displayName } = errors;
    if (
      email === "" &&
      password === "" &&
      passwordRepeat === "" &&
      displayName === "" &&
      Object.values(formData).every((data) => data !== "")
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, button: "" }));
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };
  const navigateHome = () => {
    navigate("/customer");
  };

  const sentInvite = () => {
    // console.log("Se fue la invite");
  };
  return (
    <StyledView>
      {loading && <Modal loading={true} title={"loading"} />}
      <Logo />
      <h6>{$isCustomerView ? "Crea tu cuenta" : "Agrega un encargado"}</h6>
      <InputsContainer>
        <p>{$isCustomerView ? `Ingresa tus datos` : "Ingresa sus datos"}</p>
        <Input
          type={"text"}
          label={"Nombre"}
          name={"displayName"}
          placeholder={"Ej. Juan Perez"}
          onChange={handleChange}
          onBlur={handleChange}
          error={errors.displayName}
          value={formData.displayName}
        />
        <Input
          type={"email"}
          label={"Correo"}
          name={"email"}
          placeholder={"ejemplo@mail.com"}
          onChange={handleChange}
          onBlur={handleChange}
          error={errors.email}
          value={formData.email}
        />
        {$isCustomerView && (
          <>
            <Input
              type={"password"}
              label={"Contraseña"}
              name={"password"}
              placeholder={"Al menos 8 caracteres..."}
              onChange={handleChange}
              onBlur={handleChange}
              error={errors.password}
              value={formData.password}
            />
            <Input
              type={"password"}
              label={"Confirmar contraseña"}
              name={"passwordRepeat"}
              placeholder={"Debe coincidir con el campo anterior"}
              onChange={handleChange}
              onBlur={handleChange}
              error={errors.passwordRepeat}
              value={formData.passwordRepeat}
            />
          </>
        )}
      </InputsContainer>
      <CTAsContainer
        text1={$isCustomerView ? "Crear cuenta" : "Enviar invitación"}
        onClick1={$isCustomerView ? login : sentInvite}
        buttonClass1={errors.button}
        text2={"Volver"}
        onClick2={handleGoBack}
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

const InputsContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
