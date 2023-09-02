import { styled } from "styled-components";

export const Divider = () => {
  return <StyledDivider />;
};

const StyledDivider = styled.div`
  height: 0.25rem;
  align-self: stretch;
  border-radius: 0.625rem;
  background: rgba(74, 89, 98, 0.15);
`;
