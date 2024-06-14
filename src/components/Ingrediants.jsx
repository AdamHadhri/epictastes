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
      <div className="flex justify-center py-5 text-3xl flex-row">
        <p className=' font-semibold mr-5 text-orange-700'>Ingredients</p> 
        <div style={{textDecoration: 'underline', fontSize: "1.5rem"}}> (
          <Link to='/Ingradients' style={{color: 'orange',textDecoration: 'underline', fontSize: "1.5rem"}}>See All
          </Link>)
        </div> 
      </div>
      <Splide
        options={{
          perPage: 8,
          pagination: false,
          gap: 60,
          drag: 'free',
          padding: 60,
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
