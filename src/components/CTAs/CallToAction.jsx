/* eslint-disable react/prop-types */
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'

export const CallToAction = ({ text, buttonClass, onClick, type }) => {

	const location = useLocation().pathname;
	const isDashboard = location.startsWith("/dashboard");

	return (
		<StyledTextButton $isDashboard={isDashboard} className={buttonClass} onClick={onClick} type={type}>
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
	background: linear-gradient(270deg, #6600a5 -14.96%, #0092a6 110.26%);
	font-size: 1.5rem;
	font-weight: 700;
	color: white;
	white-space: nowrap;

	&.secondary {
		background: ${(props) => props.theme.primary};
		border: 1px solid ${(props) => props.theme.text};
		box-shadow: none;
		color: ${(props) => props.theme.text};
	}
	&.disabled {
		background: gray;
		opacity: .6;
		pointer-events: none;
		cursor: not-allowed;
	}



	@media (max-width: 650px) {
		width: 100%;
	}
`
