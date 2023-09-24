/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
	faCircleExclamation,
	faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Divider } from "../Divider/Divider";

const statusIcons = {
	ongoing: faClock,
	delayed: faCircleExclamation,
};

export const KitchenCard = ({ order }) => {
	const dispatch = useDispatch();
	const [currentStatus, setCurrentStatus] = useState(order.status);
	const [isDelayed, setIsDelayed] = useState(false);
	const isOngoing = currentStatus === "ongoing";

	return (
		<StyledCard>
			<Header>
				<TheIcon
					icon={statusIcons[currentStatus]}
					className={isDelayed ? "delayed" : currentStatus}
					$isDelayed={isDelayed}
				/>
				{/* {isOngoing || isDelayed ? (
					<>
						<Timer time={order.time} />
					</>
				) : (
					<>
						<Timer time={0} />
					</>
				)} */}
				<Order>Orden {order.id}</Order>
			</Header>
			<Divider />
			{order.OrderDetails.map((card) => {
				return (
					<StyledRow key={card.id}>
						<TableCell>
							<StyledImg src={card.Product.image} />
							<TableCell2>
								<RowContent>{card.Product.name}</RowContent>
								<RowContent>Cantidad: {card.amount}</RowContent>
							</TableCell2>
						</TableCell>
					</StyledRow>
				);
			})}

			{order.take_away && <TakeHome>Para llevar a casa</TakeHome>}
			{order.notes && <span>{order.notes}</span>}
		</StyledCard>
	);
};

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: fit-content;
	min-width: 18rem;
	padding: 2rem 1rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	transition: all 0.2s ease-in-out;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TheIcon = styled(FontAwesomeIcon)`
	font-size: 1.5rem;

	&&.delayed {
		path {
			fill: ${(props) => props.theme.warning};
		}
	}
`;

const Order = styled.span`
	text-align: center;
	font-size: 1.5rem;
	font-weight: 600;
`;

const TakeHome = styled.span`
	font-size: 1.3rem;
	font-weight: 600;
`;
const StyledRow = styled.tr`
	border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
	display: flex;
	padding: 0.5rem 1rem;
	width: 5rem;
	box-sizing: border-box;
`;

const TableCell2 = styled.td`
	padding: 0.5rem 1rem;
	width: 10rem;
	box-sizing: border-box;
`;
const StyledImg = styled.img`
	width: 6rem;
	height: 4rem;
	object-fit: cover;
	border-radius: 0.5rem;
`;

const RowContent = styled.span`
	font-size: 1rem;
	width: 100%;
	display: flex;
	padding-left: 1rem;
`;
