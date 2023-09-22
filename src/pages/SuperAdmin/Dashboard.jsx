import styled from "styled-components";
import { TextButton } from "../../components/TextButton/TextButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faPepperHot } from "@fortawesome/free-solid-svg-icons";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { ArticlesTable } from "../../components/Tables/ArticlesTable";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { ManagersTable } from "../../components/Tables/ManagersTable";
import { OrdersTable } from "../../components/Tables/OrdersTable";

export const Dashboard = ({ themeToggler, currentTheme }) => {
  const location = useLocation().pathname;

  const isArticles = location === "/dashboard/articles";
  const isManagers = location === "/dashboard/managers";
  const isOrders = location === "/dashboard/orders";
  // const isAccount = location === "/dashboard/account";

  const LinkStyles = {
    fontSize: "4rem",
    textAlign: "middle",
  };
  return (
    <StyledView>
      <SideMenu>
        <NavLink to={"/manager/"}><FontAwesomeIcon icon={faPepperHot} style={LinkStyles} /></NavLink>
        <ButtonsContainer>
          <NavLink to={"/dashboard/articles"}>
            <SideMenuButton isActive={isArticles} text={"Artículos"} />
          </NavLink>
          <NavLink to={"/dashboard/managers"}>
            <SideMenuButton isActive={isManagers} text={"Managers"} />
          </NavLink>
          <NavLink to={"/dashboard/orders"}>
            <SideMenuButton isActive={isOrders} text={"Órdenes"} />
          </NavLink>
          {/* <NavLink to={"/dashboard/account"}>
						<SideMenuButton isActive={isAccount} text={"Cuenta"} />
					</NavLink> */}
          <NavLink to={"/manager/"}>
            <SideMenuButton text={"Manager mode"} />
          </NavLink>
          <NavLink to={"/customer/"}>
            <SideMenuButton text={"Customer mode"} />
          </NavLink>
        </ButtonsContainer>
        <CircleButton
          className={`big ${
            currentTheme === "dark" ? "dark-theme" : "light-theme"
          }`}
          onClick={() => {
            themeToggler();
          }}
          icon={currentTheme === "dark" ? faSun : faMoon}
        />
        <SideMenuButton text={"Salir"} />
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
  width: 15rem;
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
  padding: 3rem 0;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  flex: 1 0 0;
`;

const SideMenuButton = styled(TextButton)`
  width: 12rem;
  box-sizing: border-box;
/* 
  &.active {
    width: 12rem;
    box-sizing: border-box;
	background-color: red;
  } */
`;
