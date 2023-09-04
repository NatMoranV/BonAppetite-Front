import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { NavBar } from "./components/Nav/NavBar";

import GlobalStyle from "./assets/GlobalStyles";
import themes from "./assets/themes";
import { Basket } from "./pages/BasketPage/Basket";
import { Home } from "./pages/HomePage/Home";
import { HomeManager } from "./pages/HomePage/HomeManager";
import { LoadingApp } from "./pages/LoadingApp/LoadingApp";

import { AdminLogin } from "./pages/Admin/AdminLogin";
import { ManagerRegistry } from "./pages/Admin/AdminRegistry";
import { CustomerLogin } from "./pages/Customer/CustomerLogin";
import { CustomerPasswordRecovery } from "./pages/Customer/CustomerPasswordRecovery";
import { CustomerRecovery } from "./pages/Customer/CustomerRecovery";
import { CustomerRegistry } from "./pages/Customer/CustomerRegistry";
import { DetailPage } from "./pages/DetailPage/Detail";
import { KitchenView } from "./pages/KitchenView/KitchenView";
import { ManagerDetailPage } from "./pages/Admin/ManagerDetailPage";

function App() {
	const [theme, setTheme] = useState("light");
	const { pathname } = useLocation();

	const themeToggler = () => {
		theme === "dark" ? setTheme("light") : setTheme("dark");
	};

	const isCustomerRoute = pathname.startsWith("/customer");
	const isAdminRoute = pathname.startsWith("/admin");

	return (
		<ThemeProvider theme={theme === "dark" ? themes.dark : themes.light}>
			<GlobalStyle />
			<div className="App">
				{pathname !== "/" &&
					pathname !== "/" &&
					!isCustomerRoute &&
					!isAdminRoute && (
						<NavBar themeToggler={themeToggler} currentTheme={theme} />
					)}
				<Routes>
					<Route path="/" element={<LoadingApp />} />
					<Route exact path="/customer/login" element={<CustomerLogin />} />
					<Route
						exact
						path="/customer/registry"
						element={<CustomerRegistry />}
					/>
					<Route
						exact
						path="/customer/recovery"
						element={<CustomerRecovery />}
					/>
					<Route
						exact
						path="/customer/password"
						element={<CustomerPasswordRecovery />}
					/>
					<Route exact path="/admin/login" element={<AdminLogin />} />
					<Route exact path="/admin/registry" element={<ManagerRegistry />} />
					<Route exact path="/manager/home" element={<HomeManager />} />
					<Route
						exact
						path="/admin/detail/:id"
						element={<ManagerDetailPage />}
					/>
					<Route path="/home" element={<Home />} />
					<Route path="/basket" element={<Basket />} />
					<Route path="/home/detail/:id" element={<DetailPage />} />
					<Route path="/kitchenView" element={<KitchenView />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
