import { faDollar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClock, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { StyledInput } from "../Input/StyledInput";
import { Dropdown } from "../Dropdown/StyledDropdown";
import { CircleButton } from "../CircleButton/CircleButton";
import { TextButton } from "../TextButton/TextButton";
import { CallToAction } from "../CTAs/CallToAction";


export const Table = () => {
  const [data, setData] = useState([{ nombre: "", apellido: "", correo: "" }]);


  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const addRow = () => {
    setData([...data, { nombre: "", apellido: "", correo: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };

  const handleSubmit = () => {
    // Aquí puedes enviar los datos a tu backend o realizar otras acciones necesarias.
    console.log(data);
  };

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <TableHeader1>Imagen</TableHeader1>
            <TableHeader2>Familia</TableHeader2>
            <TableHeader3>Nombre</TableHeader3>
            <TableHeader4>
              <FontAwesomeIcon icon={faDollar} />
            </TableHeader4>
            <TableHeader5>
              <FontAwesomeIcon icon={faClock} />
            </TableHeader5>
            <TableHeader6>Descripción</TableHeader6>
            <TableHeader7 />
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <TableCell1>
                <StyledImg
                  src={
                    "https://media.istockphoto.com/id/1176364232/es/foto/chilean-empanadas-con-carne.jpg?s=612x612&w=0&k=20&c=Feq0DeDEgHh4rncN0QCeK_a5jBPM_ssYh9wEDVGv5UI="
                  }
                />
              </TableCell1>
              <TableCell2>
                <TableDropdown array={["Selecciona"]} />
              </TableCell2>
              <TableCell3>
                <TableInput
                  type="text"
                  name="name"
                  value={row.name}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </TableCell3>
              <TableCell4>
                <TableInput
                  type="number"
                  name="price"
                  value={row.price}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </TableCell4>
              <TableCell5>
                <TableInput
                  type="number"
                  name="time"
                  value={row.time}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </TableCell5>
              <TableCell6>
                <TableInput
                  type="text"
                  name="desc"
                  value={row.desc}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </TableCell6>
              <TableCell7>
                <CircleButton icon={faTrashCan} onClick={handleDelete}/>
              </TableCell7>
            </tr>
          ))}
        </tbody>
      </table>
      <TextButton onClick={addRow} text={"Agregar fila"}/>
      <CallToAction buttonClass={"primary"} text={"Cargar información"} onClick={handleSubmit} />
    </TableContainer>
  );
};




const TableContainer = styled.div`

`;

const TableHeader1 = styled.th`
  width: 6.75rem;
  box-sizing: border-box;
`;

const TableCell1 = styled.td`
  padding: 0.5rem 1rem;
  width: 6.75rem;
  box-sizing: border-box;
`;

const TableHeader2 = styled.th`
  padding: 0.5rem 1rem;
  width: 10rem;
  box-sizing: border-box;
`;

const TableCell2 = styled.td`
  padding: 0.5rem 1rem;
  width: 10rem;
  box-sizing: border-box;
`;

const TableHeader3 = styled.th`
  padding: 0.5rem 1rem;
  width: 10rem;
  box-sizing: border-box;
`;
const TableCell3 = styled.td`
  padding: 0.5rem 1rem;
  width: 10rem;
  box-sizing: border-box;
`;

const TableHeader4 = styled.th`
  padding: 0.5rem 1rem;
  width: 6rem;
  box-sizing: border-box;
`;

const TableCell4 = styled.td`
  padding: 0.5rem 1rem;
  width: 6rem;
  box-sizing: border-box;
`;

const TableHeader5 = styled.th`
  padding: 0.5rem 1rem;
  width: 6rem;
  box-sizing: border-box;
`;

const TableCell5 = styled.td`
  padding: 0.5rem 1rem;
  width: 6rem;
  box-sizing: border-box;
`;

const TableHeader6 = styled.th`
  padding: 0.5rem 1rem;
  width: 30rem;
  box-sizing: border-box;
`;

const TableCell6 = styled.td`
  padding: 0.5rem 1rem;
  width: 30rem;
  box-sizing: border-box;
`;

const TableHeader7 = styled.th`
  padding: 0.5rem 1rem;
  width: 2rem;
  box-sizing: border-box;
`;

const TableCell7 = styled.td`
  padding: 0.5rem 1rem;
  width: 2rem;
  box-sizing: border-box;
`;

const StyledImg = styled.img`
  width: 6.75rem;
  height: 3.18294rem;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 0.5rem;
`;

const TableDropdown = styled(Dropdown)`
  display: flex;
  width: 10rem;
  height: 2rem;
  padding: var(--Qty, 0rem) 1.5rem;
  justify-content: space-between;
  align-items: center;

  && select{
    width: 10rem;
  height: 2rem;

  }
`;

const TableInput = styled(StyledInput)`
  min-width: 0;
  width: 100%;
  height: 4rem;
  box-sizing: border-box;

  & input {
    min-width: 0;
  }
`;
