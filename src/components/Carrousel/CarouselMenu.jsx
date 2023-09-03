import React from "react";
import styled from "styled-components";
import { Card } from "../Cards/Card";

const CarouselContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 51rem;
  width: 100vw;
  overflow-y: auto;
  p{
    padding-left:1rem;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
    color: inherit;
  }
`;
const CardContainer = styled.div`

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: auto;
  width:100vw;
  padding-left: 0.4rem;
  margin-top: 1rem;
`;

const menuCards = [
  {
    name: "Guacamole",
    shortDesc: "Plato con Guacamole y totopos.",
    time: 15,
    price: 55,
    img: "data:image/jpeg;base64,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",
  },
  {
    name: "Sirloin",
    shortDesc: "Porcion de sirloin de 450g.",
    time: 25,
    price: 85,
    img: "https://saboryestilo.com.mx/wp-content/uploads/elementor/thumbs/sirloin-cortes-de-carne-para-asar-1-pqgmiv7havp9lepaq14lwikrod9pb4547xnwrf09j4.jpg",
  },
  {
    name: "Chimichangas",
    shortDesc: "Chimichangas bien chipocludas.",
    time: 20,
    price: 60,
    img: "https://patijinich.com/es/wp-content/uploads/sites/3/2020/10/906-chimichanga-de-guisado-de-res-1024x699.jpg",
  },
  {
    name: "Quesadillas",
    shortDesc: "Pss con queso no?.",
    time: 20,
    price: 40,
    img: "https://i.blogs.es/2a00ea/quesadilla_vertical/1366_2000.jpg",
  },
  {
    name: "Enchiladas",
    shortDesc: "Plato con 4 enchiladas con salsa habanero",
    time: 20,
    price: 150,
    img: "https://cdn.pixabay.com/photo/2014/01/14/22/13/mexican-245240_1280.jpg",
  },
  {
    name: "Chiles rellenos",
    shortDesc: "Plato con 2 chiles rellenos",
    time: 15,
    price: 120,
    img: "https://media.istockphoto.com/id/1173087049/es/foto/pimientos-rellenos-de-carne-picada-con-verduras-al-estilo-mexicano-pimienta-b%C3%BAlgara-la-vista.webp?b=1&s=612x612&w=0&k=20&c=tZMx-3ia8Hg7JK2TC0Laa36-iEFnmRBaLyt5J3dNdW4=",
  },
];

export const MenuCarousel = () => {
  return (
    <CarouselContainer>
        <p>Mejicana</p>
      <CardContainer>
        {menuCards.map((card, index) => (
          <Card
            key={index}
            name={card.name}
            img={card.img}
            shortDesc={card.desc}
            time={card.time}
            price={card.price}
          />
        ))}
        ;
      </CardContainer>
    </CarouselContainer>
  );
};