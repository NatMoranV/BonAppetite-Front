import React from "react";
import { Card } from "./Card";


const array = [{
  id,
  image,
  name,
  shortDesc,
}]

import { styled } from "styled-components";


export const CardsGrid = () => {
  

  return (
    <div className="grid-container">
      <StyledCardsGrid>
        {array.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                img={item.image}
                name={item.name}
                shortDesc={item.shortDesc}
              />
            ))
        }
      </StyledCardsGrid>
    </div>
  );
};



const StyledCardsGrid = styled.div`
  margin: 3rem 0;
  display: grid;
  gap: 2rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;