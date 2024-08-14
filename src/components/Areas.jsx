import React, { useContext } from 'react';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import GradientCover from './FlagCard'
import { CategoriesContext } from '../pages/Home';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import "react-multi-carousel/lib/styles.css";


function Areas() {
    const { areas } = useContext(CategoriesContext);

  return (
    <div className="flex flex-col">
      <p className="flex justify-center pb-5 font-semibold text-3xl text-orange-700">Areas</p>
      <Splide
        options={{
          perPage: 6,
          breakpoints: {
            600: {
              perPage: 3,
              padding: 10,
              gap: 10,
            },
            1100: {
              perPage: 3,
              padding: 60,
              gap: 100,
            },
            1400: {
              perPage: 4,
              padding: 100,
              gap: 80,
            }
          },
          pagination: false,
          drag: 'free',
          padding: 60,
          gap: 120
        }}
        className="flex flex-row">
        {areas.map((area) => (
            <SplideSlide key={areas.indexOf(area)} className="rounded-full">
              <Link to={`/${area.strArea}`}>
                <GradientCover
                  title={area.strArea}
                  imgSrc={ area.isoCode === 'unknown' ? `${process.env.PUBLIC_URL}/unkown.png` :`https://flagcdn.com/h240/${area.isoCode}.png`}
                  />
                </Link>
            </SplideSlide>
        ))}
        </Splide>
    </div>
  );
}

export default Areas;
