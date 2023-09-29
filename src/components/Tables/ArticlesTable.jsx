import {
  faDollar,
  faTrash,
  faCheckCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../Input/Input";
import { Dropdown } from "../Dropdown/StyledDropdown";
import { CircleButton } from "../CircleButton/CircleButton";
import { TextButton } from "../TextButton/TextButton";
import { CTAsContainer } from "../CTAs/CTAsContainer";
import formatDataArticlesTable from "../../utils/formatDataArticlesTable";
import { EditImageButton } from "../EditImage/EditImage";
import { Modal } from "../Modal/Modal";
import { getMenu } from "../../utils/getMenu";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFamilies } from "../../redux/actions/actions";

export const ArticlesTable = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [boolMsg, setBoolMsg] = useState("");
  const [numberItemsInDB, setNumber] = useState(0);
  const [auxCambioData, setAuxCambioData] = useState(true);
  //Este useEffect trae la data del servidor y del localStorage y los junta en un solo array para renderizarlo (se guarda en el localStorage los items que se van agregando por si en algún momento de se llega a refrescar la pagina)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Intenta obtener los datos del localStorage
        setLoading(true);
        const localData =
          JSON.parse(localStorage.getItem("dataDashboard")) || [];

        const localDataFiltered = localData.filter(
          (elemento) => elemento !== null
        );
        localStorage.setItem(
          "dataDashboard",
          JSON.stringify(localDataFiltered)
        );

        const menuData = await getMenu();
        setMenu(menuData);
        const formattedData = menuData.flatMap(formatDataArticlesTable);
        setNumber(formattedData.length);
        setData([...formattedData, ...localDataFiltered]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        error.response.data.error
          ? setMsg(<p style={{ color: "red" }}>{error.response.data.error}</p>)
          : setMsg(<p style={{ color: "red" }}>{error.response.data}</p>);
        setError(true);
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [auxCambioData]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFamilies());
  }, []);
  const familiesFromAPI = useSelector((state) => state.families);
  console.log(familiesFromAPI);
  const families = familiesFromAPI.map((item) => item.class);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);

  const handleDelete = (index) => {
    setIsDeleteModalVisible(true);

    setItemToDeleteIndex(index);
  };

  const handleEdit = async (index) => {
    const updatedData = [...data];
    if (updatedData[index].isEditable) {
      const elemento = transformarObjeto(updatedData[index], familiesFromAPI);
      if (updatedData[index].id) {
        try {
          console.log(elemento);
          await actualizarProducto(elemento);
        } catch (error) {
          error.response.data.error
            ? setMsg(
                <p style={{ color: "red" }}>{error.response.data.error}</p>
              )
            : setMsg(<p style={{ color: "red" }}>{error.response.data}</p>);
          setError(true);
        }
      } else {
        try {
          await enviarProducto(elemento);
          const newDataStorage =
            JSON.parse(localStorage.getItem("dataDashboard")) || [];
          newDataStorage.splice(index - numberItemsInDB, 1);
          localStorage.setItem("dataDashboard", JSON.stringify(newDataStorage));
          setAuxCambioData(!auxCambioData);
        } catch (error) {
          error.response.data.error
            ? setMsg(
                <p style={{ color: "red" }}>{error.response.data.error}</p>
              )
            : setMsg(<p style={{ color: "red" }}>{error.response.data}</p>);
          setError(true);
        }
      }
    }
    updatedData[index].isEditable = !updatedData[index].isEditable;
    setData(updatedData);
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    if (itemToDeleteIndex !== null) {
      const newData = [...data];
      const { id } = newData[itemToDeleteIndex];
      const elemento = newData[itemToDeleteIndex];
      if (id) {
        axios
          .delete(
            `https://resto-p4fa.onrender.com/product/${id}?deleted=${true}`
          )
          .then((response) => {
            setLoading(false);
            setMsg(response.data);
            setBoolMsg(true);
          })
          .catch((error) => {
            console.error("Error al hacer la solicitud DELETE:", error);
          });
      } else {
        const newDataStorage =
          JSON.parse(localStorage.getItem("dataDashboard")) || [];
        newDataStorage.splice(itemToDeleteIndex - numberItemsInDB, 1);
        localStorage.setItem("dataDashboard", JSON.stringify(newDataStorage));
      }
      newData.splice(itemToDeleteIndex, 1);
      setData(newData);

      setIsDeleteModalVisible(false);

      setItemToDeleteIndex(null);
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);

    setItemToDeleteIndex(null);
  };

  const addRow = () => {
    const newItem = {
      image: "",
      family: families[0],
      name: "",
      price: 0,
      time: 0,
      desc: "",
      isEditable: true,
    };

    // Agrega el nuevo elemento al estado local
    setData([...data, newItem]);

    // Obtiene los datos existentes del localStorage (si los hay)
    const storedData = JSON.parse(localStorage.getItem("dataDashboard")) || [];

    // Guarda el nuevo elemento en el localStorage
    localStorage.setItem(
      "dataDashboard",
      JSON.stringify([...storedData, newItem])
    );
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    //Se hace una copia del array data
    const newData = [...data];
    //Se hace una copia del array de nuevos items del localStorage
    const newDataStorage =
      JSON.parse(localStorage.getItem("dataDashboard")) || [];
    newData[index] = {
      ...newData[index],
      [name]: value,
    };
    newDataStorage[index - numberItemsInDB] = {
      ...newDataStorage[index - numberItemsInDB],
      [name]: value,
    };
    localStorage.setItem("dataDashboard", JSON.stringify(newDataStorage));
    setData(newData);
  };

  const handleImgChange = (newImg, index) => {
    setData((prevData) => {
      const newData = [...prevData];
      const updatedItem = { ...newData[index], image: newImg };
      newData[index] = updatedItem;
      const prevStorage =
        JSON.parse(localStorage.getItem("dataDashboard")) || [];
      const lenghtDataDB = newData.length - prevStorage.length;
      const indexStorage = index >= lenghtDataDB ? index - lenghtDataDB : index;
      const newDataStorage = [...prevStorage];
      const updatedItemStorage = {
        ...newDataStorage[indexStorage],
        image: newImg,
      };
      newDataStorage[indexStorage] = updatedItemStorage;
      // Guardar en el localStorage
      localStorage.setItem("dataDashboard", JSON.stringify(newDataStorage));
      return newData;
    });
  };
  // Función para hacer un POST con Axios
  const enviarProducto = (producto) => {
    return axios.post("https://resto-p4fa.onrender.com/product", producto);
  };
  const actualizarProducto = (producto) => {
    return axios.put(
      `https://resto-p4fa.onrender.com/product/${producto.id}`,
      producto
    );
  };
  const handleSubmit = async () => {
    setLoading(true);
    const editableItems = data.filter((item) => item.isEditable);
    const newData = editableItems.filter((item) => !item.id);
    const dataEditables = editableItems.filter((item) => item.id);
    const dataEditablesFormatted = dataEditables.map(transformarObjeto);

    const newDataFormatted = newData.map(transformarObjeto);
    // Usamos Promise.all() para enviar todas las peticiones en paralelo
    Promise.all(dataEditablesFormatted.map(actualizarProducto))
      .then((respuestas) => {
        setAuxCambioData(!auxCambioData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.error
          ? setMsg(<p style={{ color: "red" }}>{error.response.data.error}</p>)
          : setMsg(<p style={{ color: "red" }}>{error.response.data}</p>);
        setError(true);
        console.error("Al menos una petición fue rechazada:", error);
      });
    Promise.all(newDataFormatted.map(enviarProducto))
      .then((respuestas) => {
        console.log("Todas las peticiones se han completado:", respuestas);
        localStorage.setItem("dataDashboard", JSON.stringify([]));
        setAuxCambioData(!auxCambioData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.error
          ? setMsg(<p style={{ color: "red" }}>{error.response.data.error}</p>)
          : setMsg(<p style={{ color: "red" }}>{error.response.data}</p>);
        setError(true);
        console.error("Al menos una petición fue rechazada:", error);
      });
  };

  return (
    <TableContainer>
      {loading && <Modal isLoader title={"Cargando..."} />}
      {error && (
        <Modal
          isLoader={false}
          title={<span style={{ color: "red" }}>Error</span>}
          msg={msg}
          onClose={() => {
            setError(false);
            setAuxCambioData(!auxCambioData);
          }}
        />
      )}
      {boolMsg && (
        <Modal
          isLoader={false}
          title={"Respuesta:"}
          msg={msg}
          onClose={() => {
            setBoolMsg(false);
            setAuxCambioData(!auxCambioData);
          }}
        />
      )}
      <>
        <StyledTable>
          <StyledTHead>
            <tr>
              <th>Imagen</th>
              <th>Familia</th>
              <th>Nombre</th>
              <th>
                <FontAwesomeIcon icon={faDollar} />
              </th>
              <th>
                <FontAwesomeIcon icon={faClock} />
              </th>
              <th>Descripción</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </StyledTHead>
          <tbody>
            {data.map((row, index) => (
              <StyledRow key={index}>
                <TableCell1>
                  {row.isEditable ? (
                    <EditImageButton
                      image={row.image}
                      onImgChange={handleImgChange}
                      index={index}
                    />
                  ) : (
                    <StyledImg src={row.image} />
                  )}
                </TableCell1>
                <TableCell2>
                  {row.isEditable ? (
                    <Dropdown
                      array={families}
                      selectedValue={row.family}
                      name={"family"}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    <RowContent>{row.family}</RowContent>
                  )}
                </TableCell2>
                <TableCell3>
                  {row.isEditable ? (
                    <Input
                      type="text"
                      name="name"
                      value={row.name}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    <RowContent>{row.name}</RowContent>
                  )}
                </TableCell3>
                <TableCell4>
                  {row.isEditable ? (
                    <Input
                      type="number"
                      name="price"
                      value={row.price}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    <RowContent>{row.price}</RowContent>
                  )}
                </TableCell4>
                <TableCell5>
                  {row.isEditable ? (
                    <Input
                      type="number"
                      name="time"
                      value={row.time}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    <RowContent>{row.time}</RowContent>
                  )}
                </TableCell5>
                <TableCell6>
                  {row.isEditable ? (
                    <Input
                      type="text"
                      name="desc"
                      value={row.desc}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    <RowContent>{row.desc}</RowContent>
                  )}
                </TableCell6>
                <TableCell7>
                  <CircleButton
                    icon={row.isEditable ? faCheck : faEdit}
                    style={row.isEditable ? { color: "#309141" } : null}
                    onClick={() => handleEdit(index)}
                  />
                </TableCell7>
                <TableCell7>
                  <CircleButton
                    icon={faTrashCan}
                    onClick={() => handleDelete(index)}
                  />
                </TableCell7>
              </StyledRow>
            ))}
          </tbody>
        </StyledTable>
        <ButtonContainer>
          <TextButton onClick={addRow} text={"Agregar nuevo artículo"} />
        </ButtonContainer>
      </>
      {isDeleteModalVisible && (
        <Modal
          onClose={handleCancelDelete}
          title={"Borrar artículo"}
          msg={"Ten en cuenta que no podrás recuperarlo."}
          text1={"Borrar"}
          onClick1={handleConfirmDelete}
          text2={"Cancelar"}
          onClick2={handleCancelDelete}
        />
      )}
    </TableContainer>
  );
};
function obtenerIdPorClase(arr, clase) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].class === clase) {
      return arr[i].id;
    }
  }
  return null; // Retorna null si no se encuentra la clase
}
function transformarObjeto(objeto, families) {
  const { id, name, price, image, family, time, desc } = objeto;
  /* {
    "name": "Sandwich2322",
    "price": 10,
    "image": "https://res.cloudinary.com/bonappetit/image/upload/v1695254441/descaarga_smyjyo.jpg",
    "productClass": 2,
    "time": 15,
    "description": "dfds",
	"deleted": false
} */
  const idClass = obtenerIdPorClase(families, family);

  const transformedObj = {
    name,
    price: parseInt(price),
    image,
    productClass: idClass,
    time: parseInt(time),
    description: desc,
  };

  if (id) {
    transformedObj.id = id;
  }

  return transformedObj;
}

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const TableContainer = styled.div`
  padding: 5rem 2rem;
  width: 100%;
  height: auto;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledTHead = styled.thead`
  background: ${(props) => props.theme.primary};
  position: sticky;
  top: 0;
  box-shadow: ${(props) => props.theme.theadBorder};
`;

const StyledRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.focus};
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${(props) => props.theme.focus};
    color: ${(props) => props.theme.secondary};
  }
`;

const TableCell1 = styled.td`
  padding: 0.5rem 1rem;
  width: 6.75rem;
  box-sizing: border-box;
`;

const TableCell2 = styled.td`
  padding: 0.5rem 1rem;
  width: 10rem;
  box-sizing: border-box;
`;

const TableCell3 = styled.td`
  padding: 0.5rem 1rem;
  width: 10rem;
  box-sizing: border-box;
`;

const TableCell4 = styled.td`
  padding: 0.5rem 1rem;
  width: 6rem;
  box-sizing: border-box;
`;

const TableCell5 = styled.td`
  padding: 0.5rem 1rem;
  width: 6rem;
  box-sizing: border-box;
`;

const TableCell6 = styled.td`
  padding: 0.5rem 1rem;
  width: 30rem;
  box-sizing: border-box;
`;

const TableCell7 = styled.td`
  padding: 0.5rem 1rem;
  width: 2rem;
  box-sizing: border-box;
`;

const StyledImg = styled.img`
  width: 6rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const RowContent = styled.span`
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
