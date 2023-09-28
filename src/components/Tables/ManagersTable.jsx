import styled from "styled-components";
import { useEffect, useState } from "react";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllUsers,
	updateDisableUser,
	updateUserRole,
} from "../../redux/actions/actions";
import { Modal } from "../Modal/Modal";
import { Input } from "../Input/Input";

export const ManagersTable = () => {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.users);
	const userLogged = useSelector((state) => state.userLogged);
	const userLoggedId = userLogged.id;
	const [confirmationUpdateRole, setConfirmationUpdateRole] = useState(false);
	const [confirmationUpdateDisable, setConfirmationUpdateDisable] =
		useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredData([]);
		} else {
			const filteredResults = filteredUsers.filter(
				(user) =>
					user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredData(filteredResults);
		}
	}, [allUsers, searchTerm]);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	const filteredUsers = allUsers?.filter(
		(user) => user.role === "Manager" || user.role === "Customer"
	);

	filteredUsers.sort((a, b) => {
		const displayNameA = (a.displayName || "").toLowerCase();
		const displayNameB = (b.displayName || "").toLowerCase();
		return displayNameA.localeCompare(displayNameB);
	});

	const [data, setData] = useState(filteredUsers);

	const handleToggleDisable = (index, user) => {
		const updatedData = [...data];
		updatedData[index].disable = user.disable;
		const checked = !updatedData[index].disable;
		const userId = updatedData[index].id;

		setData(updatedData);
		setConfirmationUpdateDisable(null);

		dispatch(updateDisableUser(userLoggedId, userId, checked));
	};

	const handleRole = (user) => {
		const newRole = user.role === "Manager" ? "Customer" : "Manager";
		const updatedUserData = { id: user.id, role: newRole };

		dispatch(updateUserRole(updatedUserData));

		const updatedData = [...data];
		const updatedUserIndex = updatedData.findIndex((u) => u.id === user.id);
		if (updatedUserIndex !== -1) {
			updatedData[updatedUserIndex].role = newRole;
			setData(updatedData);
		}

		setConfirmationUpdateRole(false);
	};

	return (
		<TableContainer>
			<>
				{!filteredData ? (
					<Modal isLoader={true} title={"Cargando información"} />
				) : (
					<>
						<SearchBarContainer>
							<SearchBar
								type="text"
								placeholder="Buscar por nombre o correo"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</SearchBarContainer>
						<StyledTable>
							<StyledTHead>
								<tr>
									<th>Nombre</th>
									<th>Correo</th>
									<th>Manager</th>
									<th>Activo</th>
								</tr>
							</StyledTHead>
							<tbody>
								{!filteredData.length
									? filteredUsers.map((user, index) => (
											<StyledRow key={index}>
												<>
													<TableCell1>
														<RowContent>{user.displayName}</RowContent>
													</TableCell1>
													<TableCell2>
														<RowContent>{user.email}</RowContent>
													</TableCell2>
													<TableCell3>
														<ToggleButton
															isChecked={user.role === "Manager"}
															onChange={() => setConfirmationUpdateRole(user)}
														></ToggleButton>
														{confirmationUpdateRole === user && (
															<Modal
																onClose={() => setConfirmationUpdateRole(null)}
																title={"Cambiar rol de usuario"}
																msg={
																	user.role === "Customer"
																		? "¿Quieres hacerlo manager?"
																		: "¿Quieres que deje de ser manager?"
																}
																text1={"Confirmar"}
																onClick1={() => {
																	handleRole(user);
																}}
																text2={"Cancelar"}
																onClick2={() => setConfirmationUpdateRole(null)}
															/>
														)}
													</TableCell3>
													<TableCell4>
														<ToggleButton
															isChecked={!user.disable}
															onChange={() => {
																setConfirmationUpdateDisable(user);
																handleToggleDisable(index, user);
															}}
														/>
														{confirmationUpdateDisable === user && (
															<Modal
																onClose={() =>
																	setConfirmationUpdateDisable(false)
																}
																title={
																	user.disable
																		? "Habilitar usuario"
																		: "Deshabilitar usuario"
																}
																msg={
																	user.disable
																		? "Este usuario podrá iniciar sesión y hacer compras nuevamente. ¿Quieres habilitarlo?"
																		: "Este usuario no podrá iniciar sesión en la app hasta que lo habilites de nuevo. ¿Quieres deshabilitarlo?"
																}
																text1={
																	user.disable ? "Habilitar" : "Deshabilitar"
																}
																onClick1={() => {
																	setConfirmationUpdateDisable(false);
																	handleToggleDisable(index, !user.disable);
																}}
																text2={"Cancelar"}
																onClick2={() =>
																	setConfirmationUpdateDisable(false)
																}
															/>
														)}
													</TableCell4>
												</>
											</StyledRow>
									  ))
									: filteredData.map((user, index) => (
											<StyledRow key={index}>
												<>
													<TableCell1>
														<RowContent>{user.displayName}</RowContent>
													</TableCell1>
													<TableCell2>
														<RowContent>{user.email}</RowContent>
													</TableCell2>
													<TableCell3>
														<ToggleButton
															isChecked={user.role === "Manager"}
															onChange={() => setConfirmationUpdateRole(user)}
														></ToggleButton>
														{confirmationUpdateRole === user && (
															<Modal
																onClose={() => setConfirmationUpdateRole(null)}
																title={"Cambiar rol de usuario"}
																msg={
																	user.role === "Customer"
																		? "¿Quieres hacerlo manager?"
																		: "¿Quieres que deje de ser manager?"
																}
																text1={"Confirmar"}
																onClick1={() => {
																	handleRole(user);
																}}
																text2={"Cancelar"}
																onClick2={() => setConfirmationUpdateRole(null)}
															/>
														)}
													</TableCell3>
													<TableCell4>
														<ToggleButton
															isChecked={!user.disable}
															onChange={() => {
																setConfirmationUpdateDisable(user);
															}}
														/>
														{confirmationUpdateDisable === user && (
															<Modal
																onClose={() =>
																	setConfirmationUpdateDisable(null)
																}
																title={
																	user.disable
																		? "Habilitar usuario"
																		: "Deshabilitar usuario"
																}
																msg={
																	user.disable
																		? "Este usuario podrá iniciar sesión y hacer compras nuevamente. ¿Quieres habilitarlo?"
																		: "Este usuario no podrá iniciar sesión en la app hasta que lo habilites de nuevo. ¿Quieres deshabilitarlo?"
																}
																text1={
																	user.disable ? "Habilitar" : "Deshabilitar"
																}
																onClick1={() => {
																	handleToggleDisable(index, user);
																}}
																text2={"Cancelar"}
																onClick2={() =>
																	setConfirmationUpdateDisable(null)
																}
															/>
														)}
													</TableCell4>
												</>
											</StyledRow>
									  ))}
							</tbody>
						</StyledTable>
					</>
				)}
			</>
		</TableContainer>
	);
};

