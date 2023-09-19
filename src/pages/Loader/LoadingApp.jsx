import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { LogoLoading } from '../../assets/images/Logo/LogoLoading'

const fadeInFromBottom = keyframes`
	0%{
		opacity: 0;
		transform: translateY(500px); 
	}
	95% {
		opacity: 1;
		transform: translateY(-50px); 
	}
	100% {
		opacity: 1;
		transform: translateY(0); 
	}
`

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 0 auto;
	align-items: center;
	animation-name: ${fadeInFromBottom};
	animation-duration: 1s;
`

export const LoadingApp = () => {
	const navigate = useNavigate()

	useEffect(() => {
		// Redirigir después de 3 segundos
		const redirectTimer = setTimeout(() => {
			// Utiliza navigate para redirigir
			// Puedes cambiar '/customer/login' por la ruta que desees
			navigate('/customer/')
		}, 3000)

		return () => {
			// Limpiar el temporizador si el componente se desmonta antes de que se complete
			clearTimeout(redirectTimer)
		}
	}, [navigate])
	return (
		<Container>
			<LogoLoading />
		</Container>
	)
}
