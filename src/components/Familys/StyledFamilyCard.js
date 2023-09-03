import styled from "styled-components";

export const StyledFamilyCard = styled.div`
  /* scroll-snap-align: start; */
  display: flex;
  width: 6rem;
  height: 6.5rem;
  padding: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  border-radius: 1rem;
  overflow-x: scroll;
  scroll-behavior: smooth;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};

  h6 {
    text-align: center;
    font-size: 16px;
    position: relative;
    margin-top: -1rem;

    /* font-style: normal;
    font-weight: 600;
    line-height: normal; */
  }

  img {
    height: 4.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    flex-shrink: 0;
    align-self: stretch;
    object-fit: cover;
  }
`;
