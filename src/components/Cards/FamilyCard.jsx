import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import {
  toggleProductOrProductClassStatus,
  PRODUCT_CLASS,
} from "../../utils/toggleProductOrProductClassStatus";
import { Modal } from "../Modal/Modal";

import { useNavigate } from "react-router-dom";

export const FamilyCard = ({
  id,
  image,
  name,
  onClick,
  enable,
  hasProducts,
}) => {
  const location = useLocation();
  const isManagerView =
    location.pathname === "/manager/" || location.pathname === "/manager";

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(enable);
  const clickHandle = async () => {
    setIsChecked(!isChecked);
    await toggleProductOrProductClassStatus({
      id,
      isEnabled: !isChecked,
      type: PRODUCT_CLASS,
    });
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
          title={"Asigna productos"}
          msg={"No la puedes activar porque no tiene productos asignados."}
          onClick1={() => {
            navigate("/manager/edit/");
          }}
          text1={"Crear nuevo producto"}
          onClick2={() => {
            setShowModal(false);
          }}
          text2={"Cancelar"}
        />
      )}
      <StyledFamilyCard>
        <StyledOnClick onClick={onClick} $isNotManagerView={!isManagerView} />
        <InfoContainer>
          <StyledImg src={image} alt="image" />
          <StyledTitle>{name}</StyledTitle>
        </InfoContainer>
        {isManagerView && (
          <ToggleButton
            isChecked={isChecked}
            onChange={ clickHandle }
          />
        )}
      </StyledFamilyCard>
    </>
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
  justify-content: space-between;
  gap: 0.5rem;

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &:hover {
    transform: scale(1.02);
    transition: all ease-in-out 0.2s;
  }
`;

const InfoContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledImg = styled.img`
  height: 4.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  flex-shrink: 0;
  align-self: stretch;
  object-fit: cover;
`;

const StyledTitle = styled.span`
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

const StyledOnClick = styled.div`
  text-decoration: none;
  color: inherit;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 75%;
  z-index: 1;

  ${(props) =>
    props.$isNotManagerView &&
    `
    height: 100%;
  `}
`;
