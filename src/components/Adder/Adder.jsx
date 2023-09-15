import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export const Adder = ({ onClickPlus, onClickMinus, itemCount }) => {
  const isNotZero = itemCount >= 1;
  const isOne = itemCount <= 1;

  return (
    <StyledAdder>
      <MinusButton
        icon={!isOne ? faMinus : faTrashAlt}
        onClick={onClickMinus}
        $isNotZero={isNotZero}
      />
      <ItemCount $isNotZero={isNotZero}>{itemCount}</ItemCount>
      <PlusButton icon={faPlus} onClick={onClickPlus} />
    </StyledAdder>
  );
};

const StyledAdder = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
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
