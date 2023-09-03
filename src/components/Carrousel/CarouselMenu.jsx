import React from "react";
import styled from "styled-components";
import { menu } from "../../assets/mockedMenu";
import { Card } from "../Cards/Card";

export const MenuCarousel = () => {
  return (
    <CarouselContainer>
      {menu.map((family) => (
        <FamiliesContainer key={family.id}>
          <h5 key={family.id}>{family.familyName}</h5>
          <CardsGrid>
          {family.recipes.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              img={card.image}
              shortDesc={card.desc}
              time={card.time}
              price={card.price}
            />
          ))}</CardsGrid>
        </FamiliesContainer>
      ))}
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 51rem;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;

`;
const FamiliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  box-sizing: border-box;
  margin: 2rem 0;
`;

const CardsGrid = styled.div`
  margin: 1rem 0;
  display: grid;
  gap: 1rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));

`