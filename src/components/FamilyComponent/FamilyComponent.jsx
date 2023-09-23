import { useState } from "react";
import styled from "styled-components";
import { EditImageButton } from "../EditImage/EditImage";
import { Input } from "../Input/Input";
import { CircleButton } from "../CircleButton/CircleButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const FamilyComponent = ({ family, onDelete, index }) => {
	const [familyDetails, setFamilyDetails] = useState({
		familyImage: family.familyImage,
		familyName: family.familyName,
	});

	const handleImgChange = (newImg) => {
		setFamilyDetails((prevFamilyDetails) => ({
			...prevFamilyDetails,
			familyImage: newImg,
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFamilyDetails((prevFamilyDetails) => ({
			...prevFamilyDetails,
			[name]: value,
		}));
	};

	return (
		<StyledFamily>
			<EditImageButton
				image={familyDetails.familyImage}
				onImgChange={handleImgChange}
			/>
			<InputContainer>
				<Input
					type={"text"}
					name={"familyName"}
					value={familyDetails.familyName}
					onChange={handleChange}
					helper={"Hasta 10 caracteres"}
				/>
				<CircleButton
					className={"big"}
					icon={faTrashCan}
					onClick={() => onDelete(index)}
				/>
			</InputContainer>
		</StyledFamily>
	);
};

const StyledFamily = styled.div`
	width: 100%;
`;

const InputContainer = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: start;
	gap: 1rem;
`;
