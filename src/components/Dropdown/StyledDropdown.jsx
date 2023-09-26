import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { styled } from 'styled-components'

export const Dropdown = ({ onBlur, name, option1, label, array, id, selectedValue, onChange, force }) => {
	const location = useLocation().pathname
	const isHome = location === '/customer/' || location === '/manager/'
	const isDisabled = !array || !array.length
	const isManagerOrders = location === '/manager/orders/'
	const dropdownRef = useRef(null)

	const handleDropdownIconClick = () => {
		if (dropdownRef.current) {
			dropdownRef.current.click()
		}
	}

	useEffect(() => {
		if (dropdownRef.current) {
			dropdownRef.current.value = selectedValue
		}
	}, [force, selectedValue])

	return (
		<DropdownContainer $isHome={isHome || isManagerOrders}>
			{label && <Label htmlFor={id}>{label}</Label>}
			<StyledDropdown
				ref={dropdownRef}
				$isHome={isHome}
				className={isDisabled ? 'disabled' : ''}
				name={name}
				id={id}
				value={selectedValue}
				onChange={onChange}
				onBlur={onBlur}>
				{option1 && <option value={option1}>{option1}</option>}
				{array.map((item, index) => (
					<option key={index} value={item}>
						{item}
					</option>
				))}
			</StyledDropdown>
			<DropdownIcon onClick={handleDropdownIconClick}>
				<FontAwesomeIcon icon={faCaretDown} onClick={handleDropdownIconClick} />
			</DropdownIcon>
		</DropdownContainer>
	)
}

const DropdownContainer = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	flex-direction: column;
	position: relative;
	gap: 1rem;

	${(props) =>
		props.$isHome &&
		`
    align-items: center;
    flex-direction: row;
		width: fit-content;
	`}
`
const Label = styled.label`
	font-size: 1.1rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	white-space: nowrap;
`
const StyledDropdown = styled.select`
	appearance: none;
	display: flex;
	padding: 0 3rem 0 1.5rem;
	vertical-align: auto;
	border: none;
	cursor: pointer;
	border-radius: 3rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	font-size: 1rem;
	font-weight: 400;

	&.active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}

	&:active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}
`

const DropdownIcon = styled.span`
	position: absolute;
	background: transparent;
	border: none;
	bottom: 0.05rem;
	right: 1rem;
	font-size: 1.1rem;
`
