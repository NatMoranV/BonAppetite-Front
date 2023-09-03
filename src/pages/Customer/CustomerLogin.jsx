import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { CircleButton } from '../../components/CircleButton/CircleButton'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { StyledInput } from '../../components/Input/StyledInput'
import { CallToAction } from '../../components/TextButton/CallToAction'
import { TextButton } from '../../components/TextButton/TextButton'
import { useNavigate } from 'react-router-dom'

export const CustomerLogin = () => {
	const navigate = useNavigate()
	const navigateHome = () => {
		navigate('/home')
	}
	const navigateRecovery = () => {
		navigate('/customer/recovery')
	}
	const navigatePassword = () => {
		navigate('/customer/password')
	}

	const navigateRegistry = () => {
		navigate('/customer/registry')
	}
	return (
		<DivContainer>
			<Container>
				<Logo />
				<h6>Iniciar sesión</h6>
				<ButtonContainer>
					<CircleButton onClick={navigateRecovery} className={`big`} icon={faGoogle} />
					<CircleButton onClick={navigatePassword} className={`big`} icon={faFacebookF} />
				</ButtonContainer>
				<InputContainer>
					<p>O ingresa tus datos</p>
					<span>Correo</span>
					<StyledInput type={'email'} name={'email'} placeholder={'ejemplo@mail.com'} />
					<span>Contraseña</span>
					<StyledInput type={'password'} name={'password'} placeholder={'8 digitos'} />
				</InputContainer>
				<CallToAction text={'Ingresar'} onClick={navigateHome} />
				<TextButton text={'Crear cuenta'} onClick={navigateRegistry} />
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
	justify-content: space-evenly;
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
const ButtonContainer = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	gap: 1rem;
`
