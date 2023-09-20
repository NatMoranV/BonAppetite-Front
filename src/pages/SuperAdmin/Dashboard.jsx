import styled from "styled-components";
import { TextButton } from "../../components/TextButton/TextButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { ArticlesTable } from "../../components/Tables/ArticlesTable";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { ManagersTable } from "../../components/Tables/ManagersTable";
import { OrdersTable } from "../../components/Tables/OrdersTable";

export const Dashboard = () => {
	const location = useLocation().pathname;

	const isArticles = location === "/dashboard/articles";
	const isManagers = location === "/dashboard/managers";
	const isOrders = location === "/dashboard/orders";
	const isAccount = location === "/dashboard/account";

	const LinkStyles = {
		fontSize: "4rem",
		textAlign: "middle",
	};
	return (
		<StyledView>
			<SideMenu>
				<FontAwesomeIcon icon={faPepperHot} style={LinkStyles} />
				<ButtonsContainer>
					<NavLink to={"/dashboard/articles"}>
						<TextButton isActive={isArticles} text={"Artículos"} />
					</NavLink>
					<NavLink to={"/dashboard/managers"}>
						<TextButton isActive={isManagers} text={"Managers"} />
					</NavLink>
					<NavLink to={"/dashboard/orders"}>
						<TextButton isActive={isOrders} text={"Órdenes"} />
					</NavLink>
					<NavLink to={"/dashboard/account"}>
						<TextButton isActive={isAccount} text={"Cuenta"} />
					</NavLink>
				</ButtonsContainer>
				<CircleButton className={"big"} icon={faMoon} />
				<TextButton text={"Salir"} />
			</SideMenu>
			{isArticles && <ArticlesTable />}
			{isManagers && <ManagersTable />}
			{isOrders && <OrdersTable />}
		</StyledView>
	);
};

const StyledView = styled.div`
	padding: 0 0 0 10rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

const SideMenu = styled.div`
	display: flex;
	width: 10rem;
	height: 100%;
	box-sizing: border-box;
	padding: 1.5rem 1rem;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	left: 0;
	top: 0;
	gap: 2rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.largeShadow};
`;

const ButtonsContainer = styled.div`
	display: flex;
	width: 7.5625rem;
	padding: 3rem var(--Qty, 0rem);
	flex-direction: column;
	align-items: flex-start;
	gap: 1.5rem;
	flex: 1 0 0;
`;
