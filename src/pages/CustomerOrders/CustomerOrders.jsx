import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { Modal } from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/Cards/Card";
import { getOrderByEmail } from "../../redux/actions/actions";

export const CustomerOrders = () => {
  const [loading, setLoading] = useState(false);
  const { referrer } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogged)
  const userOrders = useSelector((state) => state.foundedOrders)
  const dispatch = useDispatch()
  const navigateHome = () => {
    setLoading(false);
    navigate("/customer");
  };
console.log(user.id);
console.log(userOrders);
  useEffect(() => {
    dispatch(getOrderByEmail(user.id))
    if (referrer === 'http://localhost:5173/customer/basket') {
      setLoading(true);
      const timer = setTimeout(()=>{
        setLoading(false)
      },3000)
      return () => clearTimeout(timer)
    }
  }, [referrer, dispatch, user]);
  
  return (
    <StyledView>
      {loading && (
        <Modal
          isLoader={loading}
          title={"Procesamos tu pago!"}
          msg={"Cuando este listo te avisaremos."}
        />
      )}
       <ResumeContainer>
        {userOrders.map((card) => (
          <Card
            key={card.id}
            name={card.status}
            price={card.total}
          />
        ))}
        

     
      </ResumeContainer>

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

const ResumeContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: end;
`;
