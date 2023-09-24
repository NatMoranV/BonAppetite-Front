import styled from 'styled-components'

import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import React, { useState } from 'react'
import { Input } from '../Input/Input'
import { CircleButton } from '../CircleButton/CircleButton'
import { TextButton } from '../TextButton/TextButton'
import { CTAsContainer } from '../CTAs/CTAsContainer'
import { ToggleButton } from '../ToggleButton/ToggleButton'

export const ManagersTable = () => {
	const [data, setData] = useState([{ image: '', name: '', email: '', notes: '', manager: false }])

	const addRow = () => {
		setData([...data, { image: '', name: '', email: '', notes: '', manager: false }])
	}

	const handleToggle = (index) => {
		const updatedData = [...data]
		updatedData[index].manager = !updatedData[index].manager
		setData(updatedData)
	}

	const handleDelete = (index) => {
		const newData = [...data]
		newData.splice(index, 1)
		setData(newData)
	}

	const handleInputChange = (e, index) => {
		const { name, value } = e.target

		const newData = [...data]
		newData[index] = {
			...newData[index],
			[name]: value,
		}
		setData(newData)
	}

	const handleSubmit = () => {
		// console.log(data);
	}

	return (
		<TableContainer>
			<>
				<table>
					<thead>
						<tr>
							{/* <th>Imagen</th> */}
							<th>Nombre</th>
							<th>Email</th>
							<th>Notas</th>
							<th>Manager</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{data.map((row, index) => (
							<StyledRow key={index}>
								<TableCell2>
									<Input
										type="text"
										name="name"
										value={row.name}
										onChange={(e) => handleInputChange(e, index)}
									/>
								</TableCell2>
								<TableCell3>
									<Input
										type="email"
										name="email"
										value={row.email}
										onChange={(e) => handleInputChange(e, index)}
									/>
								</TableCell3>
								<TableCell4>
									<Input
										type="text"
										name="notes"
										value={row.price}
										onChange={(e) => handleInputChange(e, index)}
									/>
								</TableCell4>
								<TableCell5>
									<ToggleButton isChecked={row.manager} onChange={() => handleToggle(index)} />
								</TableCell5>
								<TableCell6>
									<CircleButton icon={faTrashCan} onClick={handleDelete} />
								</TableCell6>
							</StyledRow>
						))}
					</tbody>
				</table>
				<TextButton onClick={addRow} text={'Agregar nuevo manager'} />
			</>
			<CTAsContainer className={"float"} text1={'Guardar Cambios'} onClick1={handleSubmit} />
		</TableContainer>
	)
}

const TableContainer = styled.div`
  padding: 5rem 2rem;
  width: 100%;
  height: auto;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  overflow-x: auto;
`;

const StyledRow = styled.tr`
  align-items: center;
justify-content: center;
  &:hover {
    background: ${(props) => props.theme.focus};
    color: ${(props) => props.theme.secondary};
  }
`;

const TableCell2 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`

const TableCell3 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`

const TableCell4 = styled.td`
	padding: 0.5rem 1rem;
	width: 33%;
	box-sizing: border-box;
`

const TableCell5 = styled.td`
	padding: 0.5rem 1rem;
	width: 5rem;
	box-sizing: border-box;
`

const TableCell6 = styled.td`
	padding: 0.5rem 1rem;
	width: 2rem;
	box-sizing: border-box;
`

