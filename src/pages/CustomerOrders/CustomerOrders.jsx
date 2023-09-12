import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'

export const CustomerOrders = () => {
	const navigate = useNavigate()
	const navigateHome = () => {
		navigate('/customer')
	}
	return (
		<StyledView>
			<h6>Procesamos tu pago!</h6>
			<p>Cuando este listo te avisaremos.</p>
			<CTAsContainer text1={'Volver'} onClick1={navigateHome} />
		</StyledView>
	)
}

const StyledView = styled.div`
	position: relative;
	top: 12rem;
	display: flex;
	gap: 2rem;
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
