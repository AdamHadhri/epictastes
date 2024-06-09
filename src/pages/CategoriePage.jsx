import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GradientCover from '../components/CatCard';
import axios from 'axios';

function CategoriePage({ category }) {
    const [elems, setElems] = useState([]);

    useEffect(() => {
        getElems();
    }, [category]);

    async function getElems() {
        const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        try {
            const res = await axios.get(URL);
            setElems(res.data.meals);
            console.log(res.data.meals);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    return (
        <div>
            <div className=" pl-24 pt-10 font-semibold text-4xl flex flex-row text-orange-700">{category} Meals:</div>
            <div className='flex flex-row flex-wrap gap-10 my-10 justify-center'>
                {elems.map((elem) => (
                    <Link key={elem.idMeal} to={`/${elem.idMeal}`}>
                        <GradientCover
                            title={elem.strMeal}
                            imgSrc={elem.strMealThumb}
                        />
                    </Link>
                ))}
            </div>
        </div>

    );
}

export default CategoriePage;
