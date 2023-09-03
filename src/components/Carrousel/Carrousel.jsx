import React from "react";
import styled from "styled-components";

import { menu } from "../../assets/mockedMenu";
import { FamilyCard } from "../Cards/FamilyCard";

export const FamiliesCarousel = ({onClick}) => {
  return (

      <CardContainer>
        {menu.map((card, index) => (
          <FamilyCard
            onClick={onClick}
            key={index}
            name={card.familyName}
            img={card.familyImage}
          />
        ))}
      </CardContainer>

  );
};

const CardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  align-items: center;
  height: 9rem;
  box-sizing: border-box;
  overflow-x: auto;
  padding-right: 1rem;
  margin-bottom: 1rem;
`;