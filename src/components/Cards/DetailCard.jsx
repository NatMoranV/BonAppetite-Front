import styled from "styled-components";
import { Divider } from "../Divider/Divider";
import { useLocation } from "react-router-dom";
import { RatingSelector } from "../Rating/Rating";
import { useState } from "react";
import { Input } from "../Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux'; // Import connect
import { updateComment } from "../../redux/actions/actions";


export const DetailCard = ({
  image,
  name,
  description,
  prepTime,
  price,
  qualification,
  inputPlaceholder,
  inputName,
  onSharedDataChange,
  onUpdateComment,
  onUpdateQualification,
  data,
}) => {
  const location = useLocation().pathname;
  const isReview = location === "/sandbox/";

  // Define the updateSharedData function
  const updateSharedData = () => {
    const updatedData = data?.map((item) => {
      if (item.id === inputName) {
        return {
          ...item,
          qualification: newQualification,
          comment: inputValue,
        };
      }
      return item;
    });

    // onSharedDataChange(updatedData);
  };

  const [inputValue, setInputValue] = useState('');
  const [newQualification, setNewQualification] = useState(0);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    onUpdateComment(inputName, newValue);
    console.log("New comment value:", newValue);

    // Dispatch action to update comment
    // onUpdateComment(inputName, newValue);
    updateSharedData();
  };

  const handleRatingChange = (newRating) => {
    setNewQualification(newRating);
    // onUpdateQualification(inputName, newRating);
    // Dispatch action to update qualification
    // onUpdateQualification(inputName, newRating);
    updateSharedData();
  };

  return (
    <StyledDetailCard $isReview={isReview}>
      <StyledImg src={image} />
      <NameContainer $isReview={isReview}>
        <StyledName>{name}</StyledName>
        {!isReview && (
          <RatingContainer>
            <StyledRating>{qualification}</StyledRating>
            <StarIcon icon={faStar} />
          </RatingContainer>
        )}
      </NameContainer>
      {!isReview && <StyledDesc>{description}</StyledDesc>}
      {!isReview && <StyledTime>Preparación: {prepTime} minutos</StyledTime>}
      {isReview && <RatingSelector onRatingChange={handleRatingChange} />}
      {isReview && (
        <Input
          name={inputName}
          placeholder={inputPlaceholder}
          onValueChange={handleInputChange}
        />
      )}
      {!isReview && <StyledPrice>${price}</StyledPrice>}
    </StyledDetailCard>
  );
};


export default connect(null, { updateComment })(DetailCard);

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

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) =>
    props.$isReview &&
    `
  justify-content: center;
  `}
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StyledRating = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StarIcon = styled(FontAwesomeIcon)`
  font-size: 1.1rem;
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
