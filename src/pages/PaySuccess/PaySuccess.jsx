/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";

export const PaySuccess = ({ currentTheme }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("basket");
    localStorage.removeItem("takeAway");
    localStorage.removeItem("notes");
    setTimeout(() => {
      navigate("/customer/orders/");
    }, 3000);
  }, []);

  return (
    <StyledView>
      <Modal
        isTimer
        currentTheme={currentTheme}
        onClose={() => navigate("/customer/orders/")}
        title={"Recibimos tu pago"}
        msg={"Te avisaremos cuando tu pedido este listo."}
      />
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  padding: 10vh 4vw 15vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 2rem;

  @media (min-width: 800px) {
    width: 30rem;
    padding: 15vh 1rem 5vh;
  }
`;
