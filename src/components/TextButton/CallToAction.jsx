import styled from 'styled-components'

const StyledTextButton = styled.button`
	height: 3rem;
	width: 100%;
	padding: 0rem 1.5rem;
	cursor: pointer;
	color: var(--principal, #ecf0f1);
	border: none;
	border-radius: 3rem;
	background: linear-gradient(to left, #6600a5, #0092a6);
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
	&.principal {
		border: none;
		background: linear-gradient(270deg, #6600a5 -14.96%, #0092a6 110.26%);
		color: #ecf0f1;
	}
	&.disabled {
		border: none;
		background: ${(props) => props.theme.secondary};
		color: grey;
	}
`

export const CallToAction = ({ onClick, text, isActive, buttonClass, type }) => {
	return (
		<StyledTextButton onClick={onClick} className={`${isActive ? 'active' : ''} ${buttonClass}`} type={type}>
			{text}
		</StyledTextButton>
	)
}

