import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

export const DashboardButton = ({ onClick, text, isActive, type, icon, hovered }) => {


  return (
    <StyledDashboardButton
      $isHovered={hovered}
      onClick={onClick}
      className={isActive ? "active" : ""}
      type={type}
    >
      <ThisIcon icon={icon} $isHovered={hovered} />
      <Text $isHovered={hovered}>{text}</Text>
    </StyledDashboardButton>
  );
};

const ThisIcon = styled(FontAwesomeIcon)`
  transition: all .3s ease-out;
  transition-delay: 1s;
  margin-left: 0.55rem;
  ${(props) =>
    props.$isHovered &&
    `
    margin-left: 1rem;

  `}
`;

const StyledDashboardButton = styled.button`
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  gap: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 3rem;
  position: relative;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  transition: all .3s ease-out;
  transition-delay: .8s;

  ${(props) =>
    props.$isHovered &&
    `
  
    width: 11.5rem;

  `}

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &.active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  white-space: nowrap;
  position: absolute;
  left: -8rem;
  opacity: 0;
  transition: all 0.5s ease-out;
  
  transition-delay: .8s;

  ${(props) =>
    props.$isHovered &&
    `
  opacity: 1;
  left: 2.5rem;

  `}
`;

// const SideMenuButton = styled(TextButton)`
//   width: 2rem;
//   height: 2rem;
//   display: flex;
//   padding: 0 0.6rem;
//   position: relative;

//   transition: all 0.5s ease-in-out;
//   transition-delay: .8s;

//   &.active {
//     background-color: red;
//   }

//   && span {
//     transition: all 0.5s ease-in-out;
//     transition-delay: 1s;
//     position: absolute;
//     left: -6rem;
//     opacity: 0;
//   }
// `;
