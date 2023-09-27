import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faPepperHot } from "@fortawesome/free-solid-svg-icons";

export const NoResultsCard = ({ title, message }) => {
  return (
    <StyledCard>
      <StyledFontAwesomeIcon icon={faPepperHot} />

      <StyledTitle>{title}</StyledTitle>
      <StyledMessage> {message} </StyledMessage>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: auto;
  height: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: .5rem;
  gap: 3rem;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 4rem;
`;

const StyledTitle = styled.span`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0;
`;

const StyledMessage = styled.span`
  text-align: center;
  font-size: 1.2rem;
`;
