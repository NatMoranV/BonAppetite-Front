import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";



import React, { useState } from 'react';
// Import the action creator



export const RatingSelector = ({ onRatingChange, id }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    const newRating = starIndex + 1;
    setRating(newRating);


  const stars = Array.from({ length: 5 }, (_, index) => (
    <StarIcon
      key={index}
      icon={index < rating ? solidStar : regularStar}
      onClick={() => handleStarClick(index)}
      style={{ cursor: 'pointer' }}
    />
  ));

  return <RatingSelectorContainer>{stars}</RatingSelectorContainer>;
};
}


const RatingSelectorContainer = styled.div`

width: 100%;
display: flex;
gap: 1rem;
justify-content: center;
font-size: 2.5rem;

@media (max-width: 650px) {
    justify-content: space-evenly;
}


`

const StarIcon = styled(FontAwesomeIcon)`

&:hover {
  transform: scale(1.2)
}

transition: all ease-in-out 0.3s;

`