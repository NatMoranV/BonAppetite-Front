import styled from "styled-components";
import { EditImageButton } from "../EditImage/EditImage";
import { Input } from "../Input/Input";
import { CircleButton } from "../CircleButton/CircleButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

export const FamilyComponent = ({
	family,
	onDelete,
	onUpdateDetails,
	index,
}) => {
	const [familyDetails, setFamilyDetails] = useState({
		familyImage: family.image,
		class: family.class,
	});

	useEffect(() => {
		setFamilyDetails({
			image: family.image,
			class: family.class,
		});
	}, [family]);

	// const handleImgChange = (newImg) => {
	// 	setFamilyDetails((prevFamilyDetails) => ({
	// 		...prevFamilyDetails,
	// 		familyImage: newImg,
	// 	}));
	const handleImgChange = (newImg) => {
		setFamilyDetails((prevArticleDetails) => ({
			...prevArticleDetails,
			image: newImg,
		}));

		onUpdateDetails(index, {
			...familyDetails,
			image: newImg,
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFamilyDetails((prevFamilyDetails) => ({
			...prevFamilyDetails,
			[name]: value,
		}));

		onUpdateDetails(index, {
			...familyDetails,
			[name]: value,
		});
	};

	return (
		<StyledFamily>
			<EditImageButton
				image={familyDetails.image}
				onImgChange={handleImgChange}
			/>
			<InputContainer>
				<Input
					type={"text"}
					name={"class"}
					value={familyDetails.class}
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
