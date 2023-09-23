import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../redux/actions/actions";
import styled from "styled-components";

export const OrdersTable = () => {
	const dispatch = useDispatch();
	const [orders, setOrders] = useState([]);
	const [sortColumn, setSortColumn] = useState("");
	const [sortDirection, setSortDirection] = useState("asc");
	console.log(orders);

	useEffect(() => {
		const ordersTotal = async () => {
			try {
				const orderData = await dispatch(getAllOrders());
				setOrders(orderData.payload);
			} catch (error) {
				console.error("Error al obtener datos:", error);
			}
		};

		ordersTotal();
	}, [dispatch]);

	useEffect(() => {
		const sortedOrders = [...orders].sort((a, b) => {
			if (sortColumn === "id") {
				return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
			} else if (sortColumn === "total") {
				return sortDirection === "asc" ? a.total - b.total : b.total - a.total;
			} else if (sortColumn === "status") {
				return sortDirection === "asc"
					? a.status.localeCompare(b.status)
					: b.status.localeCompare(a.status);
			}
			return 0;
		});
		setOrders(sortedOrders);
	}, [sortColumn, sortDirection]);

	const handleSort = (column) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	return (
		<TableContainer>
			<div>
				<table>
					<thead>
						<StyledRow>
							<TableHeader onClick={() => handleSort("id")}>Orden</TableHeader>
							<TableHeader onClick={() => handleSort("status")}>
								Estado
							</TableHeader>
							<TableHeader onClick={() => handleSort("total")}>
								Precio total
							</TableHeader>
							<th>Artículos</th>
						</StyledRow>
					</thead>
					<tbody>
						{orders?.map((order) => (
							<StyledRow key={order.id}>
								<TableCell2>{order.id}</TableCell2>
								<TableCell3>{order.status}</TableCell3>
								<TableCell4> ${order.total}</TableCell4>
								<TableCell5>
									<ul>
										{order.OrderDetails?.map((item) => (
											<li key={item.id}>
												{item.Product.name} - {item.amount}
											</li>
										))}
									</ul>
								</TableCell5>
							</StyledRow>
						))}
					</tbody>
				</table>
			</div>
		</TableContainer>
	);
};

const TableContainer = styled.div`
	margin-top: 5rem;
	height: auto;
	display: flex;
	gap: 10rem;
	flex-direction: column;
`;

const TableCell2 = styled.td`
	padding: 0.5rem 1rem;
	width: 20rem;
	box-sizing: border-box;
`;

const TableCell3 = styled.td`
	padding: 0.5rem 1rem;
	width: 20rem;
	box-sizing: border-box;
`;

const TableCell4 = styled.td`
	padding: 0.5rem 1rem;
	width: 20rem;
	box-sizing: border-box;
`;

const TableCell5 = styled.td`
	padding: 0.5rem 1rem;
	width: 5rem;
	box-sizing: border-box;
`;
const StyledRow = styled.tr`
	border-bottom: 1px solid #ccc;

	&:hover {
		background-color: #f2f2f2;
	}
`;
const TableHeader = styled.th`
	padding: 0.5rem 1rem;
	cursor: pointer;

	&:hover {
		background-color: #979393;
	}
`;
