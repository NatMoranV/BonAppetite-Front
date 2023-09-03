import React from "react";
import { StyledFamilyCard } from "./StyledFamilyCard";

export const FamilyCard = (props) => {
  const { id, img, name } = props;
  return (
    <StyledFamilyCard>
      <img src={img} alt="image" />
      <h6>{name}</h6>
    </StyledFamilyCard>
  );
};
