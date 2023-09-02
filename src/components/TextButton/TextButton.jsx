import styled from 'styled-components'

const StyledTextButton = styled.button`
	height: 3rem;
	width: 100%;
	padding: 0rem 1.5rem;
	border: 1px solid #4a5962;
	cursor: pointer;

	border-radius: 3rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	font-size: 1rem;

	font-weight: 700;
	line-height: 1rem;

	&:active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}

	&.active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}
`

export const TextButton = ({ text, isActive, type }) => {
	return (
		<StyledTextButton className={isActive ? 'active' : ''} type={type}>
			{text}
		</StyledTextButton>
	)
}
