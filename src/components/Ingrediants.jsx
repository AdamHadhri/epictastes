import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import GradientCover from './IngCard'
import { CategoriesContext } from '../pages/Home';

function Ingrediants() {
    const { ings } = useContext(CategoriesContext);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pb-5 text-3xl flex-row">
        <p className=' font-semibold mr-5 text-orange-700'>Ingredients</p> 
        <div style={{textDecoration: 'underline', fontSize: "1.5rem"}}> (
          <Link to='/Ingradients' style={{color: 'orange',textDecoration: 'underline', fontSize: "1.5rem"}}>See All
          </Link>)
        </div> 
      </div>
      <Splide
        options={{
          perPage: 8,
          breakpoints: {
            640: {
              perPage: 3,
              padding: 20,
              gap: 40,
            },
            900: {
              perPage: 4,
              padding: 30,
              gap: 30,
            },
            1500: {
              perPage: 6,
              padding: 20,
              gap: 40,
            }
          },
          pagination: false,
          drag: 'free',
          padding: 60,
          gap: 30
        }}
        className="flex flex-row">
        {ings.map((ing) => (
          <SplideSlide key={ing.idIngredient}>
            <Link  to={`/${ing.strIngredient}`}>
              <GradientCover
              title={ing.strIngredient}
              imgSrc={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png`} />
              </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default Ingrediants;
