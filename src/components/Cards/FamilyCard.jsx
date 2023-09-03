import React from "react";
import styled from "styled-components";

export const FamilyCard = ({ id, img, name, onClick }) => {
  return (
    <StyledFamilyCard onClick={onClick}>
      <img src={img} alt="image" />
      <span>{name}</span>
    </StyledFamilyCard>
  );
};


const StyledFamilyCard = styled.div`
  display: flex;
  width: 6rem;
  height: 6.5rem;
  padding: 0.5rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  cursor: pointer;
  
  span {
    font-size: 1rem;
    font-weight: 600;
  }

  img {
    height: 4.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    flex-shrink: 0;
    align-self: stretch;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;