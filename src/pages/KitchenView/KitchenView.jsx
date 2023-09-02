import { styled } from "styled-components";
import { KitchenCard } from "../../components/Cards/KitchenCard";

export const KitchenView = () =>{

    return (

        <StyledKitchenView>
            <StyledColumn>
            <h6>Pendientes</h6>
                <StyledCardsContainer>
                <KitchenCard id={8} timer={"15:00"} />
                <KitchenCard id={7} timer={"15:00"} toTakeHome notes={"Sin cebolla"}/>
                </StyledCardsContainer>
            </StyledColumn>
            <StyledColumn>
            <h6>Retrasadas</h6>
                <StyledCardsContainer>
                <KitchenCard type={"delayed"} id={10} timer={"15:00"}/>
                </StyledCardsContainer>
            </StyledColumn>

        </StyledKitchenView>
        

    )
}

const StyledKitchenView = styled.div`

display: flex;
align-items: flex-start;
gap: 8rem;
flex: 1 0 0;
align-self: stretch;
padding: 3rem 8rem;

`

const StyledColumn = styled.div`

display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1rem;

`

const StyledCardsContainer = styled.div`

display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1.5rem;
align-self: stretch;

`