/* eslint-disable react/prop-types */
import { faPepperHot, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css, keyframes } from "styled-components";
import { CTAsContainer } from "../CTAs/CTAsContainer";

export const Modal = ({
  isLoader,
  title,
  msg,
  text1,
  onClick1,
  text2,
  onClick2,
  onClose,
}) => {
  return (
    <StyledModal>
      <Overlay onClick={!isLoader ? onClose : null} />

      <ModalContainer>
        {!isLoader && <CloseIcon icon={faTimes} onClick={onClose} />}
        {isLoader ? (
          <>
            <StyledFontAwesomeIcon icon={faPepperHot} $isLoading={isLoader} />

            <StyledTitle>{title}</StyledTitle>
          </>
        ) : (
          <>
            <StyledFontAwesomeIcon icon={faPepperHot} />
            <StyledTitle>{title}</StyledTitle>
            <StyledMessage> {msg} </StyledMessage>
            {text1 && (
              <CTAsContainer
                text1={text1}
                onClick1={onClick1}
                text2={text2}
                onClick2={onClick2}
              />
            )}
          </>
        )}
      </ModalContainer>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  position: absolute;
`;

const ModalContainer = styled.div`
  position: relative;
  height: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  padding: 2rem 1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  @media (min-width: 650px) {
    width: 30rem;
  }

  && > div {
    box-shadow: none;
  }
`;



const beat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(.7);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 4rem;

  ${(props) =>
    props.$isLoading &&
    css`
      animation: ${beat} 2s infinite ease-in-out;
    `}
`;

const StyledTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0;
`;

const StyledMessage = styled.span`
  text-align: center;
  font-size: 1.2rem;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
`;