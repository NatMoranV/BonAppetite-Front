import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { Input } from "../../components/Input/Input";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validations";
import { useState } from "react";
import axios from "axios";

export const UserRecovery = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    button: "disabled",
  });
  const [helper, setHelper] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value) ? "" : "Por favor verifica tu correo.";
      setEmail(value);
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleRecovery = async () => {
    try {
      const response = await axios.put(
        "https://resto-p4fa.onrender.com/users/put",
        {
          email: `${email}`,
        }
      );
      console.log(response);
      setHelper(
        <p style={{ color: "green" }}>
          {
            "Te llegará un correo con las indicaciones para recuperar tu cuenta."
          }
        </p>
      );
    } catch (error) {
      error.response.data.error ==
      "There is no user record corresponding to the provided identifier."
        ? setHelper(
            <p style={{ color: "red" }}>
              {"No existe un usuario con ese correo"}
            </p>
          )
        : setHelper(
            <p style={{ color: "red" }}>{error.response.data.error}</p>
          );
      console.error(error.response.data.error);
    }
    //navigate("/");
  };

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   const help = validateEmail(value) ? (
  //     "Si tenemos una cuenta registrada con esa dirección, te llegará un correo con las indicaciones para recuperar tu cuenta."
  //   ) : (
  //     <p style={{ color: "red" }}>{"Por favor verifica tu correo."}</p>
  //   );
  //   setHelper(help);
  //   setEmail(value);
  // };
  const handleGoBack = () => {
    window.history.back();
  };

  const enableButton = errors.email === "" && email !== "";

  return (
    <StyledView>
      <Logo />
      <h6>Recupera tu cuenta</h6>

      <Input
        type={"email"}
        label={"Correo"}
        name={"email"}
        placeholder={"ejemplo@mail.com"}
        error={errors.email}
        helper={helper}
        onChange={handleChange}
        isHelperOrError={true}
      />

      <Info>
        Si tenemos una cuenta registrada con esa dirección, te llegará un correo
        con las indicaciones para recuperar tu información.
      </Info>

      <CTAsContainer
        text1={"Recuperar cuenta"}
        onClick1={handleRecovery}
        buttonClass1={enableButton ? "" : "disabled"}
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
  gap: 2rem;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 0;
  }
`;

const Info = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;
