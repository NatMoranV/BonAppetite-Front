import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from './Loader'

export const LoadingApp = ({ time, url }) => {
	const navigate = useNavigate()

	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			navigate(url)
		}, time)

		return () => {
			clearTimeout(redirectTimer)
		}
	}, [navigate])
	return <Loader />
}
