export const validateEmail = (email) => {
	const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
	return regex.test(email)
}
export const validateLength8 = (password) => {
	return password.length === 8
}
