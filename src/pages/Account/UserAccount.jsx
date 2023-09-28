import { useNavigate } from "react-router-dom";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { passwordChange } from "../../redux/actions/actions";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { TextButton } from "../../components/TextButton/TextButton";

export const UserAccount = () => {
  const user = useSelector((state) => state.userLogged);

  const [confirmation, setConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    setConfirmation(true);
  };

  const confirmPasswordChange = () => {
    dispatch(passwordChange({ email: user.email }));
  };

  const navigateOrders = () => {
    navigate("/customer/orders/");
  };

  // var nameParts = user.name.split(" ");

  // for (var i = 0; i < nameParts.length; i++) {
  // 	nameParts[i] = nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
  // }

  // var capitalizedFullName = nameParts.join(" ");

  return (
    <StyledView>
      <h1>Hola, {user.name}</h1>

      <TextButton text={"Ver mís órdenes"} onClick={navigateOrders} />
      <TextButton text={"Cambiar contraseña"} onClick={handlePasswordChange} />

      {confirmation && (
        <Modal
          onClose={() => {
            setConfirmation(false);
          }}
          title={"Cambio de contraseña."}
          msg="Se le enviará un correo para cambiarla."
          text1={"Solicitar correo."}
          onClick1={() => {
            setConfirmation(false);
            confirmPasswordChange;
            setSuccessMessage(true);
          }}
        />
      )}
      {successMessage && (
        <Modal
          onClose={() => {
            setSuccessMessage(false);
          }}
          title={"Correo enviado"}
          msg="Revisa tus correos nuevos para actualizar tu contraseña."
          text1={"Aceptar"}
          onClick1={() => {
            setSuccessMessage(false);
          }}
        />
      )}
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 12vh 1rem 25vh 1rem;
  transition: width 0.3s ease-in-out;
  gap: 2rem;
`;
