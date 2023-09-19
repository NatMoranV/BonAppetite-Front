import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";


export const RatingSelector = () => {

    const [rating, setRating] = useState(0);

    const handleStarClick = (starIndex) => {
      setRating(starIndex + 1);
    };

    const stars = Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={index < rating ? solidStar : regularStar}
          onClick={() => handleStarClick(index)}
          style={{ cursor: 'pointer' }}
        />
      ));

    return (

        <RatingSelectorContainer>
         {stars}
        </RatingSelectorContainer>

    )
}

const RatingSelectorContainer = styled.div`

width: 100%;
display: flex;
gap: 1rem;
justify-content: center;
padding: 1rem 0;
font-size: 2.5rem;

@media (max-width: 650px) {
    justify-content: space-evenly;
}


`