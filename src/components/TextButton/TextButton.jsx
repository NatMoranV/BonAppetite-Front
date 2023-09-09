import styled from 'styled-components'

const StyledTextButton = styled.button`
	height: 2rem;
	width: auto;
	padding: 0rem 1.5rem;
	border: none;
	cursor: pointer;
	border-radius: 3rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	font-size: 1rem;
	font-weight: 600;
	color: ${(props) => props.theme.text};

	@media (max-width: 649px) {
    width: 100%;
  }

	&:active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}

	&.active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}
`

export const TextButton = ({ onClick, text, isActive, type }) => {
	return (
		<StyledTextButton onClick={onClick} className={isActive ? 'active' : ''} type={type}>
			{text}
		</StyledTextButton>
	)
}
