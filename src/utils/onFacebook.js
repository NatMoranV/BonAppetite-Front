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
          navigate();
          return "Has iniciado sesión con Facebook";
        }
        return { ...user, token };
      } catch (error) {
        const errorCode = error.code;
        // alert("Error al registrarse recargue e intente de nuevo");
        console.error(error);
        return "Error en registrar el usuario en Base Datos, intente nuevamente"
      }
    }
  } catch (error) {
    // alert("Error al iniciar sesión con Google");
    return "Error al iniciar sesión con Facebook";
  }
};

export default onFacebook;
