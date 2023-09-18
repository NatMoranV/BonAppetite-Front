import styled from "styled-components";
import { Card } from "./Card";
import { Divider } from "../Divider/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../Dropdown/StyledDropdown";
import { useState } from "react";

const status = [
  "Pagar",
  "En_preparacion",
  "Para_entregar",
  "Entregado",
  "Cancelado",
];

export const OrderCard = ({ order }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
  };

  return (
    <StyledCard>
      <ClockIcon icon={faClock} />
      <Order>Orden {order.id}</Order>
      <Divider />
      {order.OrderDetails.map((card) => (
        <Card
          key={card.id}
          id={card.Product.id}
          name={card.Product.name}
          img={card.Product.image}
          shortDesc={card.Product.description}
          time={card.Product.time}
          qualification={card.Product.qualification}
          stock={card.Product.stock}
          amount={card.Product.amount}
        />
      ))}
      <Divider />

      {order.take_away && (
        <>
          <TakeHome>Para llevar a casa</TakeHome>
          <Divider />
        </>
      )}
      {order.notes && (
        <>
          <span>{order.notes}</span>
          <Divider />
        </>
      )}
      <Dropdown
        name={"status"}
        id={"status"}
        array={status}
        selectedValue={currentStatus}
        onChange={handleChange}
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  min-width: 18rem;
  padding: 2rem 1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  transition: all 0.2s ease-in-out;

  /* @media (max-width: 650px) {
    width: 60rem;
  } */
`;

const ClockIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
`;

const Order = styled.span`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
`;

const TakeHome = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;
