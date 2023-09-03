import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { StyledInput } from '../../components/Input/StyledInput'
import { CallToAction } from '../../components/TextButton/CallToAction'
import { useNavigate } from 'react-router-dom'

export const CustomerPasswordRecovery = () => {
	const navigate = useNavigate()
	const navigateHome = () => {
		navigate('/home')
	}
	return (
		<DivContainer>
			<Container>
				<Logo />
				<h6>Actualiza tu contraseña</h6>
				<InputContainer>
					<p>ejemplo@mail.com</p>
					<span>Nueva contraseña</span>
					<StyledInput type={'password'} name={'password'} placeholder={'8 digitos'} />
					<span>Repite tu contraseña</span>
					<StyledInput type={'password'} name={'password'} placeholder={'vuelve a ingresarla'} />
				</InputContainer>
				<CallToAction onClick={navigateHome} text={'Actualizar Contraseña'} />
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
