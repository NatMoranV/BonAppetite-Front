import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  width: 21.4375rem;
  height: 8.5rem;
  padding: 0.5rem;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};

  a {
    text-decoration: none;
  }

  img {
    height: 7.8rem;
    flex-shrink: 0;
    align-self: stretch;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;