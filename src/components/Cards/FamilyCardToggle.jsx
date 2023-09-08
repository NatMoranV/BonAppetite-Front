import styled from "styled-components";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { useState } from "react";

export const FamilyCardToggle = ({ id, img, name, onClick }) => {
	const [checked, setChecked] = useState(true);

	const clickHandle = () => {
		setChecked(!checked);
	};
	return (
		<StyledFamilyCard onClick={onClick}>
			<img src={img} alt="image" />
			<span>{name}</span>
			<ToggleButton checked={checked} onChange={clickHandle} />
		</StyledFamilyCard>
	);
};

const StyledFamilyCard = styled.div`
	display: flex;
	width: 6rem;
	height: 8.5rem;
	padding: 0.5rem;
	flex-direction: column;
	align-items: center;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	cursor: pointer;

	span {
		font-size: 1rem;
		font-weight: 600;
	}

	img {
		height: 4.5rem;
		align-self: stretch;
		border-radius: 0.5rem;
		flex-shrink: 0;
		align-self: stretch;
		object-fit: cover;
	}

	&:hover {
		transform: scale(1.02);
		transition: all 0.2s ease-in-out;
	}
`;
