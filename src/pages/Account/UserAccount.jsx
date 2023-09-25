import { useNavigate } from "react-router-dom";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { passwordChange } from "../../redux/actions/actions";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";

export const UserAccount = () => {
	const user = useSelector((state) => state.userLogged);

	const [confirmation, setConfirmation] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePasswordChange = () => {
		setConfirmation(true);
	};

	const confirmPasswordChange = () => {
		dispatch(passwordChange({ email: user.email }));
	};

	const navigateOrders = () => {
		navigate("/customer/account/orders/:referrer");
	};

	var nameParts = user.name.split(" ");

	for (var i = 0; i < nameParts.length; i++) {
		nameParts[i] = nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
	}

	var capitalizedFullName = nameParts.join(" ");

	return (
		<StyledView>
			<h1>Hola, {capitalizedFullName}</h1>

			<CTAsContainer text1={"Mis órdenes"} onClick1={navigateOrders} />

			<CTAsContainer
				text1={"Cambiar contraseña"}
				onClick1={handlePasswordChange}
			/>

			{confirmation && (
				<Modal
					onClose={() => {
						setConfirmation(false);
					}}
					title={"¿Está seguro?"}
					msg="Se le enviará un mail para cambiarla."
					text1={"Cambiar"}
					onClick1={() => {
						setConfirmation(false);
						confirmPasswordChange;
						setSuccessMessage(true);
					}}
				/>
			)}
			{successMessage && (
				<Modal
					onClose={() => {
						setSuccessMessage(false);
					}}
					title={"Revise la casilla de correo"}
					msg="El mail ha sido enviado con éxito."
					text1={"Aceptar"}
					onClick1={() => {
						setSuccessMessage(false);
					}}
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
	box-sizing: border-box;
	padding: 12vh 1rem 25vh 1rem;
	transition: width 0.3s ease-in-out;
	gap: 3rem;

	@media (min-width: 870px) {
		margin: auto;
		flex-direction: column;
		width: 80%;
		align-items: flex-start;
		justify-content: center;
		padding: 15vh 1rem 3vh 1rem;
	}
	@media (max-width: 1418px) {
		width: 90%;
	}
	@media (max-width: 1256px) {
		width: 100%;
	}
`;
