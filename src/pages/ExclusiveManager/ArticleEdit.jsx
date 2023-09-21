import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { Dropdown } from "../../components/Dropdown/StyledDropdown";
import { Input } from "../../components/Input/Input";
import useMenu from "../../utils/useMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditImageButton } from "../../components/EditImage/EditImage";

export const ArticleEdit = () => {
	const menu = useMenu();
	const families = menu.map((i) => i.familyName);
	const dishes = menu.flatMap((family) => family.recipes);
	const { id } = useParams();

	const [articleDetails, setArticleDetails] = useState({
		image: "",
		familyName: "",
		name: "",
		desc: "",
		price: 0,
		time: 0,
	});

	const handleImgChange = (newImg) => {
		setArticleDetails((prevArticleDetails) => ({
			...prevArticleDetails,
			image: newImg,
		}));
	};

	useEffect(() => {
		const selectedMenu = dishes.find((item) => item.id === Number(id));
		if (selectedMenu) {
			const selectedFamily = menu.find((family) =>
				family.recipes.some((recipe) => recipe.id === Number(id))
			);

			setArticleDetails({
				image: selectedMenu.image,
				familyName: selectedFamily.familyName,
				name: selectedMenu.name,
				desc: selectedMenu.desc,
				price: selectedMenu.price,
				time: selectedMenu.time,
			});
		} else {
			console.error("Como e posible ete susesooo...");
		}
	}, [id]);

	const { image, name, desc, price, time, familyName } = articleDetails;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setArticleDetails((prevArticleDetails) => ({
			...prevArticleDetails,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!articleDetails.familyName ||
			!articleDetails.name ||
			!articleDetails.desc ||
			!articleDetails.price ||
			!articleDetails.time ||
			!articleDetails.img
		) {
			alert("Por favor, completa todos los campos.");
			return;
		}
		try {
			const response = await fetch(
				`https://resto-p4fa.onrender.com/product/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: articleDetails.name,
						description: articleDetails.desc,
						price: articleDetails.price,
						time: articleDetails.time,
					}),
				}
			);

			if (response.ok) {
				alert("Cambios guardados con éxito");
			} else {
				alert("Error al guardar los cambios");
			}
		} catch (error) {
			console.error("Error en la solicitud PUT:", error);
			alert("Error al guardar los cambios");
		}
	};

	return (
		<StyledView>
			<StyledForm onSubmit={handleSubmit}>
				<EditImageButton image={image} onImgChange={handleImgChange} />

				<Dropdown
					name="familyName"
					label={"Familia"}
					array={families}
					id={"family"}
					option1={"Selecciona una opción"}
					value={familyName}
					selectedValue={familyName}
					onChange={handleChange}
					helper={"Selecciona la familia a la que pertenece."}
				/>

				<Input
					type={"text"}
					name={"name"}
					label={"Nombre"}
					value={name}
					onChange={handleChange}
					helper={"Hasta 20 caracteres"}
				/>
				<Input
					type={"text"}
					name={"desc"}
					label={"Descripción"}
					value={desc}
					onChange={handleChange}
					helper={"Hasta 100 caracteres"}
				/>
				<Input
					type={"number"}
					name={"price"}
					label={"Precio"}
					value={price}
					onChange={handleChange}
				/>
				<Input
					type={"number"}
					name={"time"}
					label={"Tiempo de preparación"}
					value={time}
					onChange={handleChange}
					helper={"Tiempo en minutos"}
				/>
				<CTAsContainer type="submit" text1={`Guardar cambios`} />
			</StyledForm>
		</StyledView>
	);
};

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: auto;
	overflow-y: auto;
	padding: 10vh 4vw 15vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	overflow: visible;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 0;
	}
`;

const StyledForm = styled.form`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: start;
	width: 100%;
	box-sizing: border-box;
	gap: 2.5rem;
`;

const HiddenInput = styled.input`
	display: none;
`;

const StyledImg = styled.img`
	z-index: 1;
	height: 15rem;
	width: 100%;
	border-radius: 0.5rem;
	object-fit: cover;
	box-sizing: border-box;
	transition: all 0.3s ease-in-out;
`;
const ButtonContainer = styled.div`
	position: absolute;
	height: 15rem;
	width: 100%;
	box-sizing: border-box;
	z-index: 2;
	display: flex;
	justify-content: flex-end;
`;

const Overlay = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 0 0.5rem 0 2rem;
	background: ${(props) => props.theme.secondary};
	opacity: 0.7;
	box-sizing: border-box;
	position: absolute;
	top: 0rem;
	right: 0rem;
`;

const EditIcon = styled(FontAwesomeIcon)`
	position: absolute;
	cursor: pointer;
	font-size: 2rem;
	z-index: 3;
	top: 0.5rem;
	right: 0.5rem;

	path {
		fill: ${(props) => props.theme.primary};
	}
`;
