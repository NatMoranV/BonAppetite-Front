import React from "react";
import styled from "styled-components";
import { FamilyCard } from "../Familys/FamilyCard";
import { menu } from "../../assets/mockedMenu";

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  height: 9rem;
  width: 100vw;
  overflow-x: auto;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  width: auto;
`;
export const FamiliesCarousel = () => {
  return (
    <CarouselContainer>
      <CardContainer>
        {menu.map((card, index) => (
          <FamilyCard
            key={index}
            name={card.familyName}
            img={card.familyImage}
          />
        ))}
        ;
      </CardContainer>
    </CarouselContainer>
  );
};
