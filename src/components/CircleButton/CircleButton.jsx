import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledCircleButton = styled.button`
	display: flex;
	width: 2rem;
	height: 2rem;
	margin-top: 1.2rem;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	flex-shrink: 0;
	border: none;
	border-radius: 7rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	font-size: 1rem;
	font-weight: 700;
	line-height: 3rem;
	cursor: pointer;

	&.small {
		width: 1.5rem;
		height: 1.5rem;
		margin: 0;
	}
	&.big {
		width: 3rem;
		height: 3rem;
		margin: 0;
	}

	&:active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}

	&.active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}
`

export const CircleButton = ({ icon, onClick, className, content }) => {
	return (
		<StyledCircleButton onClick={onClick} className={className}>
			{icon !== undefined ? <FontAwesomeIcon icon={icon} /> : content}
		</StyledCircleButton>
	)
}
