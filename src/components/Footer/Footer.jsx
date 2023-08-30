import styled from "styled-components";

const StyledFooter = styled.footer`
  align-self: stretch;
  display: flex;
  width: 100%;
  height: 7vh;
  overflow: hidden;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem 1rem 0 0;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.footerShadow};
  margin-top: auto;
  box-sizing: border-box;
`;


export const Footer = () => {
  return (
    <StyledFooter>
      <span> Bon Appetit | 2023 </span>
    </StyledFooter>
  );
};
