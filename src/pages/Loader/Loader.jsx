import styled, { keyframes } from 'styled-components'
import { LogoLoading } from '../../assets/images/Logo/LogoLoading'

export const Loader = () => {
	return (
		<Container>
			<LogoLoading />
		</Container>
	)
}

const fadeInFromBottom = keyframes`
    0%{
      opacity: 0;
      transform: translateY(500px); 
    }
    75% {
      opacity: 0.7;
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
