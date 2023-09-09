import { useLocation } from "react-router";
import styled from "styled-components";

export const TextButton = ({ onClick, text, isActive, type }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <StyledTextButton
      $isDashboard={isDashboard}
      onClick={onClick}
      className={isActive ? "active" : ""}
      type={type}
    >
      {text}
    </StyledTextButton>
  );
};

const StyledTextButton = styled.button`
  height: 2rem;
  width: auto;
  padding: 0rem 1.5rem;
  border: none;
  cursor: pointer;
  border-radius: 3rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  
  ${(props) =>
    props.$isDashboard &&
    `
		width: 100%;
	`}
	
  @media (max-width: 649px) {
    width: 100%;
  }

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &.active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }
`;
