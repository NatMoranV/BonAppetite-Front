/* eslint-disable react/prop-types */
import { faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { keyframes, styled } from "styled-components";
import { CTAsContainer } from "../CTAs/CTAsContainer";

export const Modal = ({
	loading,
	title,
	msg,
	text1,
	onClick1,
	buttonClass1,
	text2,
	onClick2,
}) => {
	return (
		<ModalContainer>
			{loading && (
				<IconContainer>
					<FontAwesomeIcon icon={faPepperHot} />
				</IconContainer>
			)}
			<br />
			<h3>{title}</h3>
			<br />
			<p> {msg} </p>
			<CTAsContainer
				text1={text1}
				onClick1={onClick1}
				text2={text2}
				onClick2={onClick2}
			/>
		</ModalContainer>
	);
};

const ModalContainer = styled.div`
	margin-top: 7rem;
	position: absolute;
	height: 15rem;
	width: 80%;
	z-index: 3;
	display: flex;
	flex-direction: column;
	justify-self: center;
	align-self: center;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	padding: 1rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	@media (min-width: 650px) {
		width: 30rem;
	}
`;
const beat = keyframes`
0% {
			transform: scale(2);
		}
		50% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(2);
		}
`;

const IconContainer = styled.div`
	display: inline-block;
	animation: ${beat} 2s infinite;
`;
