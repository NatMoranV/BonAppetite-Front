import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { ToggleButton } from "../ToggleButton/ToggleButton";

export const FamilyCard = ({ id, img, name, onClick }) => {
  const location = useLocation();
  const isManagerView =
    location.pathname === "/manager/" || location.pathname === "/manager";

  const [isChecked, setIsChecked] = useState(true);
  const clickHandle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledFamilyCard>
      <StyledOnClick onClick={onClick} $isNotManagerView={!isManagerView} />
      <StyledImg src={img} alt="image" />
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
