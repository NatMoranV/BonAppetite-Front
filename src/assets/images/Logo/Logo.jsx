import { faPepperHot } from '@fortawesome/free-solid-svg-icons'

import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledLogo = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	width: 14rem;
	padding: 0 0 2.5rem 0;

	&& span {
		font-size: 1.5rem;
	}

	&& h6 {
		margin: 0;
		padding: 0;
	}
`

export const Logo = () => {
	return (
		<StyledLogo className="Logo">
			<span>
				<FontAwesomeIcon icon={faPepperHot} />
			</span>
			<h6>Bon Appetit</h6>
		</StyledLogo>
	)
}
