import React from "react";
import { NavLink } from "react-router-dom";

import { styled } from "styled-components";

export const Card = (props) => {
  const { id, img, name, shortDesc } = props;
  return (

    <NavLink to={`/detail/${id}`}>
      <StyledCard>
        <img src={img} alt="image" />
        <h6>{name}</h6>
        <p>{shortDesc}</p>

      </StyledCard>
    </NavLink>
  );
};




const StyledCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 1rem 2rem 1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};

  a {
    text-decoration: none;
  }

  img {
    height: 10rem;
    flex-shrink: 0;
    align-self: stretch;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;
