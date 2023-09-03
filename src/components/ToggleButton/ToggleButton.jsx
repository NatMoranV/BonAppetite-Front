import styled from "styled-components";

export const ToggleButton = ({ onChange, checked, id, label }) => {
	return (
		<InputWrapper>
			<p>{label}</p>
			<Input type="checkbox" id={id} checked={checked} onChange={onChange} />
			<Slider checked={checked} />
		</InputWrapper>
	);
};

const Slider = styled.span`
	display: flex;
	cursor: pointer;
	width: 3.5rem;
	height: 1.5rem;
	padding: 0.3rem 0.4rem;
	align-items: center;
	border-radius: 3rem;
	background: ${(props) => props.theme.primary};
	position: relative;
	box-shadow: ${(props) => props.theme.pressedShadow};
	transition: all ease-in-out 0.3s;
	&:before {
		content: "";
		position: absolute;
		width: 1rem;
		height: 1rem;
		padding: 0.2rem 0.2rem;
		border-radius: 6.25rem;
		transition: all ease-in-out 0.3s;
		background: white;
		box-shadow: ${(props) => props.theme.shortShadow};
	}
`;

const InputWrapper = styled.label`
	position: relative;
	display: flex;
	gap: 1rem;
	align-items: center;

	& p {
		font-size: 1rem;
		font-weight: 600;
	}
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
			transition: all ease-in-out 0.3s;
			left: calc(60%);
			box-shadow: 2px 2px 4px 0px rgba(71, 148, 70, 0.75),
				4px 4px 8px 0px rgba(71, 148, 70, 0.25),
				-2px -2px 4px 0px rgba(105, 254, 80, 0.75),
				-4px -4px 8px 0px rgba(105, 254, 80, 0.25);
		}
	}
`;
