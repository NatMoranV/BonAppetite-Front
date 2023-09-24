import { styled } from 'styled-components'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'
//import { menu } from "../../assets/mockedMenu";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDishById } from '../../redux/actions/actions'
import { DetailCard } from '../../components/Cards/DetailCard'
import { Modal } from '../../components/Modal/Modal'
import { Loader } from '../../components/Modal/Loader'

// import { addToBasket } from "../../redux/actions/actions";

export const DetailPage = () => {
	// const menu = useMenu()
	// const dishes = menu.flatMap((family) => family.recipes)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	const [isConfirmation, setIsConfirmation] = useState(false)
	const { id } = useParams()
	const productId = parseInt(id)
	const articleDetails = useSelector((state) => state.detail)
	const { image, name, description, price, time, qualification } = articleDetails
	const $isCustomerView = location.pathname.startsWith('/customer/')
	const [loader, setLoader] = useState(true)
	const userRole = useSelector((state) => state.userLogged)
	useEffect(() => {
		if (userRole.role !== 'Manager' || userRole.role !== 'Admin') {
			navigate('/')
		}
	}, [navigate])

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoader(false)
		}, 700)
		return () => clearTimeout(timer)
	}, [])

	const navigateToEdit = () => {
		navigate(`/manager/edit/${id}/`)
	}

	const addCard = () => {
		const cardData = {
			id: productId,
			image,
			name,
			description,
			time,
			price,
			amount: 1,
			qualification,
		}
		const existingBasket = JSON.parse(localStorage.getItem('basket')) || []
		const cardIndex = existingBasket.findIndex((item) => item.id === cardData.id)

		if (cardIndex !== -1) {
			existingBasket[cardIndex].amount++
		} else {
			existingBasket.push(cardData)
		}

		localStorage.setItem('basket', JSON.stringify(existingBasket))
	}

	useEffect(() => {
		dispatch(getDishById(id))
	}, [dispatch])

	return (
		<>
			{loader ? (
				<Loader />
			) : (
				<StyledView>
					<DetailCard
						image={image}
						name={name}
						description={description}
						prepTime={time}
						price={price}
						qualification={qualification}
					/>
					<CTAsContainer
						text1={$isCustomerView ? `Agregar · $${price}` : `Editar`}
						onClick1={() => {
							if ($isCustomerView) {
								addCard()
								setIsConfirmation(true)
							} else {
								navigateToEdit()
							}
						}}
					/>
					{isConfirmation && (
						<Modal
							title={'¡Agregado!'}
							msg="El producto se agregó a la canasta"
							text1={'Canasta'}
							onClick1={() => {
								setIsConfirmation(false)
								navigate('/customer/basket/')
							}}
						/>
					)}
				</StyledView>
			)}
		</>
	)
}

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
	overflow-y: auto;
	padding: 10vh 4vw 10vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	gap: 5rem;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 1rem;
	}
`
