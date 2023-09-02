import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Datos de ejemplo para tus diapositivas
const slidesData = [
  {
    id: 1,
    title: 'Slide 1',
    content: 'Contenido del slide 1',
  },
  {
    id: 2,
    title: 'Slide 2',
    content: 'Contenido del slide 2',
  },
  {
    id: 3,
    title: 'Slide 3',
    content: 'Contenido del slide 3',
  },
];

const MyCarousel = () => {
  return (
    <div>
      <h2>Carrusel de Ejemplo</h2>
      <Carousel>
        {slidesData.map((slide) => (
          <div key={slide.id}>
            <h3>{slide.title}</h3>
            <p>{slide.content}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
