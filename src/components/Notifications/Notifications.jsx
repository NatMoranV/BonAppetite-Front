import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getStockNotifications, updateNotificationOk } from "../../redux/actions/actions"
import { CircleButton } from "../CircleButton/CircleButton";

import styled from "styled-components";


export const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications);

    const newNotifications = notifications.filter(notification => notification.new === true);
    const oldNotifications = notifications.filter(notification => notification.new === false);

    const handleDone = (id) => {
        dispatch(updateNotificationOk(id))
    }

    useEffect(() => {
        dispatch(getStockNotifications());
    }, [dispatch]);


    return (
        <TableContainer>
            <>
                <StyledTable>
                    <StyledTHead>
                        <tr>
                            <TableHeader>Notificaciones nuevas</TableHeader>
                            <TableHeader>Visto</TableHeader>
                            <TableHeader>Edit</TableHeader>
                        </tr>
                    </StyledTHead>
                    <tbody>
                        {newNotifications.length > 0 ? newNotifications.map((notification) => (
                            <StyledRow key={notification.id}>
                                <TableCell1>
                                    <RowContent>{notification.message}</RowContent>
                                </TableCell1>
                                <TableCell2>
                                    <CircleButton
                                        icon={faCheck}
                                        onClick={() => handleDone(notification.id)}
                                    />
                                </TableCell2>
                                <TableCell2>
                                    <NavLink key={notification.id} to={`/manager/edit/${notification.idProduct}`}>
                                        <CircleButton
                                            icon={faEdit}
                                            onClick={() => handleDone(notification.id)}
                                        />
                                    </NavLink>
                                </TableCell2>
                            </StyledRow>
                        )).reverse() :
                            <StyledRow>
                                <TableCell1 colSpan="3">
                                    <RowContent>No hay notificaciones nuevas</RowContent>
                                </TableCell1>
                            </StyledRow>}
                    </tbody>
                </StyledTable>

                <StyledTable>
                    <StyledTHead>
                        <tr>
                            <TableHeader colSpan="2">Historial de notificaciones</TableHeader>
                        </tr>
                    </StyledTHead>
                    <tbody>
                        {oldNotifications.length > 0 ? oldNotifications.map((notification) => (
                            <StyledRow key={notification.id}>
                                <TableCell1>
                                    <RowContent>{notification.message}</RowContent>
                                </TableCell1>
                            </StyledRow>
                        )).reverse() : <StyledRow>
                            <TableCell1>
                                <RowContent>No hay historial de notificaciones</RowContent>
                            </TableCell1>
                        </StyledRow>}
                    </tbody>
                </StyledTable>
            </>
        </TableContainer>
    );
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
  align-items: flex;
  justify-content: center;
  &:hover {
    background: ${(props) => props.theme.focus};
    color: ${(props) => props.theme.secondary};
  }
`;

const TableCell1 = styled.td`
  padding: 0.5rem 1rem;
  width: 10rem;
  box-sizing: border-box;
`;

const RowContent = styled.span`
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;

const TableHeader = styled.th`
  align-items: center;
  justify-content: center;
`;

const TableCell2 = styled.td`
  padding: 0.5rem 1rem;
  width: 2rem;
  box-sizing: border-box;
`;
