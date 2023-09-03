import { faPepperHot } from '@fortawesome/free-solid-svg-icons'

import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledLogo = styled.div`
	display: flex;
	gap: 1rem;

	&& span {
		font-size: 2rem;
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
			<h4>Bon Appétit</h4>
		</StyledLogo>
	)
}
