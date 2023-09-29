import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'
import { Dropdown } from '../../components/Dropdown/StyledDropdown'
import { EditImageButton } from '../../components/EditImage/EditImage'
import { Input } from '../../components/Input/Input'
import { Modal } from '../../components/Modal/Modal'
import { addDish, getFamilies } from '../../redux/actions/actions'

export const AddNewArticle = () => {
	const dispatch = useDispatch()
	const [alert, setAlert] = useState(false)
	const [modalInfo, setModalInfo] = useState({
		title: '',
		msg: '',
		isLoader: false,
	})

	useEffect(() => {
		dispatch(getFamilies())
	}, [dispatch])

	const allFamilies = useSelector((state) => state.families)
	const families = allFamilies.map((item) => item.class)

	const [articleDetails, setArticleDetails] = useState({
		image: '',
		productClass: 0,
		name: '',
		description: '',
		price: 0,
		time: 0,
		stock: 0,
	})
	const { image, name, description, price, time, stock, productClass } = articleDetails

	const handleImgChange = (newImg) => {
		setArticleDetails((prevArticleDetails) => ({
			...prevArticleDetails,
			image: newImg,
		}))
	}

	const handleChange = (event) => {
		const { name, value } = event.target

		if (name === 'productClass') {
			const familyNumber = allFamilies.filter((familie) => familie.class === value)
			setArticleDetails((prevArticleDetails) => ({
				...prevArticleDetails,
				productClass: Number(familyNumber[0].id),
			}))
		} else if (['stock', 'price', 'time'].includes(name)) {
			const numericValue = parseFloat(value)

			setArticleDetails((prevArticleDetails) => ({
				...prevArticleDetails,
				[name]: numericValue,
			}))
		} else {
			setArticleDetails((prevArticleDetails) => ({
				...prevArticleDetails,
				[name]: value,
			}))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// console.log(articleDetails)
		if (
			isNaN(articleDetails.productClass) ||
			!articleDetails.name ||
			!articleDetails.description ||
			isNaN(articleDetails.price) ||
			isNaN(articleDetails.time) ||
			!articleDetails.image ||
			isNaN(articleDetails.stock)
		) {
			setAlert(true)
			setModalInfo({
				title: 'Campos vacíos',
				msg: 'Por favor revisa todos los campos',
				isLoader: false,
			})
		} else {
			// console.log(articleDetails)
			dispatch(addDish(articleDetails))
			setModalInfo({
				title: 'Guardando los datos',
				msg: 'Estamos actualizando la información.',
				isLoader: true,
			})
			setAlert(true)
			setTimeout(() => {
				setAlert(false)
			}, 2000)
		}
	}

	return (
		<StyledView>
			{alert && (
				<Modal
					onClose={() => setAlert(false)}
					title={modalInfo.title}
					msg={modalInfo.msg}
					isLoader={modalInfo.isloader}
				/>
			)}
			<StyledForm onSubmit={handleSubmit}>
				<EditImageButton image={image} onImgChange={handleImgChange} />

				<Dropdown
					name="productClass"
					label={'Familia'}
					array={families}
					id={'family'}
					option1={'Selecciona una opción'}
					value={productClass}
					onChange={handleChange}
					helper={'Selecciona la familia a la que pertenece.'}
				/>

				<Input
					type={'text'}
					name={'name'}
					label={'Nombre'}
					value={name}
					onChange={handleChange}
					helper={'Hasta 20 caracteres'}
					isHelperOrError={true}
				/>
				<Input
					type={'text'}
					name={'description'}
					label={'Descripción'}
					value={description}
					onChange={handleChange}
					helper={'Hasta 100 caracteres'}
					isHelperOrError={true}
				/>
				<Input type={'number'} name={'price'} label={'Precio'} value={price} onChange={handleChange} />
				<Input
					type={'number'}
					name={'time'}
					label={'Tiempo de preparación'}
					value={time}
					onChange={handleChange}
					helper={'Tiempo en minutos'}
					isHelperOrError={true}
				/>
				<Input
					type={'number'}
					name={'stock'}
					label={'Stock'}
					value={stock}
					onChange={handleChange}
					helper={'Stock total'}
					isHelperOrError={true}
				/>
				<CTAsContainer type="submit" text1={`Guardar cambios`} />
			</StyledForm>
		</StyledView>
	)
}

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: auto;
	overflow-y: auto;
	padding: 10vh 4vw 15vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	overflow: visible;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 0;
	}
`

const StyledForm = styled.form`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: start;
	width: 100%;
	box-sizing: border-box;
	gap: 2.5rem;
`
