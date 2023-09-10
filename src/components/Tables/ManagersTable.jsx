import styled from "styled-components";

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { StyledInput } from "../Input/StyledInput";
import { CircleButton } from "../CircleButton/CircleButton";
import { TextButton } from "../TextButton/TextButton";
import { CTAsContainer } from "../CTAs/CTAsContainer";
import { ToggleButton } from "../ToggleButton/ToggleButton";

export const ManagersTable = () => {
  const [data, setData] = useState([
    { image: "", name: "", email: "", notes: "", manager: false },
  ]);

  const addRow = () => {
    setData([
      ...data,
      { image: "", name: "", email: "", notes: "", manager: false },
    ]);
  };

  const handleToggle = (index) => {
    const updatedData = [...data];
    updatedData[index].manager = !updatedData[index].manager;
    setData(updatedData);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

          const newData = [...data];
          newData[index] = {
            ...newData[index],
            [name]: value,
          };
          setData(newData);
        
  };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <TableContainer>
      <div>
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
              <tr key={index}>
                {/* <TableCell1>
                  <StyledImg
                    src={
                      "https://media.istockphoto.com/id/1176364232/es/foto/chilean-empanadas-con-carne.jpg?s=612x612&w=0&k=20&c=Feq0DeDEgHh4rncN0QCeK_a5jBPM_ssYh9wEDVGv5UI="
                    }
                  />
                </TableCell1> */}
                <TableCell2>
                  <TableInput
                    type="text"
                    name="name"
                    value={row.name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </TableCell2>
                <TableCell3>
                  <TableInput
                    type="email"
                    name="email"
                    value={row.email}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </TableCell3>
                <TableCell4>
                  <TableInput
                    type="text"
                    name="notes"
                    value={row.price}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </TableCell4>
                <TableCell5>
                  <ToggleButton
                    isChecked={row.manager}
                    onChange={() => handleToggle(index)}
                  />
                </TableCell5>
                <TableCell6>
                  <CircleButton icon={faTrashCan} onClick={handleDelete} />
                </TableCell6>
              </tr>
            ))}
          </tbody>
        </table>
        <TextButton onClick={addRow} text={"Agregar fila"} />
      </div>
      <CTAsContainer
        text1={"Cargar info"}
        onClick1={handleSubmit}
        text2={"Cancelar"}
      />
    </TableContainer>
  );
};

const TableContainer = styled.div`
  margin-top: 5rem;
  height: auto;
  display: flex;
  gap: 10rem;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-end;
`;

// const TableCell1 = styled.td`
//   padding: 0.5rem 1rem;
//   width: 6.75rem;
//   box-sizing: border-box;
// `;

const TableCell2 = styled.td`
  padding: 0.5rem 1rem;
  width: 20rem;
  box-sizing: border-box;
`;

const TableCell3 = styled.td`
  padding: 0.5rem 1rem;
  width: 20rem;
  box-sizing: border-box;
`;

const TableCell4 = styled.td`
  padding: 0.5rem 1rem;
  width: 20rem;
  box-sizing: border-box;
`;

const TableCell5 = styled.td`
  padding: 0.5rem 1rem;
  width: 5rem;
  box-sizing: border-box;
`;

const TableCell6 = styled.td`
  padding: 0.5rem 1rem;
  width: 2rem;
  box-sizing: border-box;
`;

// const StyledImg = styled.img`
//   width: 6.75rem;
//   height: 3.18294rem;
//   object-fit: cover;
//   flex-shrink: 0;
//   border-radius: 0.5rem;
// `;

const TableInput = styled(StyledInput)`
  min-width: 0;
  width: 100%;
  height: 4rem;
  box-sizing: border-box;

  & input {
    min-width: 0;
  }
`;
