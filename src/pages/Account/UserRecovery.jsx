import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { StyledInput } from '../../components/Input/StyledInput'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/validations'
import { useState } from 'react'

export const UserRecovery = () => {
	const navigate = useNavigate()
	const [helper, setHelper] = useState(
		'Si tenemos una cuenta registrada con esa dirección, te llegará un correo con las indicaciones para recuperar tu cuenta.'
	)
	const [email, setEmail] = useState('')
	const navigateHome = () => {
		navigate('/')
	}

	const handleChange = (event) => {
		const { value } = event.target
		const help = validateEmail(value)
			? 'Si tenemos una cuenta registrada con esa dirección, te llegará un correo con las indicaciones para recuperar tu cuenta.'
			: 'Por favor verifica tu correo.'
		setHelper(help)
		setEmail(value)
	}
	const handleGoBack = () => {
		window.history.back()
	}

	const enableButton = email !== '' && validateEmail(email)

	return (
		<StyledView>
			<Logo />
			<h6>Recupera tu cuenta</h6>
			<InputsContainer>
				<StyledInput
					type={'email'}
					label={'Correo'}
					name={'email'}
					placeholder={'ejemplo@mail.com'}
					helper={helper}
					onChange={handleChange}
				/>
			</InputsContainer>
			<CTAsContainer
				text1={'Recuperar cuenta'}
				onClick1={navigateHome}
				buttonClass1={enableButton ? '' : 'disabled'}
				text2={'Volver'}
				onClick2={handleGoBack}
			/>
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
`

const InputsContainer = styled.div`
	width: 100%;
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`
