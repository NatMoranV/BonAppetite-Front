import { faPepperHot } from "@fortawesome/free-solid-svg-icons";

import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 80%;
  
  margin: 40vh 0;

  padding: 0 0 0 0;

  && span {
    font-size: 2rem;
  }

  && h6 {
    margin: 0;
    padding: 0;
  }

  animation: ${beat} 0.45s infinite ease-out;
  animation-duration: 2s;
`;

export const LogoLoading = () => {
  return (
    <StyledLogo className="Logo">
      <span>
        <FontAwesomeIcon icon={faPepperHot} />
      </span>

      <h4>Bon Appétit</h4>
    </StyledLogo>
  );
};
