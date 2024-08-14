import React, { useContext, useEffect, useState } from 'react';
import GradientCover from '../components/CatCard'; // Assuming CatCard is the correct component
import axios from 'axios';
import { Link } from 'react-router-dom';
import {CategoriesContext} from './Home'
import NoResult from '../components/NoResult';


function SearchPage() { // Destructure the props to access 'search'
  const [elems, setElems] = useState([]);

  const {search} = useContext(CategoriesContext);

  useEffect(() => {
    async function getSearch() {
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      try {
        const res = await axios.get(URL);
        setElems(res.data.meals);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }
    getSearch();
  }, [search]);

  return (
    <div className='flex flex-col items-center'>
      <div className="flex justify-center lg:py-10 md:py-8 sm:py-7 py-7 font-semibold text-2xl md:text-3xl lg:text-4xl text-orange-700">Search results for "{search}"</div>
      <div className='flex flex-row flex-wrap gap-10 pb-5 justify-center'>
        { elems ? (elems.map((elem) => (
          <Link key={elem.idMeal} to={`/${elem.idMeal}`}>
            <GradientCover
              title={elem.strMeal}
              imgSrc={elem.strMealThumb}
            />
          </Link>
        ))) : (<NoResult/>) }
      </div>
    </div>
  );
}

export default SearchPage;
