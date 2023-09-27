import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";

export const FloatButton = ({ onClick, icon, basketHasItems }) => {
  return <StyledFloatButton $basketHasItems={basketHasItems} onClick={onClick} icon={icon} className={"big"} />;
};

const StyledFloatButton = styled(CircleButton)`
  position: fixed;
  background-color: red;
  right:${(props) => props.$basketHasItems ? "16rem" : "1rem"};
  bottom: 2.5rem;
  z-index: 3;
  opacity: 0.5;
  transition: all .5s ease-out;

  background: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.text};
  box-shadow: none;
  color: ${(props) => props.theme.text};



  &:hover {
    opacity: 1;
  }

  @media (max-width: 800px) {
    right: 0.5rem;
    bottom: ${(props) => props.$basketHasItems ? "8rem" : "2.5rem"};
  }
`;
