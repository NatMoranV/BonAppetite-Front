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
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userInDB = await axios.get(
        `https://resto-p4fa.onrender.com/users/${user.uid}`
      );
      if (user.emailVerified) {
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
      } else {
        alert("Por favor verifica tu email");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Contraseña incorrecta");
      } else if (errorCode === "auth/user-not-found") {
        alert("Usuario no encontrado");
      } else if (errorCode === "auth/invalid-email") {
        alert("Email invalido");
      } else if (errorCode === "auth/user-disabled") {
        alert("Usuario deshabilitado");
      } else if (errorCode === "auth/too-many-requests") {
        alert(
          "Demasiados intentos el usuario fue inhabilitado por seguridad, deberá reestablecer su contraseña"
        );
      }

      console.log(errorCode);
      console.log(errorMessage);
    });
};

export default sigIn;
