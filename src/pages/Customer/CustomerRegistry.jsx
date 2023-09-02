import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { StyledInput } from '../../components/Input/StyledInput'
import { CallToAction } from '../../components/TextButton/CallToAction'

export const CustomerRegistry = () => {
	return (
		<DivContainer>
			<Container>
				<Logo />
				<h6>Crea tu cuenta</h6>
				<InputContainer>
					<p>Ingresa tus datos</p>
					<span>Nombre</span>
					<StyledInput type={'text'} name={'name'} placeholder={'Como te llamamos?'} />
					<span>Correo</span>
					<StyledInput type={'email'} name={'email'} placeholder={'ejemplo@mail.com'} />
					<span>Contraseña</span>
					<StyledInput type={'password'} name={'password'} placeholder={'8 digitos'} />
				</InputContainer>
				<CallToAction text={'Ingresar'} />
			</Container>
		</DivContainer>
	)
}

const DivContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const Container = styled.div`
	padding-top: 6rem;
	width: 90%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	&& button {
		margin-bottom: 2rem;
	}
	@media (min-width: 768px) {
		width: 50%;
	}
`
const InputContainer = styled.div`
	width: 100%;
	height: 17.25rem;
	margin: 0 1rem;
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 0.5rem;
	margin-bottom: 7rem;
	&& p {
		align-self: center;
		font-family: Montserrat;
		font-style: normal;
		font-weight: 400;
		font-size: 1rem;
	}
	&& span {
		font-family: Montserrat;
		font-style: normal;
		align-self: flex-start;
		font-size: 1.25rem;
		font-weight: 600;
	}
`
