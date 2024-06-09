import React, { useContext, useEffect, useState } from 'react';
import GradientCover from '../components/CatCard';
import axios from 'axios';
import { CategoriesContext } from './Home';
import { Link } from 'react-router-dom';

function SearchPage() {
    const [elems, setElems] = useState([]);
    const { allings } = useContext(CategoriesContext);

    useEffect(() => { getSearch() }, [allings]);

    async function getSearch() {
        const URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
        try {
          const res = await axios.get(URL);
          setElems(res.data.meals);
          console.log(elems)
        } catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      }

    return (
        <div className='flex flex-col'>
            <div className=" pl-32 py-5 font-semibold text-3xl flex flex-row">Search results for ...</div>
            <div className='flex flex-row flex-wrap gap-10 justify-center'>
               {elems.map((elem) => (
                <Link key={elem.idIngredient} to={`/${elem.strIngredient}`}>
                  <GradientCover key={elem.idIngredient} 
                  title={elem.strIngredient}
                  imgSrc={`https://www.themealdb.com/images/ingredients/${elem.strIngredient}.png`} />
                </Link>
            ))} 
            </div>
        </div>
    );
}

export default SearchPage;