const StyledTable = styled.table`
	border-collapse: collapse;
`;

const TableContainer = styled.div`
	padding: 5rem 2rem;
	width: 100%;
	height: auto;
	display: flex;
	gap: 2rem;
	flex-direction: column;
`;

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 4rem;
	background: ${(props) => props.theme.primary};
	position: sticky;
	top: 0;
	z-index: 4;
`;

const SearchBar = styled(Input)`
	width: 30%;
`;

const StyledTHead = styled.thead`
	background: ${(props) => props.theme.primary};
	position: sticky;
	top: 4rem;
	box-shadow: ${(props) => props.theme.theadBorder};
	z-index: 4;
`;

const StyledRow = styled.tr`
	border-bottom: 1px solid ${(props) => props.theme.focus};
	align-items: center;
	justify-content: center;
	&:hover {
		background: ${(props) => props.theme.focus};
		color: ${(props) => props.theme.secondary};
	}
`;

const TableCell1 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`;

const TableCell2 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`;

const TableCell3 = styled.td`
	padding: 0.5rem 1rem;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
`;

const TableCell4 = styled.td`
	padding: 0.5rem 1rem;
	width: 5rem;
	box-sizing: border-box;
`;

const RowContent = styled.span`
	display: flex;
	justify-content: center;
	font-size: 1rem;
`;
