import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { NavBar } from './components/Nav/NavBar'

import GlobalStyle from './assets/GlobalStyles'
import themes from './assets/themes'
import { Cart } from './pages/CartPage/Cart'
import { Home } from './pages/HomePage/Home'

function App() {
	const [theme, setTheme] = useState('light')
	const { pathname } = useLocation()
	const themeToggler = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark')
	}

	return (
		<ThemeProvider theme={theme === 'dark' ? themes.dark : themes.light}>
			<GlobalStyle />
			<div className="App">
				{pathname !== '/' && <NavBar themeToggler={themeToggler} currentTheme={theme} />}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</div>
		</ThemeProvider>
	)
}

export default App
