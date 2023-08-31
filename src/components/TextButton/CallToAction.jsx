import styled from 'styled-components'

const StyledTextButton = styled.button`
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

export const CallToAction = ({ text, isActive, buttonClass, type }) => {
	return (
		<StyledTextButton className={`${isActive ? 'active' : ''} ${buttonClass}`} type={type}>
			{text}
		</StyledTextButton>
	)
}
