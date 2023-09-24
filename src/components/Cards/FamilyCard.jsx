import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import {
  toggleProductOrProductClassStatus,
  PRODUCT_CLASS,
} from "../../utils/toggleProductOrProductClassStatus";

export const FamilyCard = ({ id, image, name, onClick, enable }) => {
  const location = useLocation();
  const isManagerView =
    location.pathname === "/manager/" || location.pathname === "/manager";
  const isCustomerView =
    location.pathname === "/customer/" || location.pathname === "/customer";

  const [isChecked, setIsChecked] = useState(enable);
  const clickHandle = async () => {
    setIsChecked(!isChecked);
    await toggleProductOrProductClassStatus({
      id,
      isEnabled: !isChecked,
      type: PRODUCT_CLASS,
    });
  };
    // Verifica si la vista es de cliente y si la tarjeta está habilitada
    if (isCustomerView && !enable) {
      return null; // Si no está habilitada y es vista de cliente, no se renderiza
    }

  return (
    <StyledFamilyCard>
      <StyledOnClick onClick={onClick} $isNotManagerView={!isManagerView} />
      <StyledImg src={image} alt="image" />
      <StyledTitle>{name}</StyledTitle>
      {isManagerView && (
        <ToggleButton isChecked={isChecked} onChange={clickHandle} />
      )}
    </StyledFamilyCard>
  );
};

const StyledFamilyCard = styled.div`
  position: relative;
  display: flex;
  width: 6rem;
  height: auto;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  cursor: pointer;
  gap: 0.5rem;

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &:hover {
    transform: scale(1.02);
    transition: all ease-in-out 0.2s;
  }
`;

const StyledTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

const StyledImg = styled.img`
  height: 4.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  flex-shrink: 0;
  align-self: stretch;
  object-fit: cover;
`;

const StyledOnClick = styled.div`
  text-decoration: none;
  color: inherit;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  z-index: 1;

  ${(props) =>
    props.$isNotManagerView &&
    `
    height: 100%;
  `}
`;
