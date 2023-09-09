import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const Registry = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const location = useLocation();
  const $isCustomerView = location.pathname.startsWith("/customer");

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };

  const sentInvite = () => {
    console.log("Se fue la invite");
  };
  return (
    <StyledView>
      <Logo />
      <h6>{$isCustomerView ? "Crea tu cuenta" : "Agrega un encargado"}</h6>
      <InputsContainer>
        <p>{$isCustomerView ? `Ingresa tus datos` : "Ingresa sus datos"}</p>
        <StyledInput
          type={"text"}
          label={"Nombre"}
          name={"name"}
          placeholder={"Ej. Juan Perez"}
          onChange={(e) =>
            setFormData({ ...formData, displayName: e.target.value })
          }
          value={formData.displayName}
        />
        <StyledInput
          type={"email"}
          label={"Correo"}
          name={"email"}
          placeholder={"ejemplo@mail.com"}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        {$isCustomerView && (
          <>
            <StyledInput
              type={"password"}
              label={"Contraseña"}
              name={"password"}
              placeholder={"8 digitos"}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
            <StyledInput
              type={"password"}
              label={"Confirmar contraseña"}
              name={"password"}
              placeholder={"Debe coincidir con el campo anterior"}
              value={formData.password}
            />
          </>
        )}
      </InputsContainer>
      <CTAsContainer
        text1={$isCustomerView ? "Crear cuenta" : "Enviar invitación"}
        onClick1={
          $isCustomerView
            ? async () => {
                const response = await axios.post(
                  `${import.meta.env.VITE_URL_BACK}/users/create`,
                  formData
                );
                console.log(response.data);
                navigateHome();
              }
            : sentInvite
        }
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
