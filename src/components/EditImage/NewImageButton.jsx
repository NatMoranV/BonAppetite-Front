import { faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

faImage

export const NewImageButton = () => {
	return (
		<StyledNewImgButton>
			<FontAwesomeIcon icon={faImage} />
			<span>Agregar imagen</span>
		</StyledNewImgButton>
	)
}

const StyledNewImgButton = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 6rem;
	height: 4rem;
	border-radius: 0.5rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	cursor: pointer;

	& span {
		font-size: 0.6rem;
	}
`
