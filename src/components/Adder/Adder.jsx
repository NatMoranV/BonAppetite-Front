import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EVENT_ADD } from "../../redux/actions/types";

export const Adder = ({
  id,
  image,
  name,
  shortDesc,
  price,
  time,
  onRemove,
  onAdd,
  isBasket,
}) => {
  const [itemCount, setItemCount] = useState(0);
  const [isInBasket, setIsInBasket] = useState(false);
  const dispatch = useDispatch();
  const eventAdd = useSelector((state) => state.eventAdd);

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
      image,
      name,
      shortDesc,
      time,
      price,
      amount: 1,
    };

    const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];

    const cardIndex = existingBasket.findIndex(
      (item) => item.id === cardData.id
    );

    if (cardIndex !== -1) {
      existingBasket[cardIndex].amount++;
    } else {
      existingBasket.push(cardData);
    }

    localStorage.setItem("basket", JSON.stringify(existingBasket));
    setIsInBasket(true);

    const itemCount = existingBasket.reduce((total, item) => {
      if (item.id === id) {
        return total + item.amount;
      }
      return total;
    }, 0);
    dispatch({ type: EVENT_ADD, payload: !eventAdd });

    setItemCount(itemCount);
    if (onAdd) {
      onAdd();
    }
  };

  const removeCard = () => {
    const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];

    const cardIndex = existingBasket.findIndex((item) => item.id === id);

    if (cardIndex !== -1) {
      if (existingBasket[cardIndex].amount > 1) {
        existingBasket[cardIndex].amount--;
      } else {
        existingBasket.splice(cardIndex, 1);
      }

      localStorage.setItem("basket", JSON.stringify(existingBasket));

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
      dispatch({ type: EVENT_ADD, payload: !eventAdd });
      setItemCount(itemCount);
      if (onRemove) {
        onRemove();
      }
    }
  };

  const isNotZero = itemCount >= 1;
  const isOne = itemCount <= 1;

  return (
    <StyledAdder $isBasket={isBasket}>
      <MinusButton
        icon={!isOne ? faMinus : faTrashAlt}
        onClick={removeCard}
        $isNotZero={isNotZero}
      />
      <ItemCount $isBasket={isBasket} $isNotZero={isNotZero}>
        {itemCount}
      </ItemCount>
      <PlusButton
        $isBasket={isBasket}
        icon={faPlus}
        onClick={addCard}
        isInBasket={isInBasket}
      />
    </StyledAdder>
  );
};

const StyledAdder = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  ${(props) =>
    props.$isBasket &&
    `
		margin-left: 4.5rem;
		`}
`;

const PlusButton = styled(CircleButton)``;

const MinusButton = styled(CircleButton)`
  position: absolute;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: all ease-in-out 0.5s;
  ${(props) =>
    props.$isNotZero &&
    `
    right: 4.5rem;
    opacity: 1;
    pointer-events: all;
  `}
`;

const ItemCount = styled.span`
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  position: absolute;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: all ease-in-out 0.5s;
  ${(props) =>
    props.$isNotZero &&
    `
    right: 2.25rem;
    opacity: 1;
    pointer-events: all;
  `}
`;
