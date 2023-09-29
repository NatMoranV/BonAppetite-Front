import { faPepperHot } from '@fortawesome/free-solid-svg-icons'

import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'




export const Logo = ({onClick}) => {
	const location = useLocation().pathname;
    const isNotLink = location === "/review/" || location === "/kitchenView/"

	return (
		<StyledLogo className="Logo" onClick={onClick} $isNotLink={isNotLink}>
			<span>
				<FontAwesomeIcon icon={faPepperHot} />
			</span>
			<h6>Bon Appétit</h6>
		</StyledLogo>
	)
}

const StyledLogo = styled.div`
	display: flex;
	gap: 1rem;
	cursor: pointer;
	${(props) => props.$isNotLink &&`
	
	cursor: default;
	
	`}

	& span {
		line-height: 2rem;
		font-size: 1.5rem;
	}

	& h6 {
		margin: 0;
		padding: 0;
	}

`