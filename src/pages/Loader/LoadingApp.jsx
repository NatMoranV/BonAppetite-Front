import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoadingApp = () => {
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/customer/')
	}, [navigate])
	return <></>
}
