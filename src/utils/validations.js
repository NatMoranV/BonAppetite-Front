export const validateEmail = (email) => {
	const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
	return regex.test(email)
}
export const validateLength8 = (password) => {
	return password.length === 8
}

export const isString = (string) => {
	const regex = /^[a-zA-Z\s]+$/
	return regex.test(string)
	// 	const formattedString = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
	// 	return formattedString
	// } else {
	// 	return 'Revisa el nombre'
	// }
}
