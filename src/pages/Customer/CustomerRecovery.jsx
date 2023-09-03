import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { StyledInput } from '../../components/Input/StyledInput'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'

export const CustomerRecovery = () => {
	return (
		<StyledView>
				<Logo />
				<h6>Recupera tu cuenta</h6>
				<InputsContainer>
					<StyledInput type={'email'} label={"Correo"} name={'email'} placeholder={'ejemplo@mail.com'} helper={"Si tenemos una cuenta registrada con esa dirección, te llegará un correo con las indicaciones para recuperar tu cuenta."} />
				</InputsContainer>
				<CTAsContainer text1={"Recuperar cuenta"}/>
		</StyledView>
	)
}

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 3rem 1rem;
  box-sizing: border-box;
  gap: 2.5rem;
  transition: width 0.3s ease-in-out;

  @media (min-width: 650px) {
    width: 30rem;
  }
`;

const InputsContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
