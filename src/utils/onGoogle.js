import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import auth from "./config";
import { addUserLogged, logged } from "../redux/actions/actions";

const onGoogle = async (navigate, dispatch,) => {
  const providerGoogle = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, providerGoogle);
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    if (token) {
      try {
        const url = `${import.meta.env.VITE_URL_BACK}/register/`;
        await axios.post(url, user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (user.emailVerified) {
          localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
          dispatch(logged(true));
          dispatch(addUserLogged(user));
          //alert("Has iniciado sesión con Google");
          navigate();
          return "Inicio de sesión exitoso";
        }
        return { ...user, token }
      } catch (error) {
        // alert("Error al registrarse recargue e intente de nuevo");
        console.error(error);
          return "Error en registrar el usuario en Base Datos, intente nuevamente";
      }
    }
  } catch (error) {
    // alert("Error al iniciar sesión con Google");
    return "Error al iniciar sesión con Google";
  }
};

export default onGoogle;
