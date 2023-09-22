import styled from "styled-components";
import { Divider } from "../Divider/Divider";
import { useLocation } from "react-router-dom";
import { RatingSelector } from "../Rating/Rating";
import { useState } from "react";
import { Input } from "../Input/Input";

export const DetailCard = ({ image, name, description, prepTime, price, updateRating, }) => {
  const location = useLocation().pathname;
  const isReview = location === "/review/";

  const [rating, setRating] = useState(0);

  // Función para actualizar el rating cuando el usuario hace clic en una estrella
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  console.log(description);
  return (
    <StyledDetailCard $isReview={isReview}>
      <StyledImg src={image} />
      <StyledName>{name}</StyledName>
      {!isReview && <StyledDesc>{description}</StyledDesc>}
      {!isReview && <StyledTime>Preparación: {prepTime} minutos</StyledTime>}
      {isReview && (
        <RatingSelector
          rating={rating}
          onRatingChange={handleRatingChange}
		  updateRating={updateRating}
        />
      )}
	  {isReview && <Input placeholder={"¿Algún comentario?"}></Input>}
      {!isReview && <StyledPrice>${price}</StyledPrice>}
    </StyledDetailCard>
  );
};

const StyledDetailCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  position: relative;
  transition: all 0.2s ease-in-out;
  gap: 2rem;

  ${(props) =>
    props.$isReview &&
    `
&:hover {
  transform: scale(1.02);
}
`}
`;

const StyledImg = styled.img`
  height: 15rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  box-sizing: border-box;
`;

const StyledName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StyledDesc = styled.p`
  line-height: 1.2rem;
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const StyledTime = styled.p`
  line-height: 1.2rem;
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const StyledPrice = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0;
`;
