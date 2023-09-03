import { styled } from "styled-components";
import { CallToAction } from "./CallToAction";

export const CTAsContainer = ({ text1, onClick1, text2, onClick2 }) => {
  return (
    <StyledCTAsContainer>
      <CallToAction text={text1} onClick={onClick1} buttonClass={"primary"} />

      {text2 && (
        <CallToAction text={text2} onClick={onClick2} buttonClass={"secondary"} />
      )}
    </StyledCTAsContainer>
  );
};

const StyledCTAsContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: width 0.3s ease-in-out;

  @media (max-width: 650px) {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1rem 1.5rem 2rem 1.5rem;
    border-radius: 1rem 1rem 0rem 0rem;
    background: ${(props) => props.theme.primary};
    box-shadow: ${(props) => props.theme.shortShadow};
  }
`;
