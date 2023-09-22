import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DetailCard } from "../../components/Cards/DetailCard";
import styled from "styled-components";
import { connect } from 'react-redux';
import { updateComment, updateQualification } from "../../redux/actions/actions";

// Import the action creators

export const ReviewPage = ({
}) => {
  let params = useParams();
  const [ qualificationsArray , setQualificationsArray ] = useState ([])


  //traigo los datos del pedido
  const order = async () => {
    let { orderId } = params;
    const { data } = await axios
      .get(`https://resto-p4fa.onrender.com/order/103`)
      .catch((error) => alert(error));
console.log(data);
    const qualis = data.OrderDetails?.map((elem) => {
      const reduxItem = qualificationsArray?.find((item) => item.id === elem.id);
      return {
        name: elem.Product.description,
        id: elem.id,
        image: elem.Product.image,
        qualification: reduxItem ? reduxItem.qualification : 0,
        comment: reduxItem ? reduxItem.comment : '',
      };
    });

    // Dispatch an action to update the qualification data in Redux
    setQualificationsArray(qualis);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const arrQualification = qualificationsArray?.map((elem) => {
      return {
        idProduct: elem.id,
        points: elem.qualification,
        comment: elem.commment,
      };
    });
    const respuesta = { arrQualification: arrQualification };
    console.log(respuesta);
    // await axios.post(`http://localhost:3001/qualification/        `,respuesta)
    // .then((response) => alert('formulario enviado con exito'))
    // .catch ((error) => alert (error))
  };

  useEffect(() => {
    order();
  }, [params, setQualificationsArray]); // Add 'updateQualification' as a dependency

  return (
    <div>
      <div>
        <h2>Califica tu pedido!</h2>
        <h6>
          Para seguir mejorando, te pedimos por favor que nos digas cómo estuvo
        </h6>
      </div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {qualificationsArray?.map((elem) => {
          console.log("Comment for", elem.name, ":", elem.comment);
          return (
            <DetailCard
              key={elem.id}
              name={elem.name}
              inputName={elem.id}
              image={elem.image}
              inputPlaceholder={"¿Algún comentario?"}
              qualification={elem.qualification}
              comment={elem.comment}
            />
          );
        })}

        <button>enviar</button>
      </Form>
    </div>
  );
};



const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// <div key={elem.id} style={ { display: 'flex', flexDirection: 'row'}}>
//     <p>{elem.name} :</p>
//     <label htmlFor='i'></label>
//     <input
//         name={elem.name}
//         value={elem.qualification}
//         onChange={(e)=>handleChange(e)}
//         type='number'
//         max={5}
//         min={1}
//     />
// </div>


const mapStateToProps = (state) => ({
  qualification: state.qualification, // Replace 'qualification' with the name of your Redux state property
});

const mapDispatchToProps = (dispatch) => ({
  updateQualification: (qualification) => dispatch(/* Action to update qualification */),
  updateComment: (comment) => dispatch(/* Action to update comment */),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
