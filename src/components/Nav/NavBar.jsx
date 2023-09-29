/* eslint-disable react/prop-types */
import {
  faArrowLeft,
  faBasketShopping,
  faEllipsisVertical,
  faList,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { CircleButton } from "../CircleButton/CircleButton";
import { TextButton } from "../TextButton/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { addUrl, logged, addUserLogged } from "../../redux/actions/actions";
import useAutoSignin from "../../utils/useAutoSignin";
import { Dropdown } from "../Dropdown/StyledDropdown";
import { Modal } from "../Modal/Modal";

export const NavBar = ({ themeToggler, currentTheme }) => {
  const master = useSelector((state) => state.master);
  const authCompleted = useAutoSignin();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const log = useSelector((state) => state.logged);
  const userRole = useSelector((state) => state.userLogged);
  const dispatch = useDispatch();
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const [showModal, setShowModal] = useState(false);
  const location = useLocation().pathname;
  const isHome = location === "/customer/" || location === "/manager/";
  const isBasket = location.includes("basket");
  const isOrders = location === "/manager/orders/";
  const isReview = location.startsWith("/review/");
  const isKitchen = location === "/kitchenView/";

  const isManagerView = location.startsWith("/manager/");

  const login = () => {
    dispatch(addUrl(location));
  };
  const logout = () => {
    dispatch(addUrl(location));
    dispatch(logged(false));
    dispatch(
      addUserLogged({
        id: "",
        email: "",
        role: "",
        name: "",
      })
    );
    localStorage.removeItem("accessToken");
    navigate(location);
    setShowModal(true);
  };

  setTimeout(() => {
    setShowModal(false);
  }, 5000);

  useEffect(() => {

		if (
			userRole.role !== 'Manager' &&
			location === '/manager/' &&
			userRole.role !== 'Admin' &&
			location === '/manager/'
		) {
			navigate('/')
		
	}

    function handleResize() {
      if (window.innerWidth >= 650) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate,location,userRole]);

  const [confirmationPassword, setConfirmationPassword] = useState(false);
  const [confirmationLogout, setConfirmationLogout] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handlePasswordChange = () => {
    setConfirmationPassword(true);
  };

  const handleLogout = () => {
    setConfirmationLogout(true);
  };

  const confirmPasswordChange = () => {
    dispatch(passwordChange({ email: user.email }));
  };

  const navigateOrders = () => {
    navigate("/customer/orders/");
  };

  const [selectedOption, setSelectedOption] = useState("Mi cuenta");

  const accountActions = [
    {
      display: "Cerrar sesión",
      action: handleLogout,
    },
    { display: "Cambiar contraseña", action: handlePasswordChange },
  ];

  const dropdownOptions = accountActions.map((option) => option.display);

  const handleActions = (display) => {
    const selectedAction = accountActions.find(
      (option) => option.display === display
    );

    if (selectedAction && selectedAction.action) {
      selectedAction.action();
      setSelectedOption("Mi cuenta"); // Reset the dropdown to "Mi cuenta"
    }
  };

  return (
    <>
      {master.length > 0 ? (
        <StyledNavBarContainer $isOpen={isMenuOpen} $isReview={isReview}>
          {confirmationPassword && (
            <Modal
              onClose={() => {
                setConfirmationPassword(false);
              }}
              title={"Cambio de contraseña"}
              msg="Se le enviará un correo para cambiarla"
              text1={"Solicitar correo"}
              onClick1={() => {
                setConfirmationPassword(false);
                confirmPasswordChange;
                setSuccessMessage(true);
              }}
            />
          )}
          {confirmationLogout && (
            <Modal
              onClose={() => {
                setConfirmationLogout(false);
              }}
              title={"Cerrar sesión"}
              msg="Para ver tus órdenes pendientes debes tener tu sesión iniciada"
              text1={"Cerrar sesión"}
              onClick1={() => {
                setConfirmationLogout(false);
                logout();
              }}
            />
          )}
          {successMessage && (
            <Modal
              onClose={() => {
                setSuccessMessage(false);
              }}
              title={"Correo enviado"}
              msg="Revisa tus correos nuevos para actualizar tu contraseña"
              text1={"Aceptar"}
              onClick1={() => {
                setSuccessMessage(false);
              }}
            />
          )}
          {isReview || isKitchen ? (
            <>
              <NavLink to={isReview ? "/" : null}>
                <Logo />
              </NavLink>
              <CircleButton
                className={` ${
                  currentTheme === "dark" ? "dark-theme" : "light-theme"
                }`}
                onClick={() => {
                  themeToggler();
                  closeMenu();
                }}
                icon={currentTheme === "dark" ? faSun : faMoon}
              />
            </>
          ) : (
            <>
              <MenuButton>
                <NavLink
                  to={!isHome ? (isManagerView ? "/manager/" : "/") : null}
                >
                  <CircleButton
                    icon={!isHome ? faArrowLeft : faEllipsisVertical}
                    className={` ${isMenuOpen ? "active" : ""}`}
                    onClick={isHome ? () => setIsMenuOpen(!isMenuOpen) : null}
                  />
                </NavLink>
              </MenuButton>

              <NavLink to={isManagerView ? "/manager/" : "/"}>
                <Logo onClick={closeMenu} />
              </NavLink>

              <RightButton>
                {isManagerView ? (
                  <NavLink to="/manager/orders/">
                    <CircleButton
                      isActive={isOrders}
                      icon={faList}
                      onClick={closeMenu}
                    />
                  </NavLink>
                ) : (
                  <NavLink to="/customer/basket/">
                    <CircleButton
                      isActive={isBasket}
                      icon={faBasketShopping}
                      onClick={closeMenu}
                    />
                  </NavLink>
                )}
              </RightButton>

              <NavLinks $isOpen={isMenuOpen}>
                {userRole.role === "Admin" && (
                  <>
                    <NavLink to={isManagerView ? "/" : "/manager/"}>
                      <TextButton
                        text={isManagerView ? "Customer mode" : "Manager mode"}
                        onClick={closeMenu}
                      />
                    </NavLink>
                    <NavLink to={"/dashboard/"}>
                      <TextButton text={"Admin Mode"} onClick={closeMenu} />
                    </NavLink>
                  </>
                )}
                {userRole.role === "Manager" && (
                  <NavLink to={isManagerView ? "/" : "/manager/"}>
                    <TextButton
                      text={isManagerView ? "Customer mode" : "Manager mode"}
                      onClick={closeMenu}
                    />
                  </NavLink>
                )}

                <NavLink
                  to={isManagerView ? "/manager/orders/" : "/customer/orders/"}
                >
                  {log && (
                    <TextButton text={"Ver órdenes"} onClick={closeMenu} />
                  )}
                </NavLink>

                {isManagerView && (
                  <NavLink to="/manager/families">
                    <TextButton text={"Editar familias"} onClick={closeMenu} />
                  </NavLink>
                )}
                {!isManagerView && (
                  <NavLink to={log ? location : "customer/login/"}>
                    {authCompleted ? (
                      !log ? (
                        <TextButton
                          text={"Iniciar Sesion"}
                          onClick={() => {
                            closeMenu();
                            login();
                          }}
                        />
                      ) : (
                        <Dropdown
                          array={dropdownOptions}
                          onChange={(e) => handleActions(e.target.value)}
                          visibleOption1={"Mi cuenta"}
                          selectedValue={selectedOption}
                        />
                      )
                    ) : (
                      <TextButton text={"Cargando..."} />
                    )}
                  </NavLink>
                )}

                {!isManagerView && !isMenuOpen && (
                  <NavLink to="/customer/basket/">
                    <CircleButton
                      isActive={isBasket}
                      icon={faBasketShopping}
                      onClick={closeMenu}
                    />
                  </NavLink>
                )}
                <CircleButton
                  className={` ${
                    currentTheme === "dark" ? "dark-theme" : "light-theme"
                  }`}
                  onClick={() => {
                    themeToggler();
                    closeMenu();
                  }}
                  icon={currentTheme === "dark" ? faSun : faMoon}
                />
              </NavLinks>
            </>
          )}
          {showModal && (
            <Modal
              onClose={() => {
                setShowModal(false);
              }}
              title={"Sesión cerrada"}
            />
          )}
        </StyledNavBarContainer>
      ) : null}
    </>
  );
};

const StyledNavBarContainer = styled.nav`
  display: flex;
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  border-radius: 0rem 0rem 2rem 2rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.largeShadow};

  ${(props) =>
    props.$isOpen &&
    `
  
  height: auto;

  `}

  a {
    text-decoration: none;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: space-between;
    padding-top: 1rem;
    ${(props) =>
      props.$isReview &&
      `
      flex-direction: row;
    `}
  }
`;

const NavLinks = styled.div`
  pointer-events: all;
  opacity: 1;
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 800px) {
    padding: 2rem 0 1rem 0;
    gap: 1rem;
    pointer-events: none;
    opacity: 0;
    flex-direction: column;
  }

  ${(props) =>
    props.$isOpen &&
    `
    opacity: 1 !important;
    pointer-events: all !important;
    
  `}
`;

const MenuButton = styled.div`
  display: none;
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;

  @media (max-width: 800px) {
    display: flex;
  }
`;

const RightButton = styled.div`
  margin-left: auto;
  margin: 0 1rem 0 auto;
  display: none;

  @media (max-width: 800px) {
    margin: 0;
    position: absolute;
    right: 1.25rem;
    top: 1.25rem;
    display: flex;
  }
`;
