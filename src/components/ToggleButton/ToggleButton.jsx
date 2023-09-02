import styled from "styled-components";

export const ToggleButton = ({ onChange }) => {
	return (
		<InputWrapper>
			<Input type="checkbox" onChange={onChange}></Input>
			<Slider />
		</InputWrapper>
	);
};

const InputWrapper = styled.label`
	position: relative;
`;
const Input = styled.input`
	position: absolute;
	left: -9999px;
	top: -9999px;

	&:checked + span {
		background: #57ae60;
		box-shadow: -2px -2px 4px 0px rgba(105, 254, 80, 0.75) inset,
			2px 2px 4px 0px #479446 inset;
		&:before {
			left: calc(65%);
			width: 1rem;
			height: 1rem;
			padding: 0.2rem 0.2rem;
			transition: 0.2s;
			border-radius: 6.25rem;
			background: #fff;
			box-shadow: 4px 4px 8px 0px rgba(71, 148, 70, 0.75),
				8px 8px 12px 0px rgba(71, 148, 70, 0.25),
				-4px -4px 8px 0px rgba(105, 254, 80, 0.75),
				-8px -8px 12px 0px rgba(105, 254, 80, 0.25);
		}
	}
`;

const Slider = styled.span`
	display: flex;
	cursor: pointer;
	width: 2.9375rem;
	height: 1.5rem;
	padding: 0.25rem 1.6875rem 0.25rem 0.25rem;
	align-items: center;
	flex-shrink: 0;
	border-radius: 3rem;
	background: #ecf0f1;
	position: relative;
	box-shadow: -2px -2px 4px 0px rgba(255, 255, 255, 0.75) inset,
		2px 2px 4px 0px #bdc3c7 inset;
	transition: background-color 0.2s;
	&:before {
		content: "";
		position: absolute;
		width: 1rem;
		height: 1rem;
		padding: 0.2rem 0.2rem;
		border-radius: 6.25rem;
		transition: 0.2s;
		background: #fff;
		box-shadow: 4px 4px 8px 0px rgba(189, 195, 199, 0.75),
			8px 8px 12px 0px rgba(189, 195, 199, 0.25),
			-4px -4px 8px 0px rgba(255, 255, 255, 0.75),
			-8px -8px 12px 0px rgba(255, 255, 255, 0.25);
	}
`;
