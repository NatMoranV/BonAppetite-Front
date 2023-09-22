import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import axios from "axios";
import auth from "./config";
import { addUserLogged } from "../redux/actions/actions";

const onFacebook = async (navigate, dispatch, logged) => {
  const providerFacebook = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, providerFacebook);
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    if (token) {
      try {
        const url = `${import.meta.env.VITE_URL_BACK}/register/`;
        await axios.post(url, user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (user) {
          localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
          dispatch(logged(true));
          dispatch(addUserLogged(user));
          alert("Has iniciado sesión con Facebook");
          navigate();
        }
        return { ...user, token };
      } catch (error) {
        alert("Error al registrarse recargue e intente de nuevo");
        console.error(error);
        return {
          message:
            "Error en registrar el usuario en Base Datos, intente nuevamente",
          error,
        };
      }
    }
  } catch (error) {
    alert("Error al iniciar sesión con Google");
    return { message: "Error al iniciar sesión con Faacebook:", error };
  }
};

export default onFacebook;
