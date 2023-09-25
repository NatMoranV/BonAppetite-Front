import styled from "styled-components";
import { useEffect, useState } from "react";
import { CTAsContainer } from "../CTAs/CTAsContainer";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllUsers,
	updateDisableUser,
	updateUserRole,
} from "../../redux/actions/actions";

export const ManagersTable = () => {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.users);
	const userLogged = useSelector((state) => state.userLogged);
	const userLoggedId = userLogged.id;

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	const filteredUsers = allUsers.filter(
		(user) => user.role === "Manager" || user.role === "Customer"
	);
	const [data, setData] = useState(filteredUsers);
	const [managerState, setManagerState] = useState(
		data.map((row) => row.role === "Manager")
	);

	const handleToggleDisable = (index) => {
		const updatedData = [...data];
		updatedData[index].disable = event.target.checked;
		const checked = updatedData[index].disable;
		const userId = updatedData[index].id;

		setData(updatedData);

		dispatch(updateDisableUser(userLoggedId, userId, checked));
	};
	const handleToggleRole = (index) => {
		const updatedManagerState = [...managerState];
		updatedManagerState[index] = !updatedManagerState[index];
		setManagerState(updatedManagerState);

		const updatedData = data.map((row, i) => ({
			...row,
			role: updatedManagerState[i] ? "Manager" : "Customer",
		}));

		setData(updatedData);
		const dataToUpdate = {
			id: updatedData[index].id,
			role: updatedData[index].role,
		};
		console.log(dataToUpdate);
		dispatch(updateUserRole(dataToUpdate));
	};

	const handleSubmit = () => {
		// console.log(data);
	};

	return (
		<TableContainer>
			<>
				<table>
					<thead>
						<tr>
							{/* <th>Imagen</th> */}
							<th>Nombre</th>
							<th>Email</th>
							<th>Enable</th>
							<th>Manager</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{data.map((user, index) => (
							<StyledRow key={index}>
								<TableCell2>
									<p>{user.displayName}</p>
								</TableCell2>
								<TableCell3>
									<p>{user.email}</p>
								</TableCell3>
								<TableCell4>
									<ToggleButton
										isChecked={user.disable}
										onChange={(isChecked) =>
											handleToggleDisable(index, isChecked)
										}
									/>
								</TableCell4>
								<TableCell5>
									<ToggleButton
										isChecked={managerState[index]}
										onChange={() => handleToggleRole(index)}
									/>
								</TableCell5>
							</StyledRow>
						))}
					</tbody>
				</table>
			</>
			<CTAsContainer
				className={"float"}
				text1={"Guardar Cambios"}
				onClick1={handleSubmit}
			/>
		</TableContainer>
	);
};

const TableContainer = styled.div`
	padding: 5rem 2rem;
	width: 100%;
	height: auto;
	display: flex;
	gap: 2rem;
	flex-direction: column;
	overflow-x: auto;
`;

const StyledRow = styled.tr`
	align-items: center;
	justify-content: center;
	&:hover {
		background: ${(props) => props.theme.focus};
		color: ${(props) => props.theme.secondary};
	}
`;

const TableCell2 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`;

const TableCell3 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`;

const TableCell4 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`;

const TableCell5 = styled.td`
	padding: 0.5rem 1rem;
	width: 5rem;
	box-sizing: border-box;
`;

const TableCell6 = styled.td`
	padding: 0.5rem 1rem;
	width: 2rem;
	box-sizing: border-box;
`;
