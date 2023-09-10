import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { StyledInput } from '../../components/Input/StyledInput'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { isString, validateEmail, validateLength8 } from '../../utils/validations'

export const Registry = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
		displayName: '',
	})
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
		displayName: '',
		button: 'disabled',
	})
	const location = useLocation()
	const $isCustomerView = location.pathname.startsWith('/customer')

	const navigate = useNavigate()
	const navigateHome = () => {
		navigate('/home')
	}
	const handleChange = (event) => {
		let error = ''
		const { name, value } = event.target

		if (name === 'displayName') {
			error = isString(value) ? '' : 'verifica tu nombre'
			setFormData({ ...formData, [name]: value })
			setErrors({ ...errors, [name]: error })
		}
		if (name === 'email') {
			error = validateEmail(value) ? '' : 'email invalido'
			setFormData({ ...formData, [name]: value })
			setErrors({ ...errors, [name]: error })
		}
		if (name === 'password') {
			error = validateLength8(value) ? '' : 'revisa tu contraseña'
			setFormData({ ...formData, [name]: value })
			setErrors({ ...errors, [name]: error })
		}
		if (name === 'passwordRepeat') {
			error = value !== formData.password && 'Tus contraseñas no coinciden'
			setFormData({ ...formData, [name]: value })
			setErrors({ ...errors, [name]: error })
		}
		console.log(errors)
		console.log(formData)
	}

	const enableButton =
		errors.email === '' &&
		errors.password === '' &&
		errors.passwordRepeat === '' &&
		errors.displayName === '' &&
		formData.email !== '' &&
		formData.password !== '' &&
		formData.passwordRepeat !== '' &&
		formData.displayName !== ''

	const handleGoBack = () => {
		window.history.back()
	}

	const sentInvite = () => {
		console.log('Se fue la invite')
	}
	return (
		<StyledView>
			<Logo />
			<h6>{$isCustomerView ? 'Crea tu cuenta' : 'Agrega un encargado'}</h6>
			<InputsContainer>
				<p>{$isCustomerView ? `Ingresa tus datos` : 'Ingresa sus datos'}</p>
				<StyledInput
					type={'text'}
					label={'Nombre'}
					name={'displayName'}
					placeholder={'Ej. Juan Perez'}
					onChange={handleChange}
					helper={errors.displayName}
					// value={formData.displayName}
				/>
				<StyledInput
					type={'email'}
					label={'Correo'}
					name={'email'}
					placeholder={'ejemplo@mail.com'}
					onChange={handleChange}
					helper={errors.email}
					// value={formData.email}
				/>
				{$isCustomerView && (
					<>
						<StyledInput
							type={'password'}
							label={'Contraseña'}
							name={'password'}
							placeholder={'8 digitos'}
							onChange={handleChange}
							helper={errors.password}
							// value={formData.password}
						/>
						<StyledInput
							type={'password'}
							label={'Confirmar contraseña'}
							name={'passwordRepeat'}
							placeholder={'Debe coincidir con el campo anterior'}
							onChange={handleChange}
							helper={errors.passwordRepeat}
							// value={formData.password}
						/>
					</>
				)}
			</InputsContainer>
			<CTAsContainer
				text1={$isCustomerView ? 'Crear cuenta' : 'Enviar invitación'}
				onClick1={
					$isCustomerView
						? async () => {
								const response = await axios.post(`${import.meta.env.VITE_URL_BACK}/users/create`, formData)
								console.log(response.data)
								navigateHome()
						  }
						: sentInvite
				}
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
