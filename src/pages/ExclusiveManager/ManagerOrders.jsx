/* eslint-disable react/prop-types */
import { faMagnifyingGlass, faSort } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OrderCard } from "../../components/Cards/OrderCard";
import { Filters } from "../../components/Filters/Filters";
import { Input } from "../../components/Input/Input";
import { getAllOrders, getOrdersToKitchen } from "../../redux/actions/actions";
import { CircleButton } from "../../components/CircleButton/CircleButton";



export const ManagerOrders = ({ searchTerm }) => {
  const [visibleSorters, setVisibleSorters] = useState(false)
  const dispatch = useDispatch();
  const [isDelayed, setIsDelayed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const filteredOrders = useSelector((state) => state.filteredOrders);
  const allOrders = useSelector((state) => state.allOrders);
  const handleTimeOff = () => {
    setIsDelayed(true);
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  console.log("filtered", filteredOrders);
  console.log("all", allOrders);

  // const filteredMenu = foundedOrders.filter((card) =>
  //       card.id.startsWith(searchTerm)
  //     )
  let ordersToRender = filteredOrders ? filteredOrders : allOrders;
  console.log(ordersToRender);
  return (
    <StyledView>
      <SearchbarContainer>
        <SearchBar
          placeholder={"Buscar por número de órden"}
          icono={faMagnifyingGlass}
          // onChange={handleSearch}
        />
        <CircleButton
          className={"big"}
          icon={faSort}
          onClick={() => setVisibleSorters(!visibleSorters)}
          isActive={visibleSorters}
        />
      </SearchbarContainer>
      <Filters isVisible={visibleSorters} />

      <OrdersContainer>
        <span>Pendientes</span>
        <HorizontalContainer>
          {ordersToRender.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              time={order.time}
              onTimeOff={handleTimeOff}
              isDelayed={isDelayed}
              isReady={isReady}
            />
          ))}
        </HorizontalContainer>
        {/* <span>Pendientes</span>
        <HorizontalContainer>
          {foundedOrders.map((order) => (
            <OrderCard
              order={order}
              time={order.time}
              onTimeOff={handleTimeOff}
              isDelayed={isDelayed}
              isReady={isReady}
            />
          ))}
        </HorizontalContainer>
        <span>Pendientes</span>
        <HorizontalContainer>
          {foundedOrders.map((order) => (
            <OrderCard
              order={order}
              time={order.time}
              onTimeOff={handleTimeOff}
              isDelayed={isDelayed}
              isReady={isReady}
            />
          ))}
        </HorizontalContainer>
        <span>Pendientes</span>
        <HorizontalContainer>
          {foundedOrders.map((order) => (
            <OrderCard
              order={order}
              time={order.time}
              onTimeOff={handleTimeOff}
              isDelayed={isDelayed}
              isReady={isReady}
            />
          ))}
        </HorizontalContainer> */}
      </OrdersContainer>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;
  padding: 6vh 0 10vh 0.5rem;
  transition: width 0.3s ease-in-out;
`;
const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  transition: width 0.3s ease-in-out;
`;

const SearchbarContainer = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 1rem 1rem 1rem;
  top: 4rem;
  background-color: ${(props) => props.theme.primary};
  z-index: 4;
`;

const SearchBar = styled(Input)`
  width: 46rem;
  box-sizing: border-box;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100vw;
  height: 100%;
  overflow-x: scroll;
  padding: 1rem;

  &&::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &&::-webkit-scrollbar {
    width: 0.01px;
  }
`;

// import styled from "styled-components";
// import { FiltersSlider } from "../../components/FiltersSlider/FilterSlider";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { OrderCard } from "../../components/Cards/OrderCard";
// import { Input } from "../../components/Input/Input";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// const foundedOrders = [
//   {
//     id: 1,
//     status: "delivered",
//     total: 53,
//     payment_status: false,
//     take_away: false,
//     createdAt: "2023-09-18T00:02:36.492Z",
//     updatedAt: "2023-09-18T00:02:36.492Z",
//     UserId: "BLK7FqXA0TTY7hoGKSqW5Dd2BKB3",
//     notes: false,
//     time: 20,
//     OrderDetails: [
//       {
//         id: 2,
//         price: 23,
//         amount: 1,
//         extras: null,
//         OrderId: 1,
//         ProductId: 20,
//         Product: {
//           id: 20,
//           name: "Mate amargo",
//           price: 23,
//           image:
//             "https://culturageek.com.ar/wp-content/uploads/2023/05/scorpion-con-mate-culturageek-5.jpg",
//           stock: 55,
//           qualification: 3,
//           time: "00:10:00",
//           enable: true,
//           description: "Convidado por el encargado, se toma mirando a la nada.",
//           deleted: false,
//         },
//       },
//       {
//         id: 1,
//         price: 15,
//         amount: 2,
//         extras: null,
//         OrderId: 1,
//         ProductId: 21,
//         Product: {
//           id: 21,
//           name: "Triple de miga",
//           price: 15,
//           image:
//             "https://2trendies.com/hero/2023/02/sandwiches-de-miga-triples.jpg?width=1200&aspect_ratio=16:9",
//           stock: 12,
//           qualification: 3,
//           time: "00:08:00",
//           enable: true,
//           description: "Kermoso desayunar asi.",
//           deleted: false,
//         },
//       },
//     ],
//   },
//   {
//     id: 2,
//     status: "ready",
//     total: 53,
//     payment_status: false,
//     take_away: true,
//     createdAt: "2023-09-18T00:02:36.492Z",
//     updatedAt: "2023-09-18T00:02:36.492Z",
//     UserId: "BLK7FqXA0TTY7hoGKSqW5Dd2BKB3",
//     time: 17,
//     notes:
//       "Eiusmod mollit aliquip do sint ullamco do proident. Excepteur ad non consequat deserunt fugiat dolore. ",
//     OrderDetails: [
//       {
//         id: 2,
//         price: 23,
//         amount: 1,
//         extras: null,
//         OrderId: 1,
//         ProductId: 20,
//         Product: {
//           id: 20,
//           name: "Mate amargo",
//           price: 23,
//           image:
//             "https://culturageek.com.ar/wp-content/uploads/2023/05/scorpion-con-mate-culturageek-5.jpg",
//           stock: 55,
//           qualification: 3,
//           time: "00:10:00",
//           enable: true,
//           description: "Convidado por el encargado, se toma mirando a la nada.",
//           deleted: false,
//         },
//       },
//       {
//         id: 1,
//         price: 15,
//         amount: 2,
//         extras: null,
//         OrderId: 1,
//         ProductId: 21,
//         Product: {
//           id: 21,
//           name: "Triple de miga",
//           price: 15,
//           image:
//             "https://2trendies.com/hero/2023/02/sandwiches-de-miga-triples.jpg?width=1200&aspect_ratio=16:9",
//           stock: 12,
//           qualification: 3,
//           time: "00:08:00",
//           enable: true,
//           description: "Kermoso desayunar asi.",
//           deleted: false,
//         },
//       },
//     ],
//   },
//   {
//     id: 3,
//     status: "cancelled",
//     total: 53,
//     payment_status: false,
//     take_away: true,
//     createdAt: "2023-09-18T00:02:36.492Z",
//     updatedAt: "2023-09-18T00:02:36.492Z",
//     UserId: "BLK7FqXA0TTY7hoGKSqW5Dd2BKB3",
//     time: 10,
//     notes:
//       "Eiusmod mollit aliquip do sint ullamco do proident. Excepteur ad non consequat deserunt fugiat dolore. ",
//     OrderDetails: [
//       {
//         id: 2,
//         price: 23,
//         amount: 1,
//         extras: null,
//         OrderId: 1,
//         ProductId: 20,
//         Product: {
//           id: 20,
//           name: "Mate amargo",
//           price: 23,
//           image:
//             "https://culturageek.com.ar/wp-content/uploads/2023/05/scorpion-con-mate-culturageek-5.jpg",
//           stock: 55,
//           qualification: 3,
//           time: "00:10:00",
//           enable: true,
//           description: "Convidado por el encargado, se toma mirando a la nada.",
//           deleted: false,
//         },
//       },
//       {
//         id: 1,
//         price: 15,
//         amount: 2,
//         extras: null,
//         OrderId: 1,
//         ProductId: 21,
//         Product: {
//           id: 21,
//           name: "Triple de miga",
//           price: 15,
//           image:
//             "https://2trendies.com/hero/2023/02/sandwiches-de-miga-triples.jpg?width=1200&aspect_ratio=16:9",
//           stock: 12,
//           qualification: 3,
//           time: "00:08:00",
//           enable: true,
//           description: "Kermoso desayunar asi.",
//           deleted: false,
//         },
//       },
//     ],
//   },
//   {
//     id: 4,
//     status: "pending",
//     total: 53,
//     payment_status: false,
//     take_away: true,
//     createdAt: "2023-09-18T00:02:36.492Z",
//     updatedAt: "2023-09-18T00:02:36.492Z",
//     UserId: "BLK7FqXA0TTY7hoGKSqW5Dd2BKB3",
//     time: 5,
//     notes:
//       "Eiusmod mollit aliquip do sint ullamco do proident. Excepteur ad non consequat deserunt fugiat dolore. ",
//     OrderDetails: [
//       {
//         id: 2,
//         price: 23,
//         amount: 1,
//         extras: null,
//         OrderId: 1,
//         ProductId: 20,
//         Product: {
//           id: 20,
//           name: "Mate amargo",
//           price: 23,
//           image:
//             "https://culturageek.com.ar/wp-content/uploads/2023/05/scorpion-con-mate-culturageek-5.jpg",
//           stock: 55,
//           qualification: 3,
//           time: "00:10:00",
//           enable: true,
//           description: "Convidado por el encargado, se toma mirando a la nada.",
//           deleted: false,
//         },
//       },
//       {
//         id: 1,
//         price: 15,
//         amount: 2,
//         extras: null,
//         OrderId: 1,
//         ProductId: 21,
//         Product: {
//           id: 21,
//           name: "Triple de miga",
//           price: 15,
//           image:
//             "https://2trendies.com/hero/2023/02/sandwiches-de-miga-triples.jpg?width=1200&aspect_ratio=16:9",
//           stock: 12,
//           qualification: 3,
//           time: "00:08:00",
//           enable: true,
//           description: "Kermoso desayunar asi.",
//           deleted: false,
//         },
//       },
//     ],
//   },
//   {
//     id: 5,
//     status: "ongoing",
//     total: 53,
//     payment_status: false,
//     take_away: true,
//     createdAt: "2023-09-18T00:02:36.492Z",
//     updatedAt: "2023-09-18T00:02:36.492Z",
//     UserId: "BLK7FqXA0TTY7hoGKSqW5Dd2BKB3",
//     time: 20,
//     notes:
//       "Eiusmod mollit aliquip do sint ullamco do proident. Excepteur ad non consequat deserunt fugiat dolore. ",
//     OrderDetails: [
//       {
//         id: 2,
//         price: 23,
//         amount: 1,
//         extras: null,
//         OrderId: 1,
//         ProductId: 20,
//         Product: {
//           id: 20,
//           name: "Mate amargo",
//           price: 23,
//           image:
//             "https://culturageek.com.ar/wp-content/uploads/2023/05/scorpion-con-mate-culturageek-5.jpg",
//           stock: 55,
//           qualification: 3,
//           time: "00:10:00",
//           enable: true,
//           description: "Convidado por el encargado, se toma mirando a la nada.",
//           deleted: false,
//         },
//       },
//       {
//         id: 1,
//         price: 15,
//         amount: 2,
//         extras: null,
//         OrderId: 1,
//         ProductId: 21,
//         Product: {
//           id: 21,
//           name: "Triple de miga",
//           price: 15,
//           image:
//             "https://2trendies.com/hero/2023/02/sandwiches-de-miga-triples.jpg?width=1200&aspect_ratio=16:9",
//           stock: 12,
//           qualification: 3,
//           time: "00:08:00",
//           enable: true,
//           description: "Kermoso desayunar asi.",
//           deleted: false,
//         },
//       },
//     ],
//   },
//   {
//     id: 6,
//     status: "ongoing",
//     total: 53,
//     payment_status: false,
//     take_away: true,
//     createdAt: "2023-09-18T00:02:36.492Z",
//     updatedAt: "2023-09-18T00:02:36.492Z",
//     UserId: "BLK7FqXA0TTY7hoGKSqW5Dd2BKB3",
//     time: 15,
//     notes:
//       "Eiusmod mollit aliquip do sint ullamco do proident. Excepteur ad non consequat deserunt fugiat dolore. ",
//     OrderDetails: [
//       {
//         id: 2,
//         price: 23,
//         amount: 1,
//         extras: null,
//         OrderId: 1,
//         ProductId: 20,
//         Product: {
//           id: 20,
//           name: "Mate amargo",
//           price: 23,
//           image:
//             "https://culturageek.com.ar/wp-content/uploads/2023/05/scorpion-con-mate-culturageek-5.jpg",
//           stock: 55,
//           qualification: 3,
//           time: "00:10:00",
//           enable: true,
//           description: "Convidado por el encargado, se toma mirando a la nada.",
//           deleted: false,
//         },
//       },
//       {
//         id: 1,
//         price: 15,
//         amount: 2,
//         extras: null,
//         OrderId: 1,
//         ProductId: 21,
//         Product: {
//           id: 21,
//           name: "Triple de miga",
//           price: 15,
//           image:
//             "https://2trendies.com/hero/2023/02/sandwiches-de-miga-triples.jpg?width=1200&aspect_ratio=16:9",
//           stock: 12,
//           qualification: 3,
//           time: "00:08:00",
//           enable: true,
//           description: "Kermoso desayunar asi.",
//           deleted: false,
//         },
//       },
//     ],
//   },
// ];

// export const ManagerOrders = ({ searchTerm }) => {

//   const [isDelayed, setIsDelayed] = useState(false);
//   const [isReady, setIsReady] = useState(false);
//   const handleTimeOff = () => {
//     setIsDelayed(true);
//   };

// const filteredOrders = useSelector((state)=>state.foundedOrders)

// useEffect(() =>{
// console.log(filteredOrders);
// },[filteredOrders]
// )

// const filteredMenu = foundedOrders.filter((card) =>
//       card.id.startsWith(searchTerm)
//     )

// return (
//   <StyledView>
//     <SearchbarContainer>
//       <FiltersSlider />
//     </SearchbarContainer>
//     <SearchBar
//       placeholder={"Buscar por número de órden"}
//       icono={faMagnifyingGlass}
//       // onChange={handleSearch}
//     />
//     <OrdersContainer>
//       <span>Pendientes</span>
//       <HorizontalContainer>
//         {foundedOrders.map((order) => (
//           <OrderCard
//             order={order}
//             time={order.time}
//             onTimeOff={handleTimeOff}
//             isDelayed={isDelayed}
//             isReady={isReady}
//           />
//         ))}
//       </HorizontalContainer>
{
  /* <span>Pendientes</span>
        <HorizontalContainer>
          {foundedOrders.map((order) => (
            <OrderCard
              order={order}
              time={order.time}
              onTimeOff={handleTimeOff}
              isDelayed={isDelayed}
              isReady={isReady}
            />
          ))}
        </HorizontalContainer>
        <span>Pendientes</span>
        <HorizontalContainer>
          {foundedOrders.map((order) => (
            <OrderCard
              order={order}
              time={order.time}
              onTimeOff={handleTimeOff}
              isDelayed={isDelayed}
              isReady={isReady}
            />
          ))}
        </HorizontalContainer>
        <span>Pendientes</span>
        <HorizontalContainer>
          {foundedOrders.map((order) => (
            <OrderCard
              order={order}
              time={order.time}
              onTimeOff={handleTimeOff}
              isDelayed={isDelayed}
              isReady={isReady}
            />
          ))}
        </HorizontalContainer> */
}
{
  /* </OrdersContainer>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;
  padding: 6vh 0 10vh 0.5rem;
  transition: width 0.3s ease-in-out;
`;
const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  transition: width 0.3s ease-in-out;
`;

const SearchbarContainer = styled.div`
  position: sticky;
  justify-content: center;
  padding: 2rem 0 0 0;
  top: 2rem;
  background-color: ${(props) => props.theme.primary};
  z-index: 1;
`;

const SearchBar = styled(Input)`
  width: 46rem;
  box-sizing: border-box;
  margin: auto;
  @media (max-width: 650px) {
    margin: 0;
    width: 97.5%;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100vw;
  height: 100%;
  overflow-x: scroll;
  padding: 1rem;

  &&::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &&::-webkit-scrollbar {
    width: 0.01px;
  }
`; */
}
