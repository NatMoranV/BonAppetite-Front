import React from "react";
import {
  faClock,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "../Divider/Divider";
import { styled } from "styled-components";



export const KitchenCard = (props) => {
  const { type, timer, id, array, toTakeHome, notes } = props;
console.log(props.type);
  return (
    
    <StyledKitchenCard >
      <StatusContainer type={type}>
        <FontAwesomeIcon
        
          icon={type === "delayed" ? faExclamationCircle : faClock}

        />
        <h6>{timer}</h6>
      </StatusContainer>
      <h6>Orden {id}</h6>
      <Divider />
      //Info de orden//
      {toTakeHome && <Divider />}
      {toTakeHome && <h6>Para llevar</h6>}
      {notes && <Divider />}
      {notes && <p>{notes}</p>}
    </StyledKitchenCard>
  );
};

const StyledKitchenCard = styled.div`
  display: flex;
  width: 48rem;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.largeShadow};

  & h6{
    margin: 0;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  width: 100%;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  color:  ${(props) => props.type === "delayed" ? props.theme.warning : props.theme.text};

  &&   path {
    color:  ${(props) => props.type === "delayed" ? props.theme.warning : props.theme.text};;
  }

`;
