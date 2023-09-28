import styled from "styled-components";

import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { TextButton } from "../../components/TextButton/TextButton";

import { FamilyComponent } from "../../components/FamilyComponent/FamilyComponent";
import { useDispatch, useSelector } from "react-redux";
import {
	addFamily,
	deleteFamily,
	updateFamily,
} from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

export const EditFamilies = () => {
	const dispatch = useDispatch();
	const allFamilies = useSelector((state) => state.families);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [isConfirmation, setIsConfirmation] = useState(false);
	const [pendingActionIndex, setPendingActionIndex] = useState(null);
	const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);
	const [families, setFamilies] = useState(allFamilies || []);
	const navigate = useNavigate();
	const userRole = useSelector((state) => state.userLogged);

	useEffect(() => {
		if (userRole.role !== "Manager" && userRole.role !== "Admin") {
			navigate("/");
		}
	}, [navigate]);

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

			const updatedFamilies = [...families];
			updatedFamilies.splice(itemToDeleteIndex, 1);
			setFamilies(updatedFamilies);

			setIsDeleteModalVisible(false);
			setItemToDeleteIndex(null);
			dispatch(deleteFamily(familyIdToDelete));
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

	const handleSaveFamilyChanges = (index) => {
		setPendingActionIndex(index);
		setIsConfirmation(true);
	};
	const handleConfirmChanges = () => {
		if (pendingActionIndex !== null) {
			const familyToUpdate = families[pendingActionIndex];
			const { id, class: productClass, image } = familyToUpdate;
			if (!id) {
				if (productClass && image) {
					const newData = {
						productClass,
						image,
					};
					dispatch(addFamily(newData));
				}
			} else {
				dispatch(updateFamily(id, familyToUpdate));
			}
		}

		setIsConfirmation(false);
		setPendingActionIndex(null);
	};

	if (!allFamilies) {
		return <Modal isLoader title={"Cargando..."} />;
	}

	return (
		<StyledView>
			<Header>
				<Title>Familias</Title>
				<Subtitle>
					Ingresa las familias en el orden que deseas mostrarlos
				</Subtitle>
			</Header>
			{families?.map((family, index) => (
				<FamilyComponent
					key={index}
					family={family}
					index={index}
					onDelete={() => handleDelete(index)}
					onUpdateDetails={handleUpdateFamilyDetails}
					onSaveChanges={() => handleSaveFamilyChanges(index)}
					updateFamilyAction={updateFamily}
				/>
			))}
			<TextButton text={"Agregar nueva familia"} onClick={handleAddFamily} />

			{isConfirmation && (
				<Modal
					onClose={() => {
						setIsConfirmation(false);
						setPendingActionIndex(null);
					}}
					title={"Confirmar cambios"}
					msg={"¿Desea confirmar los cambios?"}
					text1={"Guardar"}
					onClick1={handleConfirmChanges}
					text2={"Cancelar"}
					onClick2={() => {
						setIsConfirmation(false);
						setPendingActionIndex(null);
					}}
				/>
			)}

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
