/* eslint-disable react/prop-types */
import { faEdit, faStar } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Adder from "../Adder/Adder";

export const Card = ({
  id,
  image,
  name,
  shortDesc,
  price,
  time,
  qualification,
}) => {
  const [isChecked, setIsChecked] = useState(true);

  const location = useLocation().pathname;

  const isCustomerView = location.startsWith("/customer/");
  const isManagerView = location.startsWith("/manager/");
  const isCustomerOrders = location === "/customer/orders/";

  const isNotHome = location !== "/customer/" && location !== "/manager/";

  const isManagerOrders = location === "/manager/orders/";

  const keywords = ["orders"];
  const includesKeyword = keywords.some((keyword) =>
    location.includes(keyword)
  );

  const clickHandle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledCard $isNotHome={isNotHome}>
      {!isNotHome && <StyledNavLink to={`detail/${id}/`} />}

      {!isManagerOrders && <StyledImg src={image} alt="image" />}
      <InfoContainer>
        <StyledName>{name}</StyledName>
        {!isManagerOrders && (
          isCustomerOrders ? (
          <>
            <StyledDesc>{shortDesc}</StyledDesc>
            <StyledTime>{time} min</StyledTime>
            <StyledPrice $isNotHome={isNotHome}>${price}</StyledPrice>
          </>
          ) : (
            <>
            <StyledDesc>{shortDesc}</StyledDesc>
            <StyledPrice $isNotHome={isNotHome}>${price}</StyledPrice>
          </>
          )
        )}
      </InfoContainer>

      {!isNotHome ? (
        <ActionsContainer
          $isCustomerView={isCustomerView}
          $isManagerView={isManagerView}
        >
          {isCustomerView && (
            <>
              <RatingContainer>
                <FontAwesomeIcon icon={faStar} />
                <StyledRating>{qualification}</StyledRating>
              </RatingContainer>
              <Adder
                id={id}
                image={image}
                name={name}
                shortDesc={shortDesc}
                time={time}
                price={price}
              />
            </>
          )}
          {isManagerView && (
            <>
              <NavLink to={`edit/${id}`}>
                <CircleButton icon={faEdit} />
              </NavLink>
              <ToggleButton isChecked={isChecked} onChange={clickHandle} />
            </>
          )}
        </ActionsContainer>
      ) : null}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  position: relative;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  ${(props) =>
    props.$isNotHome &&
    `
    box-shadow: none;
    padding: 0;
    
    &:hover {
      transform: none;
    }
    &:active {
      box-shadow: none;
    }
  `}
`;

const StyledImg = styled.img`
  width: 5rem;
  height: 100%;
  flex-shrink: 0;
  align-self: stretch;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

const InfoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
`;

const StyledDesc = styled.p`
  line-height: 1rem;
  font-size: 1rem;
  padding-bottom: 0.5rem;
`;

const StyledTime = styled.p`
  line-height: 1rem;
  font-size: 1rem;
`;

const StyledPrice = styled.h6`
  margin-top: 0.5rem;

  ${(props) =>
    props.$isNotHome &&
    `
    text-align: end;
  `}
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  padding: 0;
  width: 10%;
  height: 100%;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRating = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  position: absolute;
  top: 0;
  left: 0;
  width: 65%;
  height: 100%;
  z-index: 1;
`;
