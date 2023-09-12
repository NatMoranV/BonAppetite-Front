import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import axios from 'axios'
import auth from './config'

const onGoogle = async () => {
	const providerGoogle = new GoogleAuthProvider()
	try {
		const result = await signInWithPopup(auth, providerGoogle)
		const user = result.user
		const credential = GoogleAuthProvider.credentialFromResult(result)
		const token = credential.accessToken

		if (token) {
			try {
				const url = `${import.meta.env.VITE_URL_BACK}/register/`
				await axios.post(url, user, {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				// console.log({ ...user, token });
				return { ...user, token }
			} catch (error) {
				return {
					message: 'Error en registrar el usuario en Base Datos, intente nuevamente',
					error,
				}
			}
		}
	} catch (error) {
		return { message: 'Error al iniciar sesión con Google:', error }
	}
}

export default onGoogle
