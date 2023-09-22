import { styled } from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
//import { menu } from "../../assets/mockedMenu";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getDishById } from "../../redux/actions/actions";
import { DetailCard } from "../../components/Cards/DetailCard";
import { RatingSelector } from "../../components/Rating/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "../../components/Input/Input";

// import { addToBasket } from "../../redux/actions/actions";

export const fdsafasd = () => {
  let params = useParams();

  const handleCommentChange = (index, value) => {
    // Llama a la función de actualización de comentario con 'index' y 'value'
    updateComment(index, value);
  };

  const [articlesArray, setArticlesArray] = useState([]);
  const [comments, setComments] = useState(
    Array(articlesArray.length).fill("")
  );

  const order = async () => {
    let { orderId } = params;
    const { data } = await axios
      .get(`https://resto-p4fa.onrender.com/order/103`)
      .catch((error) => alert(error));
    const articles = data.OrderDetails.map((article) => {
      return {
        name: article.Product.description,
        id: article.id,
        image: article.Product.image,
        points: 0,
        comment: "",
      };
    });
    setArticlesArray(articles);
  };

  const [submitComment, setSubmitComment] = useState(""); // Estado para el comentario a enviar

  const handleCommentSubmit = (articleIndex) => {
    // Accede al comentario correspondiente al artículo con el índice 'articleIndex'
    const comment = comments[articleIndex];
    console.log(`Comentario de la tarjeta ${articleIndex}: ${comment}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrQualification = articlesArray.map((article) => {
      return {
        idProduct: article.id,
        points: article.stars,
        comment: article.comment,
      }})
    // });
    // const respuesta = { arrQualification: arrQualification };
    // await axios
    //   .post(`http://localhost:3001/qualification/        `, respuesta)
    //   .then((response) => alert("formulario enviado con exito"))
    //   .catch((error) => alert(error));

    console.log(arrQualification);
  };

  const updateRating = (articleIndex, rating) => {
    setArticlesArray((prevArticlesArray) => {
      if (prevArticlesArray[articleIndex]) {
        const updatedArticles = [...prevArticlesArray];
        updatedArticles[articleIndex].points = rating;
        return updatedArticles;
      }
      return prevArticlesArray;
    });
  };

  const updateComment = (articleIndex, comment) => {
    setArticlesArray((prevArticlesArray) => {
      if (prevArticlesArray[articleIndex]) {
        const updatedArticles = [...prevArticlesArray];
        updatedArticles[articleIndex].comment = comment;
        return updatedArticles;
      }
      return prevArticlesArray;
    });
  };

  useEffect(() => {
    order();
  }, [params, setArticlesArray]);
  return (
    <StyledView>
      <form onSubmit={handleSubmit}>
      {articlesArray.map((article, index) => (

          <DetailCard
            image={article.image}
            name={article.name}
            description={article.description}
            price={article.price}
            updateRating={(rating) => updateRating(index, rating)} // Pasa 'index'
            inputPlaceholder={"¿Algún comentario?"}
            inputValue={comments[index]}
            inputOnChange={(value) => handleCommentChange(index, value)} // Pasa 'index'
            comment={comments[index]}
            updateComment={(value) => handleCommentChange(index, value)} // Pasa 'index'
          />

      ))}
  
      <CTAsContainer
        text1={"Enviar"}
        type1={"submit"} // Pasa 'index'
        text2={"Ahora no"}
        onClick2={null}
      />
      </form>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  padding: 10vh 1rem 10vh 1rem;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 5rem;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 1rem;
  }
`;
