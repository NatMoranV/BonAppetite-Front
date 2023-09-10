export const validateEmail = (email) => {
	const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
	return regex.test(email) ? '' : 'email inválido.'
}
export const validateLength8 = (password) => {
	// console.log(password.length === 8 ? '' : 'revisa tu contraseña')
	return password.length === 8 ? '' : 'revisa tu contraseña'
}
