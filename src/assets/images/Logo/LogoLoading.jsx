import { faPepperHot } from '@fortawesome/free-solid-svg-icons'

import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledLogo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 100%;
	height: 100vh;

	padding: 0 0 0 0;

	&& span {
		font-size: 2rem;
	}

	&& h6 {
		margin: 0;
		padding: 0;
	}
`

export const LogoLoading = () => {
	return (
		<StyledLogo className="Logo">
			<span>
				<FontAwesomeIcon icon={faPepperHot} />
			</span>

			<h4>Bon Appétit</h4>
		</StyledLogo>
	)
}
