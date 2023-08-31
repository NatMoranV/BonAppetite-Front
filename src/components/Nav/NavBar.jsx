import { styled } from 'styled-components'

import { TextButton } from '../TextButton/TextButton'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
	faArrowLeft,
	faBasketShopping,
	faEllipsisVertical,
	faMoon,
	faSun,
} from '@fortawesome/free-solid-svg-icons'
import { CircleButton } from '../CircleButton/CircleButton'
import { Logo } from '../../assets/images/Logo/Logo'

const StyledNavBarContainer = styled.nav`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: ${(props) => (props.$isOpen ? '9rem' : '4rem')};
	box-sizing: border-box;
	padding: 0 1rem;
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

	@media (min-width: 768px) {
		flex-direction: initial;
		justify-content: space-between;
		padding-top: 2rem;
	}
`

const NavLinks = styled.div`
	pointer-events: ${(props) => (props.$isOpen ? '' : 'none')};
	top: ${(props) => (props.$isOpen ? '3rem' : '0')};
	opacity: ${(props) => (props.$isOpen ? 1 : 0)};
	transition: all ease-in-out 0.2s;
	display: flex;
	gap: 1rem;
	align-self: center;

	@media (min-width: 769px) {
		gap: 1rem;
		opacity: 1;
		pointer-events: all;
	}
`

const MenuButton = styled.div`
	display: none;
	position: absolute;
	top: 0.75rem;
	left: 1.4rem;

	@media (max-width: 768px) {
		display: flex;
	}
`

const BasketButton = styled.div`
	margin-left: auto;
	margin: 0 1rem 0 auto;

	@media (max-width: 768px) {
		margin: 0;
		position: absolute;
		right: 1.4rem;
		top: 0.75rem;
		display: flex;
	}
`

export const NavBar = ({ themeToggler, currentTheme }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const location = useLocation().pathname

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false)
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	console.log(location)
	return (
		<StyledNavBarContainer $isOpen={isMenuOpen}>
			<MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<CircleButton
					icon={location === '/' ? faEllipsisVertical : faArrowLeft}
					className={`small ${isMenuOpen ? 'active' : ''}`}
				/>
			</MenuButton>
			<NavLink className={'logo'} to="/">
				<Logo />
			</NavLink>

			<BasketButton>
				<NavLink to="/cart">
					<CircleButton icon={faBasketShopping} className={`small`} />
				</NavLink>
			</BasketButton>

			<NavLinks $isOpen={isMenuOpen}>
				<CircleButton
					className={`small ${currentTheme === 'dark' ? 'dark-theme' : 'light-theme'}`}
					onClick={themeToggler}
					icon={currentTheme === 'dark' ? faSun : faMoon}></CircleButton>
			</NavLinks>
		</StyledNavBarContainer>
	)
}
