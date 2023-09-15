import { faEdit, faStar } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Adder } from "../Adder/Adder";

export const Card = ({ id, img, name, shortDesc, price, time, qualification, }) => {

  console.log(qualification);

  const [isChecked, setIsChecked] = useState(true);
  const [isInBasket, setIsInBasket] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const location = useLocation();
  const isCustomerView =
    location.pathname === "/customer" || location.pathname === "/customer/";
  const isManagerView =
    location.pathname === "/manager" || location.pathname === "/manager/";
  const isCustomerBasket = location.pathname === "/customer/basket";
  const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];

  useEffect(() => {
    const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
    const cardInBasket = existingBasket.some(
      (item) => item.id === id && item.amount > 0
    );
    setIsInBasket(cardInBasket);

    const itemCount = existingBasket.reduce((total, item) => {
      if (item.id === id) {
        return total + item.amount;
      }
      return total;
    }, 0);

    setItemCount(itemCount);
  }, [id]);

  const addCard = () => {
    const cardData = {
      id,
      img,
      name,
      shortDesc,
      time,
      price,
      amount: 1,
    };

    let existing = false;
    const updatedBasket = existingBasket.map((element) => {
      if (element.id === cardData.id) {
        element.amount++;
        existing = true;
      }
      return element;
    });

    if (!existing) {
      updatedBasket.push(cardData);
    }

    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    setIsInBasket(true);

    const itemCount = updatedBasket.reduce((total, item) => {
      if (item.id === id) {
        return total + item.amount;
      }
      return total;
    }, 0);

    setItemCount(itemCount);
  };

  const removeCard = () => {
    const updatedBasket = existingBasket
      .map((item) => {
        if (item.id === id) {
          if (item.amount > 1) {
            item.amount--;
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean);

    localStorage.setItem("basket", JSON.stringify(updatedBasket));

    const cardInBasket = updatedBasket.some(
      (item) => item.id === id && item.amount > 0
    );
    setIsInBasket(cardInBasket);

    const itemCount = updatedBasket.reduce((total, item) => {
      if (item.id === id) {
        return total + item.amount;
      }
      return total;
    }, 0);

    setItemCount(itemCount);
  };

  const clickHandle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledCard $isCustomerBasket={isCustomerBasket}>
      {!isCustomerBasket && <StyledNavLink to={`detail/${id}`} />}
      <StyledImg src={img} alt="image" />
      <InfoContainer>
        <StyledName>{name}</StyledName>
        <StyledDesc>{shortDesc}</StyledDesc>
        <StyledTime>{time} min</StyledTime>
        <StyledPrice $isCustomerBasket={isCustomerBasket}>${price}</StyledPrice>
      </InfoContainer>

      {!isCustomerBasket ? (
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
                onClickPlus={() => addCard()}
                onClickMinus={() => removeCard()}
                isInBasket={isInBasket}
                itemCount={itemCount}
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
    props.$isCustomerBasket &&
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
    props.$isCustomerBasket &&
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
