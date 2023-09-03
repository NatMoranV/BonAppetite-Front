import React from "react";
import styled from "styled-components";
import { FamilyCard } from "../Familys/FamilyCard";

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
  const familyCards = [
    {
      name: "Todos",
      imagen:
        "https://cdn.pixabay.com/photo/2015/11/19/10/38/food-1050813_1280.jpg",
    },
    {
      name: "Mejicana",
      imagen:
        "https://media.istockphoto.com/id/1341928493/es/foto/tacos-mexicanos-de-composici%C3%B3n-plana-con-carnitas-de-cerdo-cochinita-pibil-cebolla-y-chile.jpg?s=612x612&w=0&k=20&c=42hLsjfjCrBhmWOTIY5sVzUkzgI8kOt6A9T3oqTNHKE=",
    },
    {
      name: "Burgers",
      imagen:
        "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Carnes",
      imagen:
        "https://media.istockphoto.com/id/1222021640/es/foto/bistec-cocinando-en-llamas-con-verduras.jpg?s=612x612&w=0&k=20&c=s0FHpMwnh4MnJS6239t8azCx0LDuao5EZXNOGnQGgus=",
    },
    {
      name: "Salads",
      imagen:
        "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Postres",
      imagen:
        "https://images.pexels.com/photos/2205270/pexels-photo-2205270.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      name: "Bebidas",
      imagen:
        "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Cafetería",
      imagen:
        "https://images.pexels.com/photos/948358/pexels-photo-948358.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <CarouselContainer>
      <CardContainer>
        {familyCards.map((card, index) => (
          <FamilyCard key={index} name={card.name} img={card.imagen} />
        ))}
        ;
      </CardContainer>
    </CarouselContainer>
  );
};
