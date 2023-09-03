import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { StyledInput } from '../../components/Input/StyledInput'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'

export const CustomerRegistry = () => {
	return (
		<StyledView>
				<Logo />
				<h6>Crea tu cuenta</h6>
				<InputsContainer>
					<p>Ingresa tus datos.</p>
					<StyledInput type={'text'} label={"Nombre"} name={'name'} placeholder={'Ej. Juan Perez'} />
					<StyledInput type={'email'} label={"Correo"} name={'email'} placeholder={'ejemplo@mail.com'} />
					<StyledInput type={'password'} label={"Contraseña"} name={'password'} placeholder={'8 digitos'} />
					<StyledInput type={'password'} label={"Confirmar contraseña"} name={'password'} placeholder={'Debe coincidir con el campo anterior'} />
				</InputsContainer>
				<CTAsContainer text1={"Crear cuenta"}/>
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
