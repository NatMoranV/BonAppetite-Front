import styled from "styled-components";

import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { TextButton } from "../../components/TextButton/TextButton";

import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { FamilyComponent } from "../../components/FamilyComponent/FamilyComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteFamily, updateFamilies } from "../../redux/actions/actions";

export const EditFamilies = () => {
	const dispatch = useDispatch();
	const allFamilies = useSelector((state) => state.families);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);
	const [families, setFamilies] = useState(allFamilies || []);
	console.log(itemToDeleteIndex);

	useEffect(() => {
		if (allFamilies) {
			setFamilies(allFamilies);
		}
	}, [allFamilies]);

	const handleAddFamily = () => {
		const newFamily = {
			class: "",
			image: "",
		};

		const updatedFamilies = [...families, newFamily];
		setFamilies(updatedFamilies);
	};

	const handleDelete = (index) => {
		setIsDeleteModalVisible(true);
		setItemToDeleteIndex(index);
	};

	const handleConfirmDelete = () => {
		if (itemToDeleteIndex !== null) {
			const familyToDelete = families[itemToDeleteIndex];
			const familyIdToDelete = familyToDelete.id;

			dispatch(deleteFamily(familyIdToDelete));

			const updatedFamilies = [...families];
			updatedFamilies.splice(itemToDeleteIndex, 1);
			setFamilies(updatedFamilies);

			setIsDeleteModalVisible(false);
			setItemToDeleteIndex(null);
		}
	};

	const handleCancelDelete = () => {
		setIsDeleteModalVisible(false);
		setItemToDeleteIndex(null);
	};

	const handleUpdateFamilyDetails = (index, updatedDetails) => {
		const updatedFamilies = [...families];
		updatedFamilies[index] = {
			...updatedFamilies[index],
			...updatedDetails,
		};

		setFamilies(updatedFamilies);
	};

	if (!allFamilies) {
		return <Modal isLoader title={"Cargando..."} />;
	}

	const post = async () => {
		try {
			const updatedArray = families.map((family) => ({
				id: family.id,
				class: family.class,
				image: family.image,
				enable: family.enable,
			}));

			const postData = { updatedArray };

			await dispatch(updateFamilies(postData));
			console.log("Familias agregadas con éxito");
			console.log(postData);
		} catch (error) {
			console.error("Error al agregar familias:", error);
		}
	};

	return (
		<StyledView>
			<Header>
				<Title>Familias</Title>
				<Subtitle>
					Ingresa las familias en el orden que deseas mostrarlos
				</Subtitle>
			</Header>
			{families.map((family, index) => (
				<FamilyComponent
					key={index}
					family={family}
					index={index}
					onDelete={() => handleDelete(index)}
					onUpdateDetails={handleUpdateFamilyDetails}
				/>
			))}
			<TextButton text={"Agregar nueva familia"} onClick={handleAddFamily} />
			<CTAsContainer
				onClick1={() => {
					post();
				}}
				text1={"Guardar cambios"}
			/>

			{isDeleteModalVisible && (
				<Modal
					onClose={handleCancelDelete}
					title={"Borrar familia"}
					msg={"Ten en cuenta que no podrás recuperarla."}
					text1={"Borrar"}
					onClick1={handleConfirmDelete}
					text2={"Cancelar"}
					onClick2={handleCancelDelete}
				/>
			)}
		</StyledView>
	);
};

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 3rem;
	margin: auto;
	overflow-y: auto;
	padding: 10vh 4vw 10vh 4vw;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 1rem;
	}
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

const Title = styled.h6`
	margin: 0;
`;

const Subtitle = styled.span`
	font-size: 1rem;
	font-weight: 500;
	margin: 0;
`;
