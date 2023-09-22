import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";



import React, { useState } from 'react';
import { connect } from 'react-redux'; // Import connect
import { updateQualification } from "../../redux/actions/actions";
// Import the action creator



export const RatingSelector = ({ onRatingChange, id }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    const newRating = starIndex + 1;
    setRating(newRating);

    // Dispatch action to update qualification
    updateQualification(id, newRating); // Dispatch the action with the product id and new rating
    onRatingChange(newRating);
  };

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

// Connect the component to the Redux store
export default connect(null, { updateQualification })(RatingSelector);


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