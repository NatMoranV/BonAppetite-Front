import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { NavBar } from './components/Nav/NavBar'

import GlobalStyle from './assets/GlobalStyles'
import themes from './assets/themes'
import { Cart } from './pages/CartPage/Cart'
import { Home } from './pages/HomePage/Home'
import { LoadingApp } from './pages/LoadingApp/LoadingApp'
import { CustomerLogin } from './pages/CustomerLogin/CustomerLogin'
import { AdminLogin } from './pages/AdminLogin/AdminLogin'
import { KitchenView } from './pages/KitchenView/KitchenView'

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
				{pathname !== '/' ||
					'/admin' ||
					('/login' && <NavBar themeToggler={themeToggler} currentTheme={theme} />)}
				<Routes>
					<Route path="/" element={<LoadingApp />} />
					<Route path="/login" element={<CustomerLogin />} />
					<Route path="/admin" element={<AdminLogin />} />
					<Route path="/home" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/kitchenView" element={<KitchenView />} />
				</Routes>
			</div>
		</ThemeProvider>
	)
}

export default App
