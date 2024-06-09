import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import GradientCover from './RoundCard'
import { CategoriesContext } from '../pages/Home';
import '../index.css'

function Categories() {
    const { categories } = useContext(CategoriesContext);

  return (
    <div className="flex flex-col">
      <p className="pl-20 py-5 font-semibold text-3xl text-orange-700">Categories</p>
      <Splide
        options={{
          perPage: 7,
          pagination: false,
          gap: 60,
          drag: 'free',
          padding: 60,
        }}
        className="flex flex-row">
        {categories.map((category) => (
            <SplideSlide key={category.idCategory} className="rounded-full">
              <Link  to={`/${category.strCategory}`}>
                <GradientCover
                  title={category.strCategory}
                  imgSrc={category.strCategoryThumb} />
              </Link>
            </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default Categories;
