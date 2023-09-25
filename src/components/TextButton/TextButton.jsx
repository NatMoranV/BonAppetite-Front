import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import styled from "styled-components";

export const TextButton = ({
  onClick,
  text,
  isActive,
  type,
  className,
}) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <StyledTextButton
      $isDashboard={isDashboard}
      onClick={onClick}
      className={isActive ? "active" : className}
      type={type}
    >

{text}
    </StyledTextButton>
  );
};

const StyledTextButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  padding: 0rem 1.5rem;
  border: none;
  cursor: pointer;
  border-radius: 3rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  justify-content: flex-start;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  white-space: nowrap;

  @media (max-width: 649px) {
    width: 100%;
  }

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &.active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &.link {
    background: none;
    box-shadow: none;
    font-weight: 500;
    text-decoration: underline;
    padding: 1rem;
  }
`;


