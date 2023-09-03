import {
  faArrowLeft,
  faBasketShopping,
  faEllipsisVertical,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { CircleButton } from "../CircleButton/CircleButton";

export const NavBar = ({ themeToggler, currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation().pathname;

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 650) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <StyledNavBarContainer $isOpen={isMenuOpen}>
      <MenuButton
        onClick={
          location !== "/home"
            ? () => goBack()
            : () => setIsMenuOpen(!isMenuOpen)
        }
      >
        <CircleButton
          icon={location !== "/home" ? faArrowLeft : faEllipsisVertical}
          className={` ${isMenuOpen ? "active" : ""}`}
        />
      </MenuButton>
      <Logo />

      <BasketButton>
        <NavLink to="/cart">
          <CircleButton icon={faBasketShopping} />
        </NavLink>
      </BasketButton>

      <NavLinks $isOpen={isMenuOpen}>
        <CircleButton
          className={` ${
            currentTheme === "dark" ? "dark-theme" : "light-theme"
          }`}
          onClick={themeToggler}
          icon={currentTheme === "dark" ? faSun : faMoon}
        ></CircleButton>
      </NavLinks>
    </StyledNavBarContainer>
  );
};

const StyledNavBarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => (props.$isOpen ? "9rem" : "4rem")};
  box-sizing: border-box;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 0rem 0rem 2rem 2rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.largeShadow};
  transition: height 0.3s ease-in-out;

  a {
    text-decoration: none;
  }

  @media (min-width: 650px) {
    flex-direction: initial;
    justify-content: space-between;
    padding-top: 2rem;
  }
`;

const NavLinks = styled.div`
  pointer-events: ${(props) => (props.$isOpen ? "" : "none")};
  top: ${(props) => (props.$isOpen ? "3rem" : "0")};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: all ease-in-out 0.2s;
  display: flex;
  gap: 1rem;
  align-self: center;

  @media (min-width: 650px) {
    gap: 1rem;
    opacity: 1;
    pointer-events: all;
  }
`;

const MenuButton = styled.div`
  display: none;
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;

  @media (max-width: 649px) {
    display: flex;
  }
`;

const BasketButton = styled.div`
  margin-left: auto;
  margin: 0 1rem 0 auto;

  @media (max-width: 649px) {
    margin: 0;
    position: absolute;
    right: 1.25rem;
    top: 1.25rem;
    display: flex;
  }
`;
