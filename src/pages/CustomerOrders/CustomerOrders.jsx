import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { Modal } from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../../components/Cards/Card";

export const CustomerOrders = () => {
  const [loading, setLoading] = useState(false);
  const { referrer } = useParams();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.userLogged)
  const navigateHome = () => {
    setLoading(false);
    navigate("/customer");
  };

  useEffect(() => {
    if (referrer === 'http://localhost:5173/customer/basket') {
      setLoading(true);
      const timer = setTimeout(()=>{
        setLoading(false)
      },3000)
      return () => clearTimeout(timer)
    }
  }, [referrer]);
  
  return (
    <StyledView>
      {loading && (
        <Modal
          isLoader={loading}
          title={"Procesamos tu pago!"}
          msg={"Cuando este listo te avisaremos."}
        />
      )}
      <Card />

      <CTAsContainer text1={"Volver"} onClick1={navigateHome} />
    </StyledView>
  );
};

const StyledView = styled.div`
  position: relative;
  top: 12rem;
  display: flex;
  gap: 2rem;
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
