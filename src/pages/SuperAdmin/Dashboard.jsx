import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMoon,
	faSun,
	faPepperHot,
	faListUl,
	faUsers,
	faBurger,
	faUser,
	faChalkboardUser,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { ArticlesTable } from "../../components/Tables/ArticlesTable";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { ManagersTable } from "../../components/Tables/ManagersTable";
import { OrdersTable } from "../../components/Tables/OrdersTable";
import { DashboardButton } from "../../components/DashboardButton/DashboardButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Dashboard = ({ themeToggler, currentTheme }) => {
	const location = useLocation().pathname;
	const isArticles = location === "/dashboard/articles/";
	const isManagers = location === "/dashboard/managers/";
	const isOrders = location === "/dashboard/orders/";
	// const isAccount = location === "/dashboard/account";
	const navigate = useNavigate();
	const userRole = useSelector((state) => state.userLogged);
	useEffect(() => {
		if (userRole.role !== "Admin") {
			navigate("/");
		}
	}, [navigate]);

	const buttonsArray = [
		{
			icon: faBurger,
			text: "Platillos",
			linkTo: "/dashboard/articles/",
			isActive: isArticles,
		},
		{
			icon: faUsers,
			text: "Managers",
			linkTo: "/dashboard/managers/",
			isActive: isManagers,
		},
		{
			icon: faListUl,
			text: "Órdenes",
			linkTo: "/dashboard/orders/",
			isActive: isOrders,
		},
		{ icon: faUserPlus, text: "Manager view", linkTo: "/manager/" },
		{ icon: faUser, text: "Customer view", linkTo: "/customer/" },
	];

	const [hovered, setHovered] = useState(false);

	const handleMouseEnter = () => {
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
	};

	return (
		<StyledView>
			<SideMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<NavLink to={"/manager/"}>
					<TheIcon icon={faPepperHot} />
				</NavLink>
				<ButtonsContainer>
					{buttonsArray.map((button, i) => (
						<NavLink key={i} to={button.linkTo}>
							<DashboardButton
								hovered={hovered}
								icon={button.icon}
								isActive={button.isActive}
								text={button.text}
							/>
						</NavLink>
					))}
				</ButtonsContainer>
				<DarkButton
					className={` ${
						currentTheme === "dark" ? "dark-theme" : "light-theme"
					}`}
					onClick={() => {
						themeToggler();
					}}
					icon={currentTheme === "dark" ? faSun : faMoon}
				/>
			</SideMenu>
			{isArticles && <ArticlesTable />}
			{isManagers && <ManagersTable />}
			{isOrders && <OrdersTable />}
		</StyledView>
	);
};

const StyledView = styled.div`
	display: flex;
	gap: 1rem;
	padding-left: 0;
`;

const TheIcon = styled(FontAwesomeIcon)`
	font-size: 2rem;
	transition: all 0.5s ease-in-out;
	transition-delay: 0.8s;
`;

const DarkButton = styled(CircleButton)`
	transition: all 0.5s ease-in-out;
	transition-delay: 0.8s;
`;

const SideMenu = styled.div`
	display: flex;
	width: 4rem;
	height: 100vh;
	box-sizing: border-box;
	padding: 1.5rem 1rem;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	left: 0;
	top: 0;
	gap: 2rem;
	border-radius: 0 1rem 1rem 0;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.largeShadow};
	z-index: 3;
	transition: all 0.5s ease-out;
	transition-delay: 0.8s;

	@media (max-width: 800px) {
		height: 89.5vh;
	}

	&:hover {
		align-items: center;
		width: 15rem;

		${StyledView} {
			padding-left: 10rem;
		}

		& ${DarkButton} {
			transform: scale(2);
		}

		& ${TheIcon} {
			transform: scale(2);
		}
	}
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
	flex: 1 0 0;
`;
