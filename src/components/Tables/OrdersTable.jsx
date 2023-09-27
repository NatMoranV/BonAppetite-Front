import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../../redux/actions/actions";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export const OrdersTable = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const ordersTotal = async () => {
      try {
        const orderData = await dispatch(getAllOrders());
        setOrders(orderData.payload);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    ordersTotal();
  }, [dispatch]);

  useEffect(() => {
    const sortedOrders = [...orders].sort((a, b) => {
      if (sortColumn === "id") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sortColumn === "total") {
        return sortDirection === "asc" ? a.total - b.total : b.total - a.total;
      } else if (sortColumn === "status") {
        return sortDirection === "asc"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
    setOrders(sortedOrders);
  }, [sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  

  return (
    <TableContainer>
      <>
        <StyledTable>
          <StyledTHead>
            <tr>
              <TableHeader onClick={() => handleSort("id")}>
                Orden <FontAwesomeIcon icon={faSort} />
              </TableHeader>
              <TableHeader onClick={() => handleSort("status")}>
                Estado <FontAwesomeIcon icon={faSort} />
              </TableHeader>
              <TableHeader onClick={() => handleSort("total")}>
                Precio total <FontAwesomeIcon icon={faSort} />
              </TableHeader>
              <th>Artículos</th>
            </tr>
          </StyledTHead>
          <tbody>
            {orders?.map((order) => (
              <StyledRow key={order.id}>
                <TableCell1>
                  <RowContent>{order.id}</RowContent>
                </TableCell1>
                <TableCell2>
                  <RowContent>{order.status}</RowContent>
                </TableCell2>
                <TableCell3>
                  <RowContent>{order.total}</RowContent>
                </TableCell3>
                <TableCell4>
                  <RowContent>
                    {order.OrderDetails?.map((item, index) => (
                      <div key={index}>
                        {`${item.Product.name} (${item.amount})`}
                        {index < order.OrderDetails.length - 1 ? " - " : ""}
                      </div>
                    ))}
                  </RowContent>
                </TableCell4>
              </StyledRow>
            ))}
          </tbody>
        </StyledTable>
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
  width: 10rem;
  box-sizing: border-box;
`;

const TableCell2 = styled.td`
  padding: 0.5rem 1rem;
  width: 15rem;
  box-sizing: border-box;
`;

const TableCell3 = styled.td`
  padding: 0.5rem 1rem;
  width: 15rem;
  box-sizing: border-box;
`;

const TableCell4 = styled.td`
  padding: 0.5rem 1rem;
  width: auto;
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
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.focus};
    color: ${(props) => props.theme.secondary};
  }
`;
