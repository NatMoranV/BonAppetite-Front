import { faPepperHot } from '@fortawesome/free-solid-svg-icons'

import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledLogo = styled.div`
	display: flex;
	gap: 1rem;
	cursor: pointer;

	& span {
		line-height: 2rem;
		font-size: 1.5rem;
	}

	& h6 {
		margin: 0;
		padding: 0;
	}

`

export const Logo = ({onClick}) => {
	return (
		<StyledLogo className="Logo" onClick={onClick}>
			<span>
				<FontAwesomeIcon icon={faPepperHot} />
			</span>
			<h6>Bon Appétit</h6>
		</StyledLogo>
	)
}
