import styled from 'styled-components'

export const CallToAction = ({ text, buttonClass, onClick, type}) => {
	return (
		<StyledTextButton className={buttonClass} onClick={onClick} type={type}>
			{text}
		</StyledTextButton>
	)
}

const StyledTextButton = styled.button`
	height: 3.5rem;
	width: 100%;
	padding: 0rem 1.5rem;
	cursor: pointer;
	border: none;
	border-radius: 3rem;
	background-color: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	font-size: 1.5rem;
	font-weight: 700;

	&:active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}

	&.primary {
		background: linear-gradient(270deg, #6600a5 -14.96%, #0092a6 110.26%);
		color: white;
	}

	&.secondary{
		border: 1px solid ${(props) => props.theme.text};
		box-shadow: none;
		color: ${(props) => props.theme.text} ;
	}
`