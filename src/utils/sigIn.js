import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const sigIn = (email, password, navigate) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user.emailVerified) {
        localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
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

export default sigIn
