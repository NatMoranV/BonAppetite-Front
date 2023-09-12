import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from '../../assets/images/Logo/Logo'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'
import { StyledInput } from '../../components/Input/StyledInput'
import { isString, validateEmail, validateLength8 } from '../../utils/validations'
import { Modal } from '../../components/Modal/Modal'

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
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()
	const $isCustomerView = location.pathname.startsWith('/customer')

	const login = async () => {
		setLoading(true)
		// console.log(`${import.meta.env.VITE_URL_BACK}/users/create`);

		try {
			const form = { ...formData }
			delete form.passwordRepeat

			// console.log(form);
			// console.log(`${import.meta.env.VITE_URL_BACK}/users/create`);

			const response = await axios.post(`${import.meta.env.VITE_URL_BACK}/users/create`, form)
			// console.log(response.data);

			setLoading(false)
			navigateHome()
		} catch (error) {
			console.error('Error:', error.response.data.error)
			alert(error.response.data.error)
			setLoading(false)
		}
	}

	const handleChange = (event) => {
		let error = ''
		const { name, value } = event.target

		if (name === 'displayName') {
			error = isString(value) ? '' : 'verifica tu nombre'
		}
		if (name === 'email') {
			error = validateEmail(value) ? '' : 'email invalido'
		}
		if (name === 'password') {
			error = validateLength8(value) ? '' : 'revisa tu contraseña'
		}
		if (name === 'passwordRepeat') {
			error = value !== formData.password ? 'Tus contraseñas no coinciden' : ''
		}
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
		// console.log(errors, formData);
		const { email, password, passwordRepeat, displayName } = errors
		if (
			email === '' &&
			password === '' &&
			passwordRepeat === '' &&
			displayName === '' &&
			Object.values(formData).every((data) => data !== '')
		) {
			// console.log("algo");
			setErrors((prevErrors) => ({ ...prevErrors, button: '' }))
		}
	}

	const handleGoBack = () => {
		window.history.back()
	}
	const navigateHome = () => {
		navigate('/customer')
	}

	const sentInvite = () => {
		// console.log("Se fue la invite");
	}
	return (
		<StyledView>
			{loading && <Modal loading={true} title={'loading'} />}
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
					onBlur={handleChange}
					helper={errors.displayName}
					value={formData.displayName}
				/>
				<StyledInput
					type={'email'}
					label={'Correo'}
					name={'email'}
					placeholder={'ejemplo@mail.com'}
					onChange={handleChange}
					onBlur={handleChange}
					helper={errors.email}
					value={formData.email}
				/>
				{$isCustomerView && (
					<>
						<StyledInput
							type={'password'}
							label={'Contraseña'}
							name={'password'}
							placeholder={'8 digitos'}
							onChange={handleChange}
							onBlur={handleChange}
							helper={errors.password}
							value={formData.password}
						/>
						<StyledInput
							type={'password'}
							label={'Confirmar contraseña'}
							name={'passwordRepeat'}
							placeholder={'Debe coincidir con el campo anterior'}
							onChange={handleChange}
							onBlur={handleChange}
							helper={errors.passwordRepeat}
							value={formData.passwordRepeat}
						/>
					</>
				)}
			</InputsContainer>
			<CTAsContainer
				text1={$isCustomerView ? 'Crear cuenta' : 'Enviar invitación'}
				onClick1={$isCustomerView ? login : sentInvite}
				buttonClass1={errors.button}
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
