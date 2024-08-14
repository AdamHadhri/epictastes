import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GradientCover from '../components/LatestCard';
import { CategoriesContext } from '../pages/Home';
import '../index.css';
import { CircularProgress } from '@mui/material';
import "react-multi-carousel/lib/styles.css";

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 1500 },
//     items: 5
//   },
//   desktop: {
//     breakpoint: { max: 1500, min: 1024 },
//     items: 4
//   },
//   tablet: {
//     breakpoint: { max: 1100, min: 464 },
//     items: 3
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 2
//   }
// };




// function Latest() {
  // const { latest } = useContext(CategoriesContext);

//   return (
//     <div className="flex flex-col">
//       <p className="flex justify-center py-5 font-semibold text-3xl text-orange-700">Latest Meals</p>

//       {latest ? (
//         <Carousel responsive={responsive}>
//           {latest.map((la) => (
//             <div className="latest" key={la.idMeal}>
//               <Link to={`/${la.idMeal}`}>
//                 <GradientCover
//                   title={la.strMeal}
//                   imgSrc={la.strMealThumb}
//                 />
//               </Link>
//             </div>
//           ))}
//         </Carousel>
//       ) : (
//         <div className="flex justify-center items-center w-full">
//           <CircularProgress />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Latest;

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function Latest() {
  const { latest } = useContext(CategoriesContext);

  return (
        <div className="flex flex-col">
          <p className="flex justify-center font-semibold text-3xl text-orange-700">Latest Meals</p>
    
          {latest ? (
            <Splide
            options={{
              perPage: 6,
              breakpoints: {
                470: {
                  perPage: 2,
                  padding: 5,
                  gap: 10,
                },
                570: {
                  perPage: 2,
                  padding: 30,
                  gap: 10,
                },
                950: {
                  perPage: 3,
                  padding: 30,
                  gap: 30,
                },
                1100: {
                  perPage: 3,
                  padding: 30,
                  gap: 30,
                },
                1300: {
                  perPage: 4,
                  padding: 50,
                  gap: 40,
                },
                1500: {
                  perPage: 5,
                  padding: 50,
                  gap: 40,
                }
              },
              pagination: false,
              drag: 'free',
              padding: 30,
              gap: 50
            }}
            className="flex flex-row">
              {latest.map((la) => (
                <SplideSlide className="latest" key={la.idMeal}>
                  <Link className='drag' to={`/${la.idMeal}`}>
                    <GradientCover
                      title={la.strMeal}
                      imgSrc={la.strMealThumb}
                    />
                  </Link>
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            <div className="flex justify-center items-center w-full">
              <CircularProgress />
            </div>
          )}
        </div>
      );
    

}