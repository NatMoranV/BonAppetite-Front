/* eslint-disable no-unused-vars */
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../../assets/images/Logo/Logo";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { Input } from "../../components/Input/Input";
import onFacebook from "../../utils/onFacebook";
import { useDispatch, useSelector } from "react-redux";
import { addUserLogged, logged } from "../../redux/actions/actions";
import onGoogle from "../../utils/onGoogle";
import sigIn from "../../utils/sigIn";
import { validateEmail, validateLength8 } from "../../utils/validations";
import useAutoSignin from "../../utils/useAutoSignin";
import { Loader } from "../../components/Modal/Loader";
import { TextButton } from "../../components/TextButton/TextButton";
import { Modal } from "../../components/Modal/Modal";

export const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const url = useSelector((state) => state.savedUrl);
	const log = useSelector((state) => state.logged);
	useAutoSignin();
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 700);

		return () => clearTimeout(timer);
	}, []);

	const dispatch = useDispatch();
	const login = async () => {
		setModalTitle("Iniciando sesion");
		setShowModal(true);
		const signIn = await sigIn(
			email,
			password,
			() => {
				navigate(url);
			},
			dispatch,
			addUserLogged,
			logged
		);
		if (signIn) {
			setShowModal(false);
			setModalTitle(signIn);
			setShowModal(true);
		}
	};
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		button: "disabled",
	});
	const onClickGoogle = async () => {
		setModalTitle("Iniciando sesión con Google");
		setShowModal(true);
		const google = await onGoogle(
			() => {
				navigate(url);
			},
			dispatch,
			addUserLogged,
			logged
		);
		if (google) {
			setShowModal(false);
			setModalTitle(google);
			setShowModal(true);
		}
	};
	const onClickFacebook = async () => {
		setModalTitle("Iniciando sesión con Facebook");
		setShowModal(true);
		const facebook = await onFacebook(
			() => {
				navigate(url);
			},
			dispatch,
			logged
		);
		if (facebook) {
			setShowModal(false);
			setModalTitle(facebook);
			setShowModal(true);
		}
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		let error = "";

		if (name === "email") {
			error = !value
				? "No puede estar vacio"
				: validateEmail(value)
				? ""
				: "Debe ser un email valido";
			setEmail(value);
		}
		if (name === "password") {
			error = !value
				? "No puede estar vacio"
				: validateLength8(value)
				? ""
				: "No puede tener menos de 8 caracteres";
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

	const $isCustomerView = location.pathname.startsWith("/customer");
	return (
		<>
			{showModal && (
				<Modal
					onClose={() => {
						setShowModal(false);
						setModalTitle("");
					}}
					title={modalTitle}
				/>
			)}
			{loading ? (
				<Loader />
			) : (
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
							{/* <CircleButton
								onClick={onClickFacebook}
								className={`big`}
								icon={faFacebookF}
							/> */}
						</CircleButtonsContainer>
					)}
					{$isCustomerView && <p>O ingresa tus datos</p>}
					<InputsContainer>
						<Input
							type={"email"}
							label={"Correo"}
							name={"email"}
							placeholder={"ejemplo@mail.com"}
							// value={email}
							onChange={handleChange}
							error={errors.email}
						/>
						<Input
							type={"password"}
							label={"Contraseña"}
							name={"password"}
							placeholder={"Al menos 8 caracteres..."}
							// value={password}
							onChange={handleChange}
							error={errors.password}
						/>
					</InputsContainer>

					<NavLink to={"/customer/recovery/"}>
						<TextButton className={"link"} text={"¿Olvidaste tu contraseña?"} />
					</NavLink>

					<CTAsContainer
						text1={"Ingresar"}
						onClick1={login}
						buttonClass1={enableButton ? "" : "disabled"}
						text2={$isCustomerView && "Crear cuenta"}
						onClick2={navigateRegistry}
					/>
				</StyledView>
			)}
		</>
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
	gap: 1rem;

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
