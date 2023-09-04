import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { StyledInput } from '../../components/Input/StyledInput'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'


export const AdminLogin = () => {
	return (
		<StyledView>
				<Logo />
				<h6>Iniciar sesión</h6>
				<InputsContainer>
					<StyledInput type={'email'} label={"Correo"} name={'email'} placeholder={'ejemplo@mail.com'} />
					<StyledInput type={'password'} label={"Contraseña"} name={'password'} placeholder={'8 digitos'} />
				</InputsContainer>
				<CTAsContainer text1={"Ingresar"}/>
		</StyledView>
	)
}

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  overflow-y: auto;
  padding: 3vh 4vw 10vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 0;
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

