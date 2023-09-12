import { styled } from 'styled-components'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'
//import { menu } from "../../assets/mockedMenu";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDishById } from '../../redux/actions/actions'

import { addToBasket } from '../../redux/actions/actions'

export const DetailPage = () => {
	// const menu = useMenu()
	// const dishes = menu.flatMap((family) => family.recipes)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const navigateToEdit = () => {
		navigate(`/manager/edit/${id}`)
	}

	const location = useLocation()
	const $isCustomerView = location.pathname.startsWith('/customer')

	const addToCart = () => {
		const cardData = {
			id,
			img: image,
			name,
			description,
			time,
			price,
		}
		const existingBasket = JSON.parse(localStorage.getItem('basket')) || []
		const updatedBasket = [...existingBasket, cardData]
		localStorage.setItem('basket', JSON.stringify(updatedBasket))

		dispatch(addToBasket(cardData))
		// console.log("El item se agrego correctamente");
	}
	// const edit = () => console.log(`No fuimo a editar`);

	const { id } = useParams()
	const articleDetails = useSelector((state) => state.detail)
	const { image, name, description, price, time } = articleDetails
	const minutes = time ? parseInt(time.split(':')[1], 10) : time

	useEffect(() => {
		dispatch(getDishById(id))
	}, [dispatch])

	return (
		<StyledView>
			<StyledImg src={image} />
			<StyledName>{name}</StyledName>
			<StyledDesc>{description}</StyledDesc>
			<StyledTime>Preparación: {minutes} minutos</StyledTime>
			<StyledPrice>${price}</StyledPrice>
			<CTAsContainer
				text1={$isCustomerView ? `Agregar · $${price}` : `Editar`}
				onClick1={$isCustomerView ? addToCart : navigateToEdit}
			/>
		</StyledView>
	)
}

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: auto;
	overflow-y: auto;
	padding: 10vh 4vw 10vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	gap: 1rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: auto;
	overflow-y: auto;
	padding: 10vh 4vw 10vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	gap: 1rem;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 0;
	}
`

const StyledImg = styled.img`
	height: 15rem;
	width: 100%;
	border-radius: 0.5rem;
	object-fit: cover;
	box-sizing: border-box;
`

const StyledName = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
`

const StyledDesc = styled.p`
	line-height: 1rem;
	font-size: 1rem;
`

const StyledTime = styled.p`
	line-height: 1rem;
	font-size: 1rem;
`

const StyledPrice = styled.h6``
