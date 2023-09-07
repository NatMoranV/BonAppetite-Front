/* eslint-disable react/prop-types */

import styled from "styled-components";

import { useSelector } from "react-redux";
import { FamilyCard } from "../Cards/FamilyCard";

export const FamiliesCarousel = ({ onClick }) => {
  const menu = useSelector((state) => state.master);

  return (
    <CardContainer>
      {menu?.map((card) => (
        <FamilyCard
          onClick={onClick}
          key={card.id}
          name={card.familyName}
          img={card.familyImage}
        />
      ))}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: fixed;
  top: 4rem;
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
