import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GradientCover from '../components/CatCard';
import axios from 'axios';

function CategoriePage({ category }) {
    const [elems, setElems] = useState([]);

    useEffect(() => {
        async function getElems() {
            const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
            try {
                const res = await axios.get(URL);
                setElems(res.data.meals);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        getElems();
    }, [category]);



    return (
        <div>
            <div className="flex justify-center lg:py-10 md:py-8 sm:py-7 py-7 font-semibold text-2xl md:text-3xl lg:text-4xl text-orange-700">{category} Meals</div>
            <div className='flex flex-row flex-wrap gap-10 justify-center pb-5'>
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
