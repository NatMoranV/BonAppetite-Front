import styled from "styled-components";
import { useEffect, useState } from "react";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  updateDisableUser,
  updateUserRole,
} from "../../redux/actions/actions";
import { Modal } from "../Modal/Modal";
import { Input } from "../Input/Input";

export const ManagersTable = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const userLogged = useSelector((state) => state.userLogged);
  const userLoggedId = userLogged.id;
  const [confirmationUpdateRole, setConfirmationUpdateRole] = useState(false);
  const [confirmationUpdateDisable, setConfirmationUpdateDisable] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredResults = allUsers.filter(
      (user) =>
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [allUsers, searchTerm]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = allUsers?.filter(
    (user) => user.role === "Manager" || user.role === "Customer"
  );
  const [data, setData] = useState(filteredUsers);

  const handleToggleDisable = (index) => {
    const updatedData = [...data];
    updatedData[index].disable = event.target.checked;
    const checked = updatedData[index].disable;
    const userId = updatedData[index].id;

    setData(updatedData);
    setConfirmationUpdateDisable(false);

    dispatch(updateDisableUser(userLoggedId, userId, checked));
  };

  const handleRole = (user) => {
    const newRole = user.role === "Manager" ? "Customer" : "Manager";
    const updatedUserData = { id: user.id, role: newRole };

    dispatch(updateUserRole(updatedUserData));

    const updatedData = [...data];
    const updatedUserIndex = updatedData.findIndex((u) => u.id === user.id);
    if (updatedUserIndex !== -1) {
      updatedData[updatedUserIndex].role = newRole;
      setData(updatedData);
    }

    setConfirmationUpdateRole(false);
  };

  return (
    <TableContainer>
      <>
        {!filteredData ? (
          <Modal isLoader={true} title={"Cargando información"} />
        ) : (
          <>
            <SearchBarContainer>
              <SearchBar
                type="text"
                placeholder="Buscar por nombre o correo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBarContainer>
            <StyledTable>
              <StyledTHead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Manager</th>
                  <th>Enable</th>
                  <th />
                </tr>
              </StyledTHead>
              <tbody>
                {filteredData.map((user, index) => (
                  <StyledRow key={index}>
                    {user.role !== "Admin" && (
                      <>
                        <TableCell2>
                          <p>{user.displayName}</p>
                        </TableCell2>
                        <TableCell3>
                          <p>{user.email}</p>
                        </TableCell3>
                        <TableCell4>
                          <button
                            onClick={() => setConfirmationUpdateRole(user)}
                          >
                            {user.role}
                          </button>
                          {confirmationUpdateRole === user && (
                            <Modal
                              onClose={() => setConfirmationUpdateRole(null)}
                              title={"¿Está seguro de cambiar el rol?"}
                              text1={"Cambiar"}
                              onClick1={() => {
                                handleRole(user);
                              }}
                              text2={"Cancelar"}
                              onClick2={() => setConfirmationUpdateRole(null)}
                            />
                          )}
                        </TableCell4>
                        <TableCell5>
                          <ToggleButton
                            isChecked={user.disable}
                            onChange={(isChecked) => {
                              setConfirmationUpdateDisable(true);

                              handleToggleDisable(index, isChecked);
                            }}
                          />
                          {confirmationUpdateDisable && (
                            <Modal
                              onClose={() =>
                                setConfirmationUpdateDisable(false)
                              }
                              title={"¿Está seguro de deshabilitar al usuario?"}
                              msg={"El usuario no va a poder acceder a la app"}
                              text1={"Dehabilitar "}
                              onClick1={() => {
                                handleToggleDisable(index, !user.disable);
                              }}
                              text2={"Cancelar"}
                              onClick2={() =>
                                setConfirmationUpdateDisable(false)
                              }
                            />
                          )}
                        </TableCell5>
                      </>
                    )}
                  </StyledRow>
                ))}
              </tbody>
            </StyledTable>
          </>
        )}
      </>
    </TableContainer>
  );
};

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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background:${(props) => props.theme.primary};
  position: sticky;
  top: 0;
  z-index: 4;
`;

const SearchBar = styled(Input)`

  width: 30%;
`;

const StyledTHead = styled.thead`
  background: ${(props) => props.theme.primary};
  position: sticky;
  top: 4rem;
  box-shadow: ${(props) => props.theme.theadBorder};
    z-index: 4;
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

const TableCell2 = styled.td`
  padding: 0.5rem 1rem;
  width: 33%;
  box-sizing: border-box;
`;

const TableCell3 = styled.td`
  padding: 0.5rem 1rem;
  width: 33%;
  box-sizing: border-box;
`;

const TableCell4 = styled.td`
  padding: 0.5rem 1rem;
  width: 33%;
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
