import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { ToggleButton } from "../ToggleButton/ToggleButton";


export const FamilyCard = ({ id, img, name, onClick }) => {
  const location = useLocation();
  const isManagerView = (location.pathname === "/manager/" || location.pathname === "/manager");

  const [isChecked, setIsChecked] = useState(true);
  const clickHandle = () => {
    setIsChecked(!isChecked);
  };


  return (
    <StyledFamilyCard onClick={onClick}>
      <StyledImg src={img} alt="image" />
      <StyledTitle>{name}</StyledTitle>
      {isManagerView && (
        <ToggleButton isChecked={isChecked} onChange={clickHandle} />
      )}
    </StyledFamilyCard>
  );
};

const StyledFamilyCard = styled.div`
  display: flex;
  width: 6rem;
  height: auto;
  padding: 1rem;
  flex-direction: column;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  cursor: pointer;
  gap: .5rem;

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &:hover {
    transform: scale(1.02);
    transition: all ease-in-out .2s;
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
