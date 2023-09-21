/* eslint-disable no-unused-vars */
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { StyledInput } from "../../components/Input/StyledInput";
// import onFacebook from '../../utils/onFacebook'
import { useDispatch, useSelector } from "react-redux";
import { addUserLogged, logged } from "../../redux/actions/actions";
import onGoogle from "../../utils/onGoogle";
import sigIn from "../../utils/sigIn";
import { validateEmail, validateLength8 } from "../../utils/validations";
import useAutoSignin from "../../utils/useAutoSignin";

export const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const url = useSelector((state) => state.savedUrl);
	const log = useSelector((state) => state.logged);
	useAutoSignin()

	const dispatch = useDispatch();
	const login = async() => {
		await sigIn(
			email,
			password,
			() => {
				navigate(url);
			},
			dispatch,
			addUserLogged,
			logged,
		);
	};
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		button: "disabled",
	});
	const onClickGoogle = async () => {
		await onGoogle(
			() => {
				navigate(url);
			},
			dispatch,
			logged
		);
	};
	// const onClickFacebook = async () => {
	// 	const response = await onFacebook()
	// 	console.log(response)
	// 	navigate('/customer')
	// }
	const handleChange = (event) => {
		const { name, value } = event.target;
		let error = "";

		if (name === "email") {
			error = validateEmail(value) ? "" : "email invalido";
			setEmail(value);
		}
		if (name === "password") {
			error = validateLength8(value) ? "" : "revisa tu contraseña";
			setPassword(value);
		}
		setErrors({ ...errors, [name]: error });
	};

	const enableButton =
		errors.email === "" &&
		errors.password === "" &&
		email !== "" &&
		password !== "";

	const navigateRegistry = () => {
		navigate("/customer/registry");
	};

	const navigateRecovery = () => {
		navigate("/customer/recovery");
	};

	const $isCustomerView = location.pathname.startsWith("/customer");
	return (
		<StyledView>
			<Logo />
			<h6>Iniciar sesión</h6>
			{$isCustomerView && (
				<CircleButtonsContainer>
					<CircleButton
						onClick={onClickGoogle}
						className={`big`}
						icon={faGoogle}
					/>
					{/* <CircleButton onClick={onClickFacebook} className={`big`} icon={faFacebookF} /> */}
				</CircleButtonsContainer>
			)}
			{$isCustomerView && <p>O ingresa tus datos</p>}
			<InputsContainer>
				<StyledInput
					type={"email"}
					label={"Correo"}
					name={"email"}
					placeholder={"ejemplo@mail.com"}
					// value={email}
					onChange={handleChange}
					helper={errors.email}
				/>
				<StyledInput
					type={"password"}
					label={"Contraseña"}
					name={"password"}
					placeholder={"8 digitos"}
					// value={password}
					onChange={handleChange}
					helper={errors.password}
				/>
			</InputsContainer>
			<p onClick={navigateRecovery}>¿Olvidaste tu contraseña?</p>
			<CTAsContainer
				text1={"Ingresar"}
				onClick1={login}
				buttonClass1={enableButton ? "" : "disabled"}
				text2={$isCustomerView && "Crear cuenta"}
				onClick2={navigateRegistry}
			/>
		</StyledView>
	);
};

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: auto;
	overflow-y: auto;
	padding: 3vh 4vw 10vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 0;
	}
`;

const CircleButtonsContainer = styled.div`
	width: 100%;
	margin: 2rem 0;
	display: flex;
	justify-content: center;
	gap: 2rem;
`;

const InputsContainer = styled.div`
	width: 100%;
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`;
