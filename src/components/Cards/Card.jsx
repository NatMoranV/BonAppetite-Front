/* eslint-disable react/prop-types */
import { faEdit, faStar } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Adder } from "../Adder/Adder";

export const Card = ({
  id,
  image,
  name,
  shortDesc,
  price,
  time,
  amount,
  onRemove,
  onAdd,
  qualification,
  total
}) => {
  const [isChecked, setIsChecked] = useState(true);

  const location = useLocation().pathname;

  const isCustomerView = location.startsWith("/customer/");
  const isManagerView = location.startsWith("/manager/");
  const isCustomerOrders = location === "/customer/orders/";

  const isHome = location === "/customer/" || location === "/manager/";

  const isManagerOrders = location === "/manager/orders/";
  const isBasket = location === "/customer/basket/";

  const keywords = ["orders"];
  const includesKeyword = keywords.some((keyword) =>
    location.includes(keyword)
  );

  const clickHandle = () => {
    setIsChecked(!isChecked);
  };

  console.log(total);

  return (
    <StyledCard $isNotHome={!isHome}>
      {isHome && <StyledNavLink to={`detail/${id}/`} />}

      {!isManagerOrders && <StyledImg src={image} alt="image" />}
      <InfoContainer $isBasket={isBasket}>
        <StyledName>{name}</StyledName>
        {!isManagerOrders ||
          isCustomerOrders ?
          (isBasket ? (
            <>
              <StyledDesc>{shortDesc}</StyledDesc>
              <Test $isBasket={isBasket}>
                <StyledPrice $isNotHome={!isHome}>
                  ${total}
                </StyledPrice>
                <Adder
                  isBasket={isBasket}
                  id={id}
                  image={image}
                  name={name}
                  shortDesc={shortDesc}
                  time={time}
                  price={price}
                  onRemove={onRemove}
                  onAdd={onAdd}
                />
              </Test>
            </>
          ) : (
            <>
              <StyledDesc>{shortDesc}</StyledDesc>
              <StyledTime>{time} min</StyledTime>
              <Test $isBasket={isBasket} $isCustomerView={isCustomerView}>
                <StyledPrice $isNotHome={!isHome}>${price}</StyledPrice>
                {isCustomerView && (
                  <Adder
                    isBasket={isBasket}
                    id={id}
                    image={image}
                    name={name}
                    shortDesc={shortDesc}
                    time={time}
                    price={price}
                    onRemove={onRemove}
                    onAdd={onAdd}
                  />
                )}
              </Test>
            </>
          )) : null}
      </InfoContainer>

      {isHome || isBasket ? (
        <ActionsContainer
          $isBasket={isBasket}
          $isCustomerView={isCustomerView}
          $isManagerView={isManagerView}
        >
          {isCustomerView && (
            <>
              {!isBasket && (
                <RatingContainer>
                  <FontAwesomeIcon icon={faStar} />
                  <StyledRating>{qualification}</StyledRating>
                </RatingContainer>
              )}
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
  gap: 0.5rem;
  justify-content: space-between;

  ${(props) =>
    props.$isBasket &&
    `
    gap: 1rem;
  `}
`;

const StyledName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 0;
`;

const StyledDesc = styled.p`
  line-height: 1rem;
  font-size: 1rem;
  padding-bottom: 0;
  width: 90%;
`;

const StyledTime = styled.p`
  line-height: 1rem;
  font-size: 1rem;
`;

const StyledPrice = styled.h6`
  margin-top: 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  padding: 0;
  width: 10%;
  height: 80%;
  position: absolute;
  right: 1rem;
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
  z-index: 2;
`;

const Test = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 70%;

  ${(props) =>
    props.$isBasket &&
    `
    width: 100%;
    flex-direction: row-reverse;
  `}
  ${(props) =>
    props.$isCustomerView &&
    `
    width: 100%;
  `}
`;
