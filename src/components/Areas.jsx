import React, { useContext } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import GradientCover from './FlagCard'
import { CategoriesContext } from '../pages/Home';

function Areas() {
    const { areas } = useContext(CategoriesContext);

  return (
    <div className="flex flex-col">
      <p className="pl-20 py-5 font-semibold text-3xl text-orange-700">Areas</p>
      <Splide
        options={{
          perPage: 6,
          pagination: false,
          gap: 60,
          drag: 'free',
          padding: 60,
        }}
        className="flex flex-row">
        {areas.map((area) => (
            <SplideSlide key={area.id}>
              <Link to={`/${area.strArea}`}>
                <GradientCover
                  title={area.strArea}
                  imgSrc={ area.isoCode === 'unknown' ? '/unkown.png' :`https://flagcdn.com/h240/${area.isoCode}.png`}
                  />
                </Link>
            </SplideSlide>
          
        ))}
      </Splide>
    </div>
  );
}

export default Areas;
