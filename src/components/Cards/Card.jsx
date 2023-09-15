import {
  faEdit,
  faPlus,
  faStar,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const Card = ({ id, img, name, shortDesc, price, time, rating }) => {
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

    let itemCount = 0;
    existingBasket.forEach((item) => {
      if (item.id === id) {
        itemCount += item.amount;
      }
    });
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
    existingBasket.forEach((element) => {
      if (element.id === cardData.id) {
        element.amount++;
        existing = true;
      }
    });
    if (existing) {
      localStorage.setItem("basket", JSON.stringify(existingBasket));
    } else {
      const updatedBasket = [...existingBasket, cardData];
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
    }
    setIsInBasket(true);

    let itemCount = 1;
    existingBasket.forEach((item) => {
      if (item.id === id) {
        itemCount += item.amount;
      }
    });
    setItemCount(itemCount);
  };

  const removeCard = () => {
    const updatedBasket = existingBasket
      .map((item) => {
        if (item.id === id) {
          if (item.amount > 1) {
            item.amount--;
          } else {
            // Si la cantidad es 1, eliminar completamente el elemento
            return null;
          }
        }
        return item;
      })
      .filter(Boolean); // Elimina elementos nulos (los que se eliminaron completamente)
    localStorage.setItem("basket", JSON.stringify(updatedBasket));

    const cardInBasket = updatedBasket.some(
      (item) => item.id === id && item.amount > 0
    );
    setIsInBasket(cardInBasket);

    let itemCount = 0;
    updatedBasket.forEach((item) => {
      if (item.id === id) {
        itemCount += item.amount;
      }
    });
    setItemCount(itemCount);
  };

  const clickHandle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <StyledCard $isCustomerBasket={isCustomerBasket}>
      {!isCustomerBasket && (
        <StyledNavLink to={`detail/${id}`} />
      )}
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
                <StyledRating>{rating}</StyledRating>
              </RatingContainer>
              <CircleButton onClick={() => addCard()} icon={faPlus} />
              {isInBasket && <ItemCount>{itemCount}</ItemCount>}
              {isCustomerView && isInBasket && (
                <>
                  <CircleButton onClick={() => removeCard()} icon={faMinus} />
                </>
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

const StyledRating = styled.span``;

const ItemCount = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
`;

const StyledNavLink = styled(NavLink)`

text-decoration: none;
		color: inherit;
		position: absolute;
		top: 0;
		left: 0;
		width: 85%;
		height: 100%;
		z-index: 1;

`;
