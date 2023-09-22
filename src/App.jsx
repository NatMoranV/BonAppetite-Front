import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { NavBar } from "./components/Nav/NavBar";

import GlobalStyle from "./assets/GlobalStyles";
import themes from "./assets/themes";
import { Basket } from "./pages/Basket/Basket";
import { Home } from "./pages/Home/Home";
import { LoadingApp } from "./pages/Loader/LoadingApp";

import { PasswordRecovery } from "./pages/Account/PasswordRecovery";
import { UserRecovery } from "./pages/Account/UserRecovery";
import { Registry } from "./pages/Account/Registry";
import { DetailPage } from "./pages/Detail/Detail";
import { KitchenView } from "./pages/KitchenView/KitchenView";
import { ArticleEdit } from "./pages/ExclusiveManager/ArticleEdit";
import { Login } from "./pages/Account/Login";
import { Dashboard } from "./pages/SuperAdmin/Dashboard";
import { ManagerOrders } from "./pages/ExclusiveManager/ManagerOrders";
import { CustomerOrders } from "./pages/CustomerOrders/CustomerOrders";
import { EditFamilies } from "./pages/ExclusiveManager/EditFamilies";
import { ReviewPage } from "./pages/Review/Review";
import { Sandbox } from "./pages/Sandbox/Sandbox";
import { UserAccount } from "./pages/Account/UserAccount";

function App() {
	const [theme, setTheme] = useState("light");
	const { pathname } = useLocation();

	const themeToggler = () => {
		theme === "dark" ? setTheme("light") : setTheme("dark");
	};
	const keywords = ["registry", "recovery", "dashboard"];
	const includesKeyword = keywords.some((keyword) =>
		pathname.includes(keyword)
	);

	return (
		<ThemeProvider theme={theme === "dark" ? themes.dark : themes.light}>
			<GlobalStyle />
			<div className="App">
				{!includesKeyword && pathname !== "/" ? (
					<NavBar themeToggler={themeToggler} currentTheme={theme} />
				) : null}
				<Routes>
					<Route path="/" element={<LoadingApp />} />
					{/* //----------------------CUSTOMER----------------------------- */}

					<Route path="/customer" element={<Home />} />
					<Route path="/customer/login/" element={<Login />} />
					<Route path="/customer/registry/" element={<Registry />} />
					<Route path="/customer/recovery/" element={<UserRecovery />} />
					<Route path="/customer/password/" element={<PasswordRecovery />} />
					<Route path="/customer/detail/:id" element={<DetailPage />} />
					<Route path="/customer/basket/" element={<Basket />} />
					<Route
						path="/customer/account/orders/:referrer"
						element={<CustomerOrders />}
					/>
					<Route path="/customer/account/" element={<UserAccount />} />

					{/* //-----------------------MANAGER----------------------------------- */}

					<Route path="/manager" element={<Home />} />
					<Route path="/manager/login/" element={<Login />} />
					<Route path="/manager/registry/" element={<Registry />} />
					<Route path="/manager/edit/:id" element={<ArticleEdit />} />
					<Route path="/manager/detail/:id" element={<DetailPage />} />
					<Route path="/manager/orders/" element={<ManagerOrders />} />
					<Route path="/manager/families/" element={<EditFamilies />} />

					{/* //-----------------------OTHER----------------------------------- */}

					<Route path="/dashboard/*" element={<Dashboard />} />
					<Route path="/kitchenView/" element={<KitchenView />} />
					<Route path="/review/" element={<ReviewPage />} />

					<Route path="/sandbox/" element={<Sandbox />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
