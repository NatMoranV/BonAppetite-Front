import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const sigIn = async (
  email,
  password,
  navigate,
  dispatch,
  addUserLogged,
  logged,
) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verifica si el email del usuario está verificado
    if (user.emailVerified) {
      const userInDB = await axios.get(
        `https://resto-p4fa.onrender.com/users/${user.uid}`
      );
      localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
      dispatch(logged(true));
      dispatch(
        addUserLogged({
          id: user.uid,
          email: user.email,
          role: userInDB.data.role,
          name: userInDB.data.displayName,
        })
      );
      navigate();
      // return "Inicio de sesión exitoso"; // Devuelve un mensaje en caso de éxito
    }
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/wrong-password") {
      return "Contraseña incorrecta";
    } else if (errorCode === "auth/user-not-found") {
      return "Usuario no encontrado";
    } else if (errorCode === "auth/invalid-email") {
      return "Email invalido";
    } else if (errorCode === "auth/user-disabled") {
      return "Usuario deshabilitado";
    } else if (errorCode === "auth/too-many-requests") {
      return "Demasiados intentos";
    } else {
      return "Error desconocido"; // Manejo de otros errores
    }
  }
};

export default sigIn;
