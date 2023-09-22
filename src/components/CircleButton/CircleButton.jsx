import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledCircleButton = styled.button`
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 7rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  font-size: 1.2rem;
  line-height: 3rem;
  cursor: pointer;

  &.small {
    font-size: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
  }
  &.big {
    width: 3.5rem;
    height: 3.5rem;
    margin: 0;
    font-size: 2rem;
  }

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &.active {
    cursor: auto;
    box-shadow: ${(props) => props.theme.pressedShadow};
  }
`;

export const CircleButton = ({
  icon,
  onClick,
  isActive,
  className,
  content,
  style,
}) => {
  return (
    <StyledCircleButton
      onClick={onClick}
      className={isActive ? "active" : className}
    >
      {icon !== undefined ? (
        <FontAwesomeIcon icon={icon} style={style} />
      ) : (
        content
      )}
    </StyledCircleButton>
  );
};
