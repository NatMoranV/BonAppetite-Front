import styled from "styled-components";
import { TextButton } from "../../components/TextButton/TextButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { Table } from "../../components/Table/Table";


export const Dashboard = () => {


const LinkStyles = {
    fontSize : "4rem",
    textAlign : "middle"
}
  return (
    <StyledView>
      <SideMenu>
        <FontAwesomeIcon icon={faPepperHot} style={LinkStyles} />
        <ButtonsContainer>
        <TextButton text={"Artículos"} />
        <TextButton text={"Managers"} />
        <TextButton text={"Órdenes"} />
        <TextButton text={"Cuenta"} />
        </ButtonsContainer>
        <CircleButton className={"big"} icon={faMoon}/>
        <TextButton text={"Salir"} />
      </SideMenu>
      <Table/>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  width: 90rem;
  padding: 5rem 1.5rem var(--Qty, 0rem) 10.375rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  border-radius: var(--Qty, 0rem);
  background: var(--principal, #ecf0f1);
`;

const SideMenu = styled.div`
  display: flex;
  width: 9.25rem;
  height: 100%;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  gap: 2rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.largeShadow};
`;

const ButtonsContainer = styled.div`

display: flex;
width: 7.5625rem;
padding: 3rem var(--Qty, 0rem);
flex-direction: column;
align-items: flex-start;
gap: 1.5rem;
flex: 1 0 0;

`
