import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { KitchenCard } from "../../components/Cards/KitchenCard";
import { getOrdersToKitchen } from "../../redux/actions/actions";
import { Modal } from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "../../components/Cards/OrderCard";

export const KitchenView = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.kitchenOrders);
  const [isDelayed, setIsDelayed] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.userLogged);

  // useEffect(() => {
  // 	if (userRole.role !== 'Manager' && userRole.role !== 'Admin') {
  // 		navigate('/')
  // 	}
  // }, [navigate])

  // console.log(userRole.role);

  const handleTimeOff = () => {
    setIsDelayed(true);
  };
  useEffect(() => {
    dispatch(getOrdersToKitchen());
  }, []);

  setTimeout(() => {
    setIsEmpty(true);
  }, 2500);

  const handleClose = () => {
    window.location.reload();
  };

  const ongoings = orders[0];
  const delayeds = orders[1];

  return (
    <>
      {orders.length === 0 ? (
        !isEmpty ? (
          <Modal isLoader={true} title={"Cargando órdenes"} />
        ) : (
          <Modal
            isLoader={false}
            title={"No hay órdenes"}
            text1={"Recargar órdenes"}
            onClick1={handleClose}
            onClose={handleClose}
          />
        )
      ) : (
        <StyledKitchenView>
          <Header>
            <Title>En Proceso</Title>
            <Title className={"delayed"}>Demoradas</Title>
          </Header>
          <ColumnsContainer>
		  <StyledColumn>
            
              {ongoings.map((order) => {
                return <OrderCard
						key={order.id}
						order={order}
						
					/>;
              })}
            
          </StyledColumn>
{/* <KitchenCard key={order.id} order={order} /><KitchenCard
                    key={order.id}
                    order={order}
                    onTimeOff={handleTimeOff}
                    time={order.time}
                  /> */}
          <StyledColumn>
            
              {delayeds.map((order) => {
                return (
					<OrderCard
						key={order.id}
						order={order}
						
					/>
                  
                );
              })}
           
          </StyledColumn>
		  </ColumnsContainer>
        </StyledKitchenView>
      )}
    </>
  );
};

const StyledKitchenView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  align-self: stretch;
  padding: 5rem 8rem;
  overflow-y: hidden ;
  height: 84vh;
`;

const Header = styled.div`

display: flex;
width: 100%;
height: 5rem;
padding: 2rem 0;
justify-content: space-around;
align-items: center;


`

const Title = styled.span`

font-size: 2rem;
font-weight: 600;

&&.delayed{
	color: ${(props) => props.theme.warning}
}

`

const ColumnsContainer = styled.div`

display: flex;
width: 100%;

`

const StyledColumn = styled.div`
  display: flex;
  width: 50%;
  height: 74vh;
  padding: 2rem 0;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  overflow-y: scroll;

  &&::-webkit-scrollbar {
    width: 5px;
    border-radius: 1px;
	
}


&&::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.primary};
	width: 10px;
}


&&::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.text}; 
    border-radius: 1rem;
}
`;

const StyledCardsContainer = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch; */
`;
